import { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../api/auth';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn({ username, password })
      .then((user) => {
        onLogin(user);
        navigate('/');
      })
      .catch(() => {
        setErrorMessage('Invalid username and/or password');
        setShow(true);
      });
  };

  return (
    <Row className="mt-3 justify-content-md-center">
      <Col md={4}>
        <h1 className="pb-3">Login</h1>
        <Form onSubmit={handleSubmit}>
          <Alert dismissible show={show} onClose={() => setShow(false)} variant="danger">
            {errorMessage}
          </Alert>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              minLength={4}
            />
          </Form.Group>
          <Button className="mt-3" type="submit">Login</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default LoginPage;