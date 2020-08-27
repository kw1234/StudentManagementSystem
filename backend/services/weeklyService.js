const validate = require('jsonschema').validate;
var moment = require('moment'); // require

// Schema to compare new POST entries to
const plannerSchema = {
  studentId: 'string',
  weekId: 'string',
  plannerData: {
    type: 'array',
    items: { type: 'string' },
  },
  required: ['name', 'price', 'categories'],
};

exports.postData = async function (req, res) {
  const body = req.body;
  console.log(body);
  let rows = body.rows;
  const email = body.email;
  const weekId = body.weekId;

  rows = formatRows(rows);
  const entry = { email: email, weekId: weekId };
  const val = { plannerData: rows };

  createEntry(req.app.client, entry, val).catch((error) => {
    res.status(400).end(`Error in the post planner data request: ${error.message}`);
  });
  res.send({ email: email, weekId: weekId, plannerData: rows });
};

exports.getData = async function (req, res) {
  const query = req.query;
  const email = query.email;
  const weekId = query.weekId;
  console.log(email + ' ' + weekId);

  const result = await getEntry(req.app.client, email, weekId).catch((error) => {
    res.status(400).end(`Error in the get planner data request: ${error.message}`);
  });

  res.send(result);
};

async function createEntry(client, key, val) {
  const result = await client
    .db('StudentSystem')
    .collection('PlannerDocs')
    .update(key, { $set: val }, { upsert: true });
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function getEntry(client, email, weekId) {
  const result = await client
    .db('StudentSystem')
    .collection('PlannerDocs')
    .findOne({ email: email, weekId: weekId });
  return result;
}

function formatRows(rows) {
  for (let i = 0; i < rows.length; i++) {
    const dict = rows[i];
    const percentage = parseInt(dict.percentage);
    if (Number.isNaN(percentage)) {
      console.log('invalid percentage input');
      continue;
    }
    const [letterGrade, color] = getLetterGradeAndColor(percentage);
    dict.letterGrade = letterGrade;
    dict.gradeColor = color;
  }
  return rows;
}

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

function getCurrentWeek() {
  return moment().format('W');
}
