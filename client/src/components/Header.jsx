import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">🚇 Last Race</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-2">
          {user ? (
            <>
              <Nav.Link onClick={() => navigate('/leaderboard')}>
                Leaderboard
              </Nav.Link>
              <Navbar.Text className="me-2">
                Welcome, <strong>{user.username}</strong>
              </Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline-light" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;