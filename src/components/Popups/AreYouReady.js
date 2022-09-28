import React from 'react'

const AreYouReady = ({setRunning , setGameStart}) => {
  return (
    <div>
        <div className="AreYouReady">
        <div className="AreYouReady_inner">
          <div className="AreYouReady_heading">
            <h5>Quiz Game</h5>
            <p>Start The Game</p>
          </div>
            <button onClick={() => { setRunning(true); setGameStart(true) }}>Start</button>
        </div>

      </div>
    </div>      
  )
}

export default AreYouReady