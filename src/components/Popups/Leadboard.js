import React, { useState } from 'react'
import { useRef , useEffect } from 'react'


const Leadboard = ({viewImg , setViewImg , reset , setGameStart}) => {
  const imgRef = useRef();

    const clickOutSide = (e) => {
    if (!imgRef.current.contains(e.target)) {
      setViewImg(false)  
    } 
  }


    useEffect(() => {
    document.addEventListener("click", clickOutSide, true)
    }, [])

  return (
    <div>
      <div onClick={() => {   setViewImg(false)  ; reset() }} className={viewImg === true ? "Leadboard Leadboard_active" : "Leadboard Leadboard_unactive"} >
        <div ref={imgRef} onClick={(e) => clickOutSide(e)} className="Leadboard_inner">
          <h4>Leadboard</h4>  
          <p>Your Score "<b>50</b>"</p>
           <h5>Better Luck Next Time</h5>
          <div className="Leadboard_retry">
            <button onClick={() => reset()}>Retry</button>
          </div>
        </div>
        </div>      
    </div>
  )
}

export default Leadboard