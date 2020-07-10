// Use D3 to select the table
myTable = d3.select('#student-table');

// Use D3 to select the table body
tbody = d3.select('#student-tbody');

// Use D3 to set the table class to `table table-striped`
myTable = myTable.classed('table-striped', true)

// Use a forEach function to loop through the array of objects (from your data)
grades.forEach((studentgrade) => {
  // Assign values to the `student` name variable and the `grade` variable
    grade = studentgrade['grade']
    name = studentgrade['name']
  // Append one table row per student/grade
  var row = tbody.append("tr");
  if (grade< 60){
    row = row.classed('bg-danger', true)
  }
  else if (grade >= 60 && grade<70){
      row = row.classed('bg-warning', true)
  }
  // append one cell for the student and one cell for the grade
  row.append('td').text(name)
  row.append('td').text(grade)
});

