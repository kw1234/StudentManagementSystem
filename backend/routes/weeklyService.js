let ma = 'pa';

exports.saveData = async function (req, res) {
  let rows = req.body;
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
