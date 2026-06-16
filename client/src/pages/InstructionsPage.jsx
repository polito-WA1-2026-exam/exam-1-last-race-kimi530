import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const InstructionsPage = ({ user }) => {
    const navigate = useNavigate();

    return (
        <Container className="mt-4">
            <h1>🚇 Last Race</h1>
            <h5 className="mt-3">How to play:</h5>
            <ul>
                <li>You start with <strong>20 coins</strong></li>
                <li>You are assigned a <strong>start</strong> and <strong>destination</strong> station</li>
                <li>You have <strong>90 seconds</strong> to plan your route</li>
                <li>Select segments in order to build your route</li>
                <li>Random events will affect your coins along the way</li>
                <li>Reach the destination with the highest score possible!</li>
            </ul>
            {user ? (
                <Button onClick={() => navigate('/game/setup')}>
                    Play
                </Button>
            ) : (
                <Button onClick={() => navigate('/login')}>
                    Login to Play
                </Button>
            )}
        </Container>
    );
};

export default InstructionsPage;