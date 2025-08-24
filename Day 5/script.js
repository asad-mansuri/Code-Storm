const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample list of students
let students = [
  { id: 1, name: "Alice", age: 15 },
  { id: 2, name: "Bob", age: 16 },
  { id: 3, name: "Charlie", age: 15 }
];

// GET route to return all students
app.get('/students', (req, res) => {
  res.json(students);
});

// POST route to add a new student
app.post('/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json({ message: "Student added", student: newStudent });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Server running at http://localhost:3000/students`)
});
// go to http://localhost:3000/students to see the list of students