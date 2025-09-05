const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for students (in production, use a database)
let students = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    age: 20,
    course: "Computer Science",
    enrollmentDate: "2023-09-01"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    age: 19,
    course: "Mathematics",
    enrollmentDate: "2023-09-01"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    age: 21,
    course: "Physics",
    enrollmentDate: "2023-09-01"
  }
];

// Helper function to generate new ID
const generateId = () => {
  return students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
};

// Helper function to find student by ID
const findStudentById = (id) => {
  return students.find(student => student.id === parseInt(id));
};

// Helper function to validate student data
const validateStudent = (student) => {
  const errors = [];
  
  if (!student.name || student.name.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!student.email || student.email.trim() === '') {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(student.email)) {
    errors.push('Email format is invalid');
  }
  
  if (!student.age || student.age < 1) {
    errors.push('Age must be a positive number');
  }
  
  if (!student.course || student.course.trim() === '') {
    errors.push('Course is required');
  }
  
  return errors;
};

// Routes

// GET /api/students - Get all students
app.get('/api/students', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// GET /api/students/:id - Get single student by ID
app.get('/api/students/:id', (req, res) => {
  try {
    const student = findStudentById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// POST /api/students - Create new student
app.post('/api/students', (req, res) => {
  try {
    const { name, email, age, course, enrollmentDate } = req.body;
    
    // Validate input
    const errors = validateStudent(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors
      });
    }
    
    // Check if email already exists
    const existingStudent = students.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }
    
    // Create new student
    const newStudent = {
      id: generateId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      age: parseInt(age),
      course: course.trim(),
      enrollmentDate: enrollmentDate || new Date().toISOString().split('T')[0]
    };
    
    students.push(newStudent);
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// PUT /api/students/:id - Update existing student
app.put('/api/students/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);
    
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Validate input
    const errors = validateStudent(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors
      });
    }
    
    const { name, email, age, course, enrollmentDate } = req.body;
    
    // Check if email already exists for another student
    const existingStudent = students.find(s => 
      s.email.toLowerCase() === email.toLowerCase() && s.id !== studentId
    );
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'Another student with this email already exists'
      });
    }
    
    // Update student
    const updatedStudent = {
      ...students[studentIndex],
      name: name.trim(),
      email: email.trim().toLowerCase(),
      age: parseInt(age),
      course: course.trim(),
      enrollmentDate: enrollmentDate || students[studentIndex].enrollmentDate
    };
    
    students[studentIndex] = updatedStudent;
    
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// DELETE /api/students/:id - Delete student
app.delete('/api/students/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);
    
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    const deletedStudent = students[studentIndex];
    students.splice(studentIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Student API server running on port ${PORT}`);
  console.log(`📚 API endpoints:`);
  console.log(`   GET    /api/students     - Get all students`);
  console.log(`   GET    /api/students/:id - Get student by ID`);
  console.log(`   POST   /api/students     - Create new student`);
  console.log(`   PUT    /api/students/:id - Update student`);
  console.log(`   DELETE /api/students/:id - Delete student`);
  console.log(`   GET    /api/health       - Health check`);
});

module.exports = app;