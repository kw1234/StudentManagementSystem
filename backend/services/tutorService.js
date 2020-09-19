exports.updateStudentList = async function (req, res) {
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

exports.getStudents = async function (req, res) {
  console.log(req.query);
  const query = req.query;
  const email = query.email;

  const result = await getEntry(req.app.client, email).catch((error) => {
    res.status(400).end(`Error in the get tutor data request: ${error.message}`);
  });
  console.log(result.studentList);
  res.send({ studentList: result.studentList });
};

async function getEntry(client, email) {
  const result = await client.db('StudentSystem').collection('Users').findOne({ email });
  return result;
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
