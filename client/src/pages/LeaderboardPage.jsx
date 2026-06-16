import { useEffect, useState } from 'react';
import { Container, Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { getLeaderboard } from '../api/Game';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load leaderboard');
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return (
    <Container className="mt-4 text-center">
      <Spinner animation="border" />
    </Container>
  );

  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  return (
    <Container className="mt-4">
      <h2>🏆 Leaderboard</h2>
      <p className="text-muted">Best score per player</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Best Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, i) => (
            <tr key={entry.username}>
              <td>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
              </td>
              <td>{entry.username}</td>
              <td>
                <Badge bg="warning" text="dark">
                  {entry.best_score} 🪙
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LeaderboardPage;