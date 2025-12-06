import { Container, Card, CardBody } from "react-bootstrap";
import Link from "next/link";

export default function FinalProjectInfo() {
  return (
    <Container className="py-5">
      <div className="mb-5">
        <h1 className="display-4 fw-bold mb-3">Final Project Information</h1>
        <hr className="mb-4" />
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <Card className="h-100 shadow-sm">
            <CardBody className="p-4">
              <h5 className="card-title text-primary mb-3">Student Information</h5>
              <p className="mb-2"><strong>Name:</strong> Amy Eng</p>
              <p className="mb-0"><strong>Team Members:</strong> None</p>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="h-100 shadow-sm">
            <CardBody className="p-4">
              <h5 className="card-title text-primary mb-3">Course Information</h5>
              <p className="mb-2"><strong>Course:</strong> Web Development (CS4500), Section 11597</p>
              <p className="mb-2"><strong>Professor:</strong> Jose Annunziato</p>
              <p className="mb-0"><strong>Semester:</strong> Fall 2025</p>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="mb-4">Kambaz Links</h2>
        <p className="text-muted mb-4">
          <em>Note: I left everything in the same repository, but deployed a5, a6, and the final project using different branches.</em>
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <Card className="h-100 shadow-sm">
            <CardBody className="p-4">
              <h5 className="card-title text-primary mb-3">Next.js Web Application</h5>
              <p className="mb-3">
                <strong>Live Application:</strong>
              </p>
              <Link 
                href="https://kambaz-next-js-quizzes.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mb-3 w-100"
              >
                View Live App
              </Link>
              <p className="mb-2">
                <strong>Repository:</strong>
              </p>
              <Link 
                href="https://github.com/engamy/kambaz-next-js/tree/quizzes" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary w-100"
              >
                View on GitHub
              </Link>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="h-100 shadow-sm">
            <CardBody className="p-4">
              <h5 className="card-title text-primary mb-3">Node.js Server Application</h5>
              <p className="mb-3">
                <strong>Live Application:</strong>
              </p>
              <Link 
                href="https://kambaz-node-server-app-quizzes-c5dh.onrender.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mb-3 w-100"
              >
                View Live App
              </Link>
              <p className="mb-2">
                <strong>Repository:</strong>
              </p>
              <Link 
                href="https://github.com/engamy/kambaz-node-server-app/tree/quizzes" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary w-100"
              >
                View on GitHub
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
}

