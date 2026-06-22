import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Badge, Alert } from "react-bootstrap";
import { getSegments, submitRoute } from "../api/Game";
import NetworkMap from "../components/Networkmap";

const PlanningPage = ({ gameData, setResult }) => {
  const [segments, setSegments] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSegments = async () => {
      const data = await getSegments();
      setSegments(data);
    };
    fetchSegments();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const route = selectedSegments.map((s) => ({
      fromId: s.from_id,
      toId: s.to_id,
    }));

    try {
      const result = await submitRoute(gameData.startId, gameData.endId, route);
      setResult(result);
      navigate("/game/execution");
    } catch (err) {
      setIsSubmitting(false);
      console.error(err);
    }
  }, [isSubmitting, selectedSegments, gameData, setResult, navigate]);

  useEffect(() => {
    if (isSubmitting) return;
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitting, handleSubmit]);

  const handleSegmentClick = (seg) => {
    const alreadySelected = selectedSegments.some(
      (s) => s.from_id === seg.from_id && s.to_id === seg.to_id,
    );
    if (alreadySelected) return;
    setSelectedSegments((prev) => [...prev, seg]);
  };



  const getStationName = (id) => {
    const seg = segments.find((s) => s.from_id === id || s.to_id === id);
    if (!seg) return id;
    return seg.from_id === id ? seg.from_station : seg.to_station;
  };

  return (
    <Container className="mt-4">
      <Alert variant={timeLeft < 20 ? "danger" : "info"}>
        ⏱ Time left: <strong>{timeLeft} seconds</strong>
      </Alert>

      <h5>
        🚉 Start: <Badge bg="success">{getStationName(gameData.startId)}</Badge>
      </h5>
      <h5>
        🏁 Destination:{" "}
        <Badge bg="danger">{getStationName(gameData.endId)}</Badge>
      </h5>

      <NetworkMap showLines={false} />

      <div className="d-flex gap-4 mt-3">
        <div style={{ flex: 1 }}>
          <h6>Click segments to build your route:</h6>
          <ListGroup style={{ maxHeight: "300px", overflowY: "auto" }}>
            {segments.map((seg, i) => {
              const isSelected = selectedSegments.some(
                (s) => s.from_id === seg.from_id && s.to_id === seg.to_id,
              );
              return (
                <ListGroup.Item
                  key={i}
                  action
                  active={isSelected}
                  onClick={() => handleSegmentClick(seg)}
                  style={{ cursor: "pointer" }}
                >
                  {seg.from_station} — {seg.to_station}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>

        <div style={{ flex: 1 }}>
          <h6>Your route:</h6>
          {selectedSegments.length === 0 ? (
            <p className="text-muted">No segments selected yet</p>
          ) : (
            <ListGroup>
              {selectedSegments.map((seg, i) => (
                <ListGroup.Item key={i}>
                  {i + 1}. {seg.from_station} → {seg.to_station}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() =>
                      setSelectedSegments((prev) =>
                        prev.filter((_, idx) => idx !== i),
                      )
                    }
                  >
                    ✕
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </div>

      <Button
        className="mt-3"
        onClick={handleSubmit}
        disabled={isSubmitting || timeLeft === 0}
      >
        {isSubmitting ? "Submitting..." : "Submit Route"}
      </Button>
    </Container>
  );
};

export default PlanningPage;
