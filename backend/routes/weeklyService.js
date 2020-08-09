const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://bgaskwarrier:kaw009020@cluster0-1jamj.mongodb.net/StudentSystem?retryWrites=true&w=majority';

let ma = 'pa';

exports.saveData = async function (req, res) {
  let rows = req.body;
  console.log(rows);
  for (i = 0; i < rows.length; i++) {
    let dict = rows[i];
    const percentage = parseInt(dict.percentage);
    if (Number.isNaN(percentage)) {
      console.log('invalid percentage input');
      continue;
    }
    const [letterGrade, color] = getLetterGradeAndColor(percentage);
    dict['letterGrade'] = letterGrade;
    dict['gradeColor'] = color;
  }
  console.log(rows);
  const entry = { studentId: '', weekId: '', plannerData: rows };
  writePlannerEntry(entry).catch(console.error);
  res.send(rows);
};

function getLetterGradeAndColor(percentage) {
  console.log(percentage);
  if (percentage >= 92.5) return ['A', 'green'];
  if (percentage >= 89.5) return ['A-', 'green'];
  if (percentage >= 86.5) return ['B+', 'lightgreen'];
  if (percentage >= 82.5) return ['B', 'lightgreen'];
  if (percentage >= 79.5) return ['B-', 'lightgreen'];
  if (percentage >= 76.5) return ['C+', 'yellow'];
  if (percentage >= 72.5) return ['C', 'yellow'];
  if (percentage >= 69.5) return ['C-', 'yellow'];
  if (percentage >= 66.5) return ['D+', 'orange'];
  if (percentage >= 62.5) return ['D', 'orange'];
  if (percentage >= 59.5) return ['D-', 'orange'];
  return ['F', 'red'];
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function createEntry(client, entry) {
  const result = await client.db('StudentSystem').collection('PlannerDocs').insertOne(entry);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function writePlannerEntry(entry) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();

    //await listDatabases(client);
    await createEntry(client, entry);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
