import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logIn } from "../api/Auth";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    logIn({ username, password })
      .then((user) => {
        onLogin(user);
        navigate("/");
      })
      .catch(() => {
        setErrorMessage("Invalid username and/or password");
        setShow(true);
      });
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={8} lg={6}>
        <h1 className="text-center mb-4">Login</h1>

        <Form onSubmit={handleSubmit}>
          <Alert
            dismissible
            show={show}
            onClose={() => setShow(false)}
            variant="danger"
          >
            {errorMessage}
          </Alert>

          <Form.Group as={Row} className="mb-3" controlId="username">
            <Form.Label column sm={3}>
              Username
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="password">
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={4}
              />
            </Col>
          </Form.Group>

          <Row>
            <Col sm={{ span: 9, offset: 3 }}>
              <Button type="submit">Login</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default LoginPage;