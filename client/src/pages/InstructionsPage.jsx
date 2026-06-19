import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const InstructionsPage = ({ user }) => {
    const navigate = useNavigate();

    return (
        <Container className="mt-4">
            <h1 className="m-4">🚇 Last Race</h1>
            <h5 className="mt-3">How to play:</h5>
            <ul className="list-unstyled text-center">
                <li className="mb-1">You start with <strong>20 coins</strong></li>
                <li className="mb-1">You are assigned a <strong>start</strong> and <strong>destination</strong> station</li>
                <li className="mb-1">You have <strong>90 seconds</strong> to plan your route</li>
                <li className="mb-1">Select segments in order to build your route</li>
                <li className="mb-1">Random events will affect your coins along the way</li>
                <li className="mb-1">Reach the destination with the highest score possible!</li>
            </ul>
            {user && (
                <Button onClick={() => navigate('/game/setup')}>
                    Play
                </Button>
            )}
        </Container>
    );
};

export default InstructionsPage;