exports.updateTutorList = async function (req, res) {
  const body = req.body;
  const studentList = body.studentList;
  const email = body.email;

  const entry = { email: email };
  const val = { studentList: studentList };
  console.log('HEYY');
  console.log(email);
  console.log(studentList);

  await createEntry(req.app.client, entry, val).catch((error) => {
    res.status(400).end(`Error in the update tutor studentList request: ${error.message}`);
  });
  res.status(200);
};

exports.getTutors = async function (req, res) {
  console.log(req.query);
  const query = req.query;
  const email = query.email;

  const result = await getAllEntries(req.app.client, res).catch((error) => {
    res.status(400).end(`Error in the get tutor data request: ${error.message}`);
  });
  console.log(result);
  res.send({ tutorList: result });
};

async function getAllEntries(client, res) {
  return new Promise(function (resolve, reject) {
    client
      .db('StudentSystem')
      .collection('Users')
      .find({ role: 'tutor' })
      .toArray(function (err, docs) {
        if (err) {
          // Reject the Promise with an error
          return reject(err);
        }

        // Resolve (or fulfill) the promise with data
        return resolve(docs);
      });
  });
}

async function createEntry(client, key, val) {
  console.log('AMAA');
  console.log(key.email);
  console.log(val.studentList);
  const result = await client
    .db('StudentSystem')
    .collection('Users')
    .update(key, { $set: val }, { upsert: true });
  console.log(`Tutor ${key}'s studentList was updated`);
}
