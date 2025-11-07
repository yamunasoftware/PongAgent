# PongAgent

A Reinforcement Learning Agent for Pong

## Information

PongAgent is a double player reinforcement learning agent for the popular video game, Pong. The entire reinforcement learning code and environment code was written in TypeScript. This means that it is a simulation and demonstration of the power of reinforcement learning within a constrained environment. The way that this environment simulation works is that there are two learning agents that learn how to play pong against one another. Eventually, these agents learn the patterns and make more and more precise movements to play the game. The agents are based on a perceptron classification model that uses gradient descent along with a reward function, which minimizes the distance from the center of the paddle to the moving ball. The activation function that was chosen was a Sigmoid Activation function.

The application wrapper for the app was written in the React Framework in JavaScript. As mentioned before, the main functionality of the application is written in TypeScript, which is compiled into JavaScript. The application obviously needs to be deployed and run on a server, which is also built into the functionality of the application. The deployment of the application is contained within the ```deploy.sh``` script, which is a custom CI/CD pipeline to deploy the server. This approach of doing all in one pipeline may not be the best for all applications. However, in this case, using a CI/CD pipeline which does dependency installation, compilation, testing, and deployment is actually highly efficient.

The testing framework is a custom Unit Testing framework, specifically built for testing the learning functionality of the reinforcement agents. The unit tests are meant to test the effectiveness of the changing learning done by the agent and opposition agent, both of which run on the same learning method.

The application is also meant to be containerized and run on port 3000, on your compute instance. The container is compatible with all major container management platforms; therefore, the deployment process should be very straightforward.