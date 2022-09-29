import React, { useEffect } from "react";
import { useState } from "react";
import QuizQuestion from "../../APIS/QuizQuestion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { increase } from "../../Redux-Store/pointsSlice";
import { ProgressBar } from 'react-bootstrap'
import Leadboard from "../../components/Popups/Leadboard";
import AreYouReady from "../../components/Popups/AreYouReady";




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

  const [gameStart , setGameStart] = useState(false)
  
  let interval = undefined;

  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  // getting redux values
  const { points } = useSelector((state) => state.points);

    
  useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 3);
      }, 150);
    } else {
      clearInterval(interval)
    } 
  }, [running]);
    


  useEffect(() => {
    if (questionNumber === QuizQuestion.length && questionNumber <= QuizQuestion.length) {
      if (wrongAns && rightAns) {
        // setViewImg(true)
        console.log("no move this time")
        setTimeout(() => {
        setProgress(0)
        clearInterval(interval)  
        setRunning(false)
        setViewImg(true)  
        }, 2000)
      }   
    } 

    if (rightAns && wrongAns) {     
      setTimeout(() => {
       next()     
      }, 800)
    }

  }, [rightAns, wrongAns]);
  

  useEffect(() => {
    if(progress >= 100) {
      console.log("moved")
      clearInterval(interval);
      setProgress(0);
      next();
      setRunning(false)
    } else if (questionNumber === QuizQuestion.length && questionNumber <= QuizQuestion.length) {
      console.log("got you bitch")
      setTimeout(() => {
        console.log("got you bitch 2")
        clearInterval(interval);
        setProgress(0);
        setRunning(false)
      }, 3000) 
    }
   }, [progress])
  

  // check ans is true or false
  const checkIfTrue = (index) => {
    setRightAns(true);
    setBtnBlocked(true);
    setWrongAns(true)
    setProgress(0);
    clearInterval(interval);
    setRunning(false)
    dispatch(increase( point ))
    if (index === selectedAns) {
      setBtnBlocked(true);
      setRightAns(true);
      setWrongAns(true);
    }
  };

  // next
  const next = (e) => {
    if (questionNumber === QuizQuestion.length || questionNumber >= QuizQuestion.length) {
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
      setQuestionIndex(() => QuizQuestion[questionNumber]);
      setRunning(false)
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
    setProgress(0)
    setPoint("")
    setPreviousBtnBlock(true);
    setRightAns(false);
    setWrongAns(false);
    setBtnBlocked(false);
    setSelectedAns("");
    setViewImg(false)
    setQuestionNumber(1);
    setQuestionIndex(QuizQuestion[0]);
    setRunning(false)
  }

  return (
    <div>

      <div className="bgImg">
        {gameStart === false ? <AreYouReady  setRunning={setRunning} setGameStart={setGameStart} /> : <div className="bgImg_inner">
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
          </div>
        </div> }
 
       <Leadboard setGameStart={setGameStart} reset={reset} setViewImg={setViewImg} viewImg={viewImg}/>
      </div>
    </div>
  );
};

export default Welcome;
