import { useNavigate } from "react-router-dom";
import { Button, Container, Alert, Card } from "react-bootstrap";

const ResultPage = ({ result, setGameData, setResult }) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    setGameData(null);
    setResult(null);
    navigate("/game/setup");
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h2>🏁 Game Over!</h2>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Final Score</Card.Title>
          <h1 className="display-4">
            {result.score < 0 ? 0 : result.score} 🪙
          </h1>
          {result.valid ? (
            <Alert variant="success">✅ Your route was valid!</Alert>
          ) : (
            <Alert variant="danger">
              ❌ Your route was invalid — score set to 0
            </Alert>
          )}
        </Card.Body>
      </Card>
      <div className="d-flex gap-3 mt-4">
        <Button variant="primary" onClick={handlePlayAgain}>
          🔄 Play Again
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/leaderboard")}
        >
          🏆 Leaderboard
        </Button>
      </div>
    </Container>
  );
};

export default ResultPage;
