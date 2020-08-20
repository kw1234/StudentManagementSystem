const validate = require('jsonschema').validate;

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
  const userId = body.userId;
  const weekId = body.weekId;

  rows = formatRows(rows);
  const entry = { userId, weekId, plannerData: rows };

  createEntry(req.app.client, entry).catch((error) => {
    res.status(400).end(`Error in the post planner data request: ${error.message}`);
  });
  res.send(rows);
};

exports.getData = async function (req, res) {
  const { query } = req;
  const { userId } = query;
  const { weekId } = query;

  const result = getEntry(req.app.client, userId, weekId).catch((error) => {
    res.status(400).end(`Error in the get planner data request: ${error.message}`);
  });

  if (!result) res.error();
  res.send(result);
};

async function createEntry(client, entry) {
  const result = await client.db('StudentSystem').collection('PlannerDocs').insertOne(entry);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function getEntry(client, userId, weekId) {
  const result = await client
    .db('StudentSystem')
    .collection('PlannerDocs')
    .findOne({ userId: userId, weekId: weekId });
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
