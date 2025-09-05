import React, { useState, useEffect } from "react";
import "./StudentDirectory.css";

function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    major: "",
    year: ""
  });

  const years = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchStudents();
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/students/search/${searchQuery}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error searching students:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingStudent) {
        // Update existing student
        const response = await fetch(`http://localhost:5000/api/students/${editingStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          fetchStudents();
          resetForm();
        }
      } else {
        // Add new student
        const response = await fetch("http://localhost:5000/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          fetchStudents();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/students/${id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          fetchStudents();
        }
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      major: student.major,
      year: student.year
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", major: "", year: "" });
    setEditingStudent(null);
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="student-directory">
      <div className="header">
        <h1>🎓 Student Directory</h1>
        <p>Manage and explore student information</p>
      </div>

      <div className="controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search students by name, email, or major..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            🔍 Search
          </button>
          <button onClick={() => { setSearchQuery(""); fetchStudents(); }} className="clear-btn">
            Clear
          </button>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="add-btn"
        >
          ➕ Add Student
        </button>
      </div>

      {showAddForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="form-group">
                <label>Major</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="Enter major"
                />
              </div>
              
              <div className="form-group">
                <label>Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingStudent ? "Update Student" : "Add Student"}
                </button>
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="students-grid">
        {students.length === 0 ? (
          <div className="no-students">
            <p>No students found. {searchQuery && "Try adjusting your search."}</p>
          </div>
        ) : (
          students.map((student) => (
            <div key={student.id} className="student-card">
              <div className="student-avatar">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div className="student-info">
                <h3>{student.name}</h3>
                <p className="email">{student.email}</p>
                <p className="major">{student.major}</p>
                <span className="year-badge">{student.year}</span>
              </div>
              <div className="student-actions">
                <button
                  onClick={() => handleEdit(student)}
                  className="edit-btn"
                  title="Edit student"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="delete-btn"
                  title="Delete student"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="stats">
        <p>Total Students: {students.length}</p>
      </div>
    </div>
  );
}

export default StudentDirectory;