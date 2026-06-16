import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { startGame } from '../api/Game';
import NetworkMap from '../components/NetworkMap';

const SetupPage = ({ setGameData }) => {
  const navigate = useNavigate();

  const handleReady = async () => {
    const data = await startGame();
    setGameData(data);
    navigate('/game/planning');
  };

  return (
    <Container className="mt-4">
      <h2>Network Map</h2>
      <p>Study the network carefully before starting!</p>
      <NetworkMap showLines={true} />
      <Button className="mt-3" onClick={handleReady}>
        Ready To Play
      </Button>
    </Container>
  );
};

export default SetupPage;