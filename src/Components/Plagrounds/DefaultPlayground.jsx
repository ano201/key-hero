import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useStopwatch } from "react-timer-hook";

const DefaultPlayground = ({
  words,
  corrects,
  setcorrects,
  mistakes,
  setMistakes,
  status,
  setStatus,
  setMin,
  setSec,
}) => {
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const textInput = useRef(null);
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [trueValue, setTrueValue] = useState([]);
  const [falseValue, setFalseValue] = useState([]);

  useEffect(() => {
    if (status === "play") {
      textInput.current.focus();
    }
  }, [status]);

  const handleOnChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const startPlaying = () => {
    if (status === "waiting") {
      setCurrentWordIndex(0);
      setcorrects(0);
      setMistakes(0);
      setStatus("play");
      reset();
      wordFinder();
    } else if (status === "pause") {
      setStatus("play");
      start();
    }
  };

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 32) {
      checkMatch();
      setCurrentInput("");
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const checkMatch = () => {
    if (words[currentWordIndex] === currentInput.trim()) {
      setcorrects(corrects + 1);
      const newValue = [...trueValue];
      newValue.push(currentWordIndex);
      setTrueValue(newValue);
    } else {
      setMistakes(mistakes + 1);
      const newValue = [...falseValue];
      newValue.push(currentWordIndex);
      setFalseValue(newValue);
    }
  };

  const handlePause = () => {
    setStatus("pause");
    pause();
  };

  const finish = () => {
    setStatus("finished");
    setMin(minutes);
    setSec(seconds);
    pause();
  };

  const wordFinder = (wordIdx) => {
    if (wordIdx === currentWordIndex) {
      return "bg-secondary text-light";
    }
  };

  const setColor = (indexOfWords) => {
    for (let index = 0; index < trueValue.length; index++) {
      const element = trueValue[index];
      if (element === indexOfWords) {
        return "text-success bg-success bg-opacity-25";
      }
    }
    for (let index = 0; index < falseValue.length; index++) {
      const element = falseValue[index];
      if (element === indexOfWords) {
        return "text-danger bg-danger bg-opacity-25";
      }
    }
  };

  return (
    <>
      <div className="border border-2 container mt-2 full-box">
        <div className="row m-1">
          <div className="col-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
            <p>Task :</p>
            <div className="container border p-1">
              <p className="task-text">
                {words.map((word, i) => (
                  <span className={wordFinder(i)} key={i}>
                    <span className={setColor(i)}>{word}</span>
                    <span> </span>
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 border">
            <h1
              className={
                status === "pause" ? "d-block text-danger" : "text-primary"
              }
            >
              Time [{status}]
            </h1>
            <div className="w-100 text-center">
              <h1 className="timer">
                <span>{minutes}</span>:<span>{seconds}</span>
              </h1>
            </div>
            <div className={status === "waiting" ? "d-none" : "d-block"}>
              <h1>Accuracy</h1>
              <div className="w-100 text-center">
                <h1>
                  {currentWordIndex !== 0 ? (
                    <span>
                      {" "}
                      {Math.round(
                        (corrects / (corrects + mistakes)) * 100
                      )}%{" "}
                    </span>
                  ) : (
                    <span>0%</span>
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-1 mt-3">
          <div className="col-12">
            <input
              type="text"
              name="typing-area"
              onKeyDown={handleKeyDown}
              value={currentInput}
              onChange={handleOnChange}
              className="typing-area w-100"
              disabled={status !== "play"}
              ref={textInput}
            />
            {status !== "play" ? (
              <Button
                className="w-100 mt-2"
                disabled={status === "finished"}
                onClick={startPlaying}
              >
                Start
              </Button>
            ) : (
              <Button className="w-100 mt-2" onClick={handlePause}>
                Pause
              </Button>
            )}

            <Button
              className="w-100 mt-2"
              onClick={finish}
              disabled={status === "waiting"}
            >
              Result
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultPlayground;
