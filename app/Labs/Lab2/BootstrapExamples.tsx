import { Col, Row } from "react-bootstrap";

export default function BootstrapExamples() {
  return (
    <div>
      <h2>Bootstrap Grid Examples</h2>
      
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>

      <Row>
        <Col xs={12} md={8}>xs=12 md=8</Col>
        <Col xs={6} md={4}>xs=6 md=4</Col>
      </Row>
      
      {/* Columns start at 50% wide on mobile and 33.3% wide on desktop */}
      <Row>
        <Col xs={6} md={4}>xs=6 md=4</Col>
        <Col xs={6} md={4}>xs=6 md=4</Col>
        <Col xs={6} md={4}>xs=6 md=4</Col>
      </Row>
      
      {/* Columns are always 50% wide, on mobile and desktop */}
      <Row>
        <Col xs={6}>xs=6</Col>
        <Col xs={6}>xs=6</Col>
      </Row>

      <Row>
        <Col md="4">4/12</Col>
        <Col md="8">8/12</Col>
      </Row>
      
      <Row>
        <Col lg="4">4/12</Col>
        <Col lg="4">4/12</Col>
        <Col lg="4">4/12</Col>
      </Row>
      
      <Row>
        <Col sm="6">6/12</Col>
        <Col sm="6">6/12</Col>
      </Row>

      <Row>
        <Col xs="6">6/12</Col>
        <Col xs="6">6/12</Col>
      </Row>
      
      <Row>
        <Col sm="6">6/12</Col>
        <Col sm="6">6/12</Col>
      </Row>
      
      <Row>
        <Col md="6">6/12</Col>
        <Col md="6">6/12</Col>
      </Row>
      
      <Row>
        <Col lg="6">6/12</Col>
        <Col lg="6">6/12</Col>
      </Row>
    </div>
  );
}
