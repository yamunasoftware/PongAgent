# PongAgent

A Reinforcement Learning Agent for Pong

## Information

PongAgent is a double player reinforcement learning agent for the popular video game, Pong. The entire reinforcement learning code and environment code was written in TypeScript. This means that it is a simulation and demonstration of the power of reinforcement learning within a constrained environment. The way that this environment simulation works is that there are two learning agents that learn how to play pong against one another. Eventually, these agents learn the patterns and make more and more precise movements to play the game. The agents are based on a perceptron classification model that uses gradient descent along with a reward function, which minimizes the distance from the center of the paddle to the moving ball. The activation function that was chosen was a Sigmoid Activation function.

The application wrapper for the app was written in the React Framework in JavaScript. As mentioned before, the main functionality of the application is written in TypeScript, which is compiled into JavaScript. The application is also meant to be run using Docker on port 8080.