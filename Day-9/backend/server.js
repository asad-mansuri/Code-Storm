const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", major: "Computer Science", year: "Junior" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", major: "Mathematics", year: "Senior" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", major: "Physics", year: "Sophomore" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", major: "Engineering", year: "Freshman" },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", major: "Biology", year: "Junior" }
];

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

// Add new student
app.post('/api/students', (req, res) => {
  const { name, email, major, year } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  
  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
    name,
    email,
    major: major || 'Undeclared',
    year: year || 'Freshman'
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
app.put('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).json({ message: 'Student not found' });
  
  const { name, email, major, year } = req.body;
  students[studentIndex] = { ...students[studentIndex], name, email, major, year };
  res.json(students[studentIndex]);
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).json({ message: 'Student not found' });
  
  students.splice(studentIndex, 1);
  res.json({ message: 'Student deleted successfully' });
});

// Search students
app.get('/api/students/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(query) ||
    student.email.toLowerCase().includes(query) ||
    student.major.toLowerCase().includes(query)
  );
  res.json(filteredStudents);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));