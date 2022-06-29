import React, { useEffect, useState } from "react";
import RandomWords from "random-words";
import DefaultPlayground from "../Components/Plagrounds/DefaultPlayground";
import { Button } from "react-bootstrap";

const RandomPlay = () => {
  const [words, setWords] = useState([]);
  const [corrects, setcorrects] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState("random");
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setWords(RandomWords(100));
  }, []);

  useEffect(() => {
    if (status === "waiting" || status === "play" || status === "pause") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [status]);

  return (
    <>
      <div className={status === "random" ? "d-block" : "d-none"}>
        <div
          style={{ height: "80vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="text-center">
            <h1>Click here to open playground</h1>
            <Button className="mt-3" onClick={() => setStatus("waiting")}>
              Let's Begin
            </Button>
          </div>
        </div>
      </div>
      <div className={show ? "d-block" : "d-none"}>
        <DefaultPlayground
          corrects={corrects}
          setcorrects={setcorrects}
          mistakes={mistakes}
          setMistakes={setMistakes}
          words={words}
          status={status}
          setStatus={setStatus}
          setSec={setSec}
          setMin={setMin}
        />
      </div>
      <div className={status === "finished" ? "d-block" : "d-none"}>
        <h1>corrects {corrects}</h1>
        <h1>mistakes {mistakes}</h1>
        <h1>
          Time {min}:{sec}
        </h1>
        <h1>Time in sec {min * 60 + sec}</h1>
        <Button onClick={() => window.location.reload()}>Play Again</Button>
      </div>
    </>
  );
};

export default RandomPlay;
