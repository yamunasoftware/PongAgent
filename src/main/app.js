import React, { useEffect, useRef } from 'react';
import Environment from './main.js';
import '../public/style.css';

// App Component Function:
export default function App() {
  const canvasRef = useRef(null);
  const width = 600, height = 300;
  const environment = new Environment();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
      
    const gameLoop = () => {
      environment.update();
      renderCanvas(environment, context, width, height);
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, []);

  return (
    <div className="center">
      <div className="header padding-bottom">PongAgent</div>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

// Canvas Render Function:
function renderCanvas(environment, context, width, height) {
  // Gets the Dimensions:
  var paddleWidth = width * environment.getDimensions()[0];
  var paddleHeight = height * environment.getDimensions()[1];
  var ballRadius = width * environment.getDimensions()[2];

  // Gets the Positions:
  var ballX = environment.getPosition()[0] * width;
  var ballY = environment.getPosition()[1] * height;
  var paddleX = environment.getPosition()[2] * width;
  var paddleY = environment.getPosition()[3] * height;

  var oppositeX = environment.getOppositionPosition()[0] * width;
  var oppositeY = environment.getOppositionPosition()[1] * height;
  
  // Clears Canvas:
  context.fillStyle = "#000000";
  context.clearRect(0, 0, width, height);
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#FFFFFF";

  // Draw Ball:
  context.beginPath();
  context.arc(
    ballX, 
    ballY,
    ballRadius, 
    0, Math.PI * 2
  );
  context.fill();
  context.closePath();

  // Draw Paddle:
  context.fillRect(
    paddleX, 
    paddleY - paddleHeight / 2, 
    paddleWidth, 
    paddleHeight
  );

  // Draw Opposition:
  context.fillRect(
    oppositeX, 
    oppositeY - paddleHeight / 2, 
    paddleWidth, 
    paddleHeight
  );
}