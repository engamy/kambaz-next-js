export default function WorkingWithObjects(app) {
  // Mock assignment object
  const assignment = {
    _id: "A101",
    title: "Propulsion Assignment",
    course: "RS101",
    points: 100,
    dueDate: "2024-05-13"
  };

  const getAssignment = (req, res) => {
    res.json(assignment);
  };

  const getAssignmentTitle = (req, res) => {
    res.send(assignment.title);
  };

  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
};

