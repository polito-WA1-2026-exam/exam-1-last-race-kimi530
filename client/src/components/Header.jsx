import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header({ user, onLogout }) {
  const navigate = useNavigate();

 const handleLogout = async () => {
    await onLogout(); 
    navigate('/');
};

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          🚇 Last Race
        </Navbar.Brand>

        {user && (
          <Nav className="mx-auto">
            <Nav.Link onClick={() => navigate("/leaderboard")}>
              Leaderboard
            </Nav.Link>
          </Nav>
        )}
        <Nav className="d-flex align-items-center gap-2">
          {user ? (
            <>
              <Navbar.Text>
                Welcome, <strong>{user.username}</strong>
              </Navbar.Text>

              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
