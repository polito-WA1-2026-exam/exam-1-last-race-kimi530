import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Alert, Badge, Card, ProgressBar } from 'react-bootstrap';

const ExecutionPage = ({ result }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  if (!result.valid) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>❌ Invalid Route!</Alert.Heading>
          <p>Your route was invalid or incomplete. You lose all your coins.</p>
          <p>Final Score: <strong>0 🪙</strong></p>
        </Alert>
        <Button onClick={() => navigate('/game/result')}>See Result</Button>
      </Container>
    );
  }

  const step = result.steps[currentStep];
  const isLastStep = currentStep === result.steps.length - 1;
  const effectText = step.effect > 0 ? `+${step.effect}` : `${step.effect}`;
  const effectVariant = step.effect > 0 ? 'success' : step.effect < 0 ? 'danger' : 'secondary';

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h4>🚇 Journey in progress...</h4>

      {/* Progress */}
      <p className="text-muted">Step {currentStep + 1} of {result.steps.length}</p>
      <ProgressBar
        now={((currentStep + 1) / result.steps.length) * 100}
        className="mb-4"
      />

      {/* Current step card */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            🚉 {step.fromStation} → {step.toStation}
          </Card.Title>
          <hr />
          <p>⚡ Event: <strong>{step.event}</strong></p>
          <p>
            Effect: <Badge bg={effectVariant}>{effectText} coins</Badge>
          </p>
          <p>
            🪙 Coins after this step: <strong>{step.coinsAfter}</strong>
          </p>
        </Card.Body>
      </Card>

      {/* Buttons */}
      {isLastStep ? (
        <Button variant="success" onClick={() => navigate('/game/result')}>
          See Final Result →
        </Button>
      ) : (
        <Button onClick={() => setCurrentStep(c => c + 1)}>
          Next Step →
        </Button>
      )}
    </Container>
  );
};

export default ExecutionPage;