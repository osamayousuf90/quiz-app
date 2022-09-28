import React from 'react'

const AreYouReady = ({setRunning}) => {
  return (
    <div>
        <div className="AreYouReady">
        <div className="AreYouReady_inner">
          <div className="AreYouReady_heading">
            <h5>Quiz Game</h5>
          </div>
          <button onClick={() => setRunning(true)}>Start</button>
        </div>

      </div>
    </div>      
  )
}

export default AreYouReady