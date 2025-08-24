const student = {
  name: "Aman",
  marks: {
    math: 85,
    physics: 78,
    chemistry: 92,
    english: 74
  }
};

// Convert marks object to array
let marksArray = Object.values(student.marks);

// Total marks
let total = marksArray.reduce((acc, val) => acc + val, 0);

// Average marks
let average = total / marksArray.length;

// Highest marks
let highest = Math.max(...marksArray);

console.log("Student:", student.name);
console.log("Total Marks:", total);
console.log("Average Marks:", average);
console.log("Highest Marks:", highest);
// then write "node script.js" in terminal and press enter
// Output:
// Student: Aman
// Total Marks: 329
// Average Marks: 82.25
// highest Marks: 92