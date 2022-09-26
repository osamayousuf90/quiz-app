import React from "react";
import { useState } from "react";
import QuizQuestion from "../../APIS/QuizQuestion";


const Welcome = () => {
  const [questionIndex, setQuestionIndex] = useState(QuizQuestion[0]);
  const [rightAns, setRightAns] = useState(false);
  const [selectedAns, setSelectedAns] = useState();
  const [btnBlocked, setBtnBlocked] = useState(false);
  const [previousBtnBlock, setPreviousBtnBlock] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [points, setPoints] = useState("");


  // check ans is true or false
  const checkIfTrue = (index) => {
    setRightAns(true);
    setBtnBlocked(true);
    if (index === selectedAns) {
      setBtnBlocked(true);
      setRightAns(true);
    }
  };

  // next
  const next = () => {
  if (points === "") {
      alert("Select ans first")
  } else {
    if (questionNumber === QuizQuestion.length ||questionNumber >= QuizQuestion.length){
      return false;
    } else {
      setPreviousBtnBlock(true);
      setRightAns(false);
      setBtnBlocked(false);
      setSelectedAns("");
      setQuestionNumber((prev) => prev + 1);
      setQuestionIndex((prev) => QuizQuestion[questionNumber]);
    }
    }
 
  };

  // previous
  const previous = () => {
    if (questionNumber === 1) {
      return false;
    } else {
      setRightAns(false);
      setBtnBlocked(false);
      setSelectedAns("");
      setQuestionNumber((prev) => prev - 1);
      setQuestionIndex((prev) => QuizQuestion[questionNumber - 1]);
    }
  };

  return (
    <div>
      <div className="bgImg">
        <div className="bgImg_inner">
          <div className="bgImg_heading">
            <h5>Quiz Game</h5>
          </div>

          <div className="bgImg_row">
            <div className="bgImg_p1">
              <h5>
                Q {questionNumber}/<span>{QuizQuestion.length}</span>
              </h5>

              <p>{questionIndex?.question} ?</p>
            </div>

            <div className="bgImg_p2">
              <h5>Choose The Answer</h5>

              {questionIndex?.answers?.map((res, index) => {
                return (
                  <button disabled={btnBlocked} className={(rightAns === true && res?.isCorrect === true && "rightAns") || (selectedAns === index && "wrongAns")} onClick={() => { setSelectedAns(index); checkIfTrue(index); setPoints(res?.points) }}>{res?.ansText}</button>
                )
              })}
            </div>
            <button className="next" onClick={() => next()}><i class="fa-solid fa-arrow-right"></i></button>
            <button className="previous" onClick={() => previous()} disabled={previousBtnBlock}><i class="fa-solid fa-arrow-left"></i></button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
