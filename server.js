const express = require('express');
const app = express();

const students = [];

// Define Student class
class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  getDetails() {
    return `Name: ${this.name}, Grade: ${this.grade}`;
  }
}

// Middleware to parse JSON requests
app.use(express.json());


app.get('/', (req, res) => {
  res.send(' Welcome to the Student grades Track app');
});


app.post('/students', (req, res) => {
  const { name, grade } = req.body;

  if (!name || !grade) {
    return res.status(400).json({ message: 'Name and grade are required.' });
  }

  const newStudent = new Student(name, grade);
  students.push(newStudent);

  res.status(201).json({
    message: 'New student added!',
    student: newStudent.getDetails()
  });
});


app.get('/students', (req, res) => {
  res.json(students);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
