import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "./Setcode.css";

const Setcode = ({ showCode }) => {
  const [pattern, setPattern] = useState(4);
  const [duration, setDuration] = useState(3);
  const [code, setCode] = useState("");
  const [isSubmitEnable, setIsSubmitEnable] = useState(false);
  const [exampleCode, setExampleCode] = useState("0123");
  const minCodeLen = 1;
  const maxCodeLen = 10;

  const handleSubmit = () => {
    if (isSubmitEnable) {
      showCode({ pattern, duration, code });
    }
  };

  useEffect(() => {
    switch (pattern) {
      case 8:
        setExampleCode(`length : ${minCodeLen}-${maxCodeLen} (must be [0-7])`);
        break;
      case 16:
        setExampleCode(
          `length : ${minCodeLen}-${maxCodeLen} (must be [0-9a-fA-F])`
        );
        break;
      default:
        setExampleCode(`length : ${minCodeLen}-${maxCodeLen} (must be [0-3])`);
        break;
    }
  }, [pattern]);

  useEffect(() => {
    switch (pattern) {
      case 8:
        const regex8 = /^[0-7]*$/;
        if (
          regex8.test(code) &&
          code.length >= minCodeLen &&
          code.length <= maxCodeLen
        ) {
          setIsSubmitEnable(true);
        } else {
          setIsSubmitEnable(false);
        }
        break;
      case 16:
        const regex16 = /^[0-9a-fA-F]*$/;
        if (
          regex16.test(code) &&
          code.length >= minCodeLen &&
          code.length <= maxCodeLen
        ) {
          setIsSubmitEnable(true);
        } else {
          setIsSubmitEnable(false);
        }
        break;
      default:
        //   if code == digit(0-9)(4) setIsSubmitEnable(true)
        const regex4 = /^[0-3]*$/;
        if (
          regex4.test(code) &&
          code.length >= minCodeLen &&
          code.length <= maxCodeLen
        ) {
          setIsSubmitEnable(true);
        } else {
          setIsSubmitEnable(false);
        }
        break;
    }
  }, [pattern, code]);

  return (
    <Container>
      <Row>
        <Col>
          <label>Pattern</label>
        </Col>
        <Col md="auto">
          <ToggleButtonGroup
            type="radio"
            name="pattern"
            defaultValue={4}
            onChange={(val) => setPattern(parseInt(val))}
          >
            <ToggleButton variant="info" value={4}>
              4
            </ToggleButton>
            <ToggleButton variant="info" value={8}>
              8
            </ToggleButton>
            <ToggleButton variant="info" value={16}>
              16
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Duration (seconds)</label>
        </Col>
        <Col md="auto">
          <ToggleButtonGroup
            type="radio"
            name="duration"
            defaultValue={3}
            onChange={(val) => setDuration(parseInt(val))}
          >
            <ToggleButton variant="info" value={1}>
              1
            </ToggleButton>
            <ToggleButton variant="info" value={2}>
              2
            </ToggleButton>
            <ToggleButton variant="info" value={3}>
              3
            </ToggleButton>
            <ToggleButton variant="info" value={4}>
              4
            </ToggleButton>
            <ToggleButton variant="info" value={5}>
              5
            </ToggleButton>
            <ToggleButton variant="info" value={6}>
              6
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Code</label>
        </Col>
        <Col md="auto">
          <input
            className="form-control"
            placeholder={exampleCode}
            maxLength={maxCodeLen}
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
        </Col>
      </Row>
      <Row style={{marginTop:"5vh"}}>
        <Col md="auto">
          <Button
            onClick={handleSubmit}
            disabled={!isSubmitEnable}
            variant="success"
            size="lg"
            block
          >
            submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Setcode;
