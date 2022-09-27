import React, { useEffect } from "react";
import { useState } from "react";
import QuizQuestion from "../../APIS/QuizQuestion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { increase } from "../../Redux-Store/pointsSlice";
import { ProgressBar } from 'react-bootstrap'
import Leadboard from "../../components/Popups/Leadboard";
import { selectClasses } from "@mui/material";



const Welcome = () => {
  const [questionIndex, setQuestionIndex] = useState(QuizQuestion[0]);
  const [rightAns, setRightAns] = useState(false);
  const [wrongAns, setWrongAns] = useState(false);
  const [selectedAns, setSelectedAns] = useState();
  const [btnBlocked, setBtnBlocked] = useState(false);
  const [previousBtnBlock, setPreviousBtnBlock] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [point, setPoint] = useState("");
  const dispatch = useDispatch();
  const [viewImg, setViewImg] = useState(false);


  let interval = undefined;

  const [running, setRunning] = useState(true);
  const [progress, setProgress] = useState(0);

  // getting redux values
  const { points } = useSelector((state) => state.points);

    
  useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 150);
    } else {
      clearInterval(interval)
    } 
  }, [running]);
    


  useEffect(() => {
  
    if (questionNumber === QuizQuestion.length && questionNumber <= QuizQuestion.length) {
      if (wrongAns && rightAns) {
        setViewImg(true)
      } 
    } 
    
    if (!rightAns && !wrongAns) {
      console.log("wait because ans is not given yet so moving on");
    }

    if(rightAns && wrongAns) {      
      setTimeout(() => {
      next()
      console.log("Moved On Succesfully");  
      }, 2000)
    }


  }, [point , wrongAns , rightAns ]);


  

  // check ans is true or false
  const checkIfTrue = (index) => {
    setRightAns(true);
    setBtnBlocked(true);
    setWrongAns(true)
    dispatch(increase( point ))
    if (index === selectedAns) {
      setBtnBlocked(true);
      setRightAns(true);
      setWrongAns(true);
    }
  };

  // next
  const next = (e) => {
    if (questionNumber === QuizQuestion.length ||questionNumber >= QuizQuestion.length){
      return false;
    } else {
      setProgress(0)
      setPoint("")
      setPreviousBtnBlock(true);
      setRightAns(false);
      setWrongAns(false);
      setBtnBlocked(false);
      setSelectedAns("");
      setQuestionNumber((prev) => prev + 1);
      setQuestionIndex((prev) => QuizQuestion[questionNumber]);
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


  const reset = () => {
    console.log("reset")
    setProgress(0)
    setRunning(false)
    clearInterval(interval);
    setQuestionIndex((prev) => QuizQuestion[0]);
    setViewImg(false)
  }

  return (
    <div>
      <div className="bgImg">
        <div className="bgImg_inner">
          {/* <div className="bgImg_heading">
            <h5>Quiz Game</h5>
          </div> */}
          <div className="bgImg_progressBar">
            <ProgressBar now={progress} variant="success"/>
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

              {questionIndex?.answers?.map((res, index , key) => {
                return (
                  <button key={key.points} disabled={btnBlocked} className={rightAns === true && res?.isCorrect === true && "rightAns" || selectedAns === index && "wrongAns"} onClick={() => { setSelectedAns(index); checkIfTrue(index); setPoint(res?.points) }}>{res?.ansText}</button>
                )
              })}
            </div>
            <button className="next" onClick={() => next()}><i className="fa-solid fa-arrow-right"></i></button>
            <button className="previous" onClick={() => previous()} disabled={previousBtnBlock}><i className="fa-solid fa-arrow-left"></i></button> 
          </div>
        </div>
      <Leadboard reset={reset} setViewImg={setViewImg} viewImg={viewImg}/>

      </div>
    </div>
  );
};

export default Welcome;
