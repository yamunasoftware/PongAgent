export default class Environment {
  /* ENVIRONMENT SETUP */

  // Environment Positions:
  private xPosition: number[];
  private yPosition: number[];
  private oppositePosition: number[];

  // Agent Objects:
  private agent: Agent;
  private opposition: Agent;

  // Environment Dimensions:
  private dimensions: number[];
  private width: number;
  private height: number;

  // Constructor:
  public constructor() {
    this.reset();
    this.width = 1;
    this.height = 1;

    this.agent = new Agent(this.yPosition.length);
    this.opposition = new Agent(this.yPosition.length);
  }

  /* ENVIRONMENT FUNCTIONS */

  // Update Environment:
  public update(): number[][] {
    this.moveBall();
    this.updatePaddle();
    
    let localPosition = [this.yPosition[0], this.yPosition[1], this.oppositePosition[1]];
    let weights = this.agent.updateWeights(this.yPosition);
    let oppositeWeights = this.opposition.updateWeights(localPosition)
    return [weights, oppositeWeights];
  }

  // Moves the Ball:
  private moveBall(): void {
    this.xPosition[0] += 0.01 * this.xPosition[1];
    this.yPosition[0] += 0.01 * this.yPosition[1];

    if (this.xPosition[0] <= 0 || this.xPosition[0] >= this.width) {
      this.reset();
    }

    if (this.yPosition[0] <= 0 || this.yPosition[0] >= this.height) {
      this.yPosition[1] *= -1;
    }

    if (
      this.yPosition[0] >= this.yPosition[2] - this.dimensions[1] / 2 && 
      this.yPosition[0] <= this.yPosition[2] + this.dimensions[1] / 2 &&
      this.xPosition[0] <= this.dimensions[0]
    ) {
      this.xPosition[1] *= -1;
    }

    if (
      this.yPosition[0] >= this.oppositePosition[1] - this.dimensions[1] / 2 && 
      this.yPosition[0] <= this.oppositePosition[1] + this.dimensions[1] / 2 &&
      this.xPosition[0] >= this.oppositePosition[0]
    ) {
      this.xPosition[1] *= -1;
    }
  }

  // Update Paddle Position:
  private updatePaddle(): void {
    let action = this.agent.getAction(this.yPosition);
    if (action === 1 && this.yPosition[2] + this.dimensions[1] / 2 < this.height) {
      this.yPosition[2] += 0.02;
    } 
    
    else if (action === 0 && this.yPosition[2] - this.dimensions[1] / 2 > 0) {
      this.yPosition[2] -= 0.02;
    }

    let localPosition = [this.yPosition[0], this.yPosition[1], this.oppositePosition[1]];
    let oppositionAction = this.opposition.getAction(localPosition);
    if (oppositionAction === 1 && this.oppositePosition[1] + this.dimensions[1] / 2 < this.height) {
      this.oppositePosition[1] += 0.02;
    } 
    
    else if (oppositionAction === 0 && this.oppositePosition[1] - this.dimensions[1] / 2 > 0) {
      this.oppositePosition[1] -= 0.02;
    }
  }

  // Reset Function:
  private reset(): void {
    this.xPosition = [0.75, 1, 0]; // ballX, dX, paddleX
    this.yPosition = [0.5, 1, 0.5]; // ballY, dY, paddleY

    this.oppositePosition = [0.99, 0.5] // oppositionX, oppositionY
    this.dimensions = [0.01, 0.25, 0.025]; // paddleWidth, paddleHeight, ballRadius
  }

  /* ENVIRONMENT UTILITIES */

  // Gets the Opposition Position:
  public getOppositionPosition(): number[] {
    return this.oppositePosition;
  }

  // Gets the Position:
  public getPosition(): number[] {
    return [this.xPosition[0], this.yPosition[0], this.xPosition[2], this.yPosition[2]];
  }

  // Gets the Dimensions:
  public getDimensions(): number[] {
    return this.dimensions;
  }
}

class Agent {
  /* AGENT SETUP */

  // Reinforcement Learning Items:
  private weights: number[];
  private learningRate: number;
  private epsilon : number;

  // Constructor:
  public constructor(size: number) {
    this.learningRate = 0.05;
    this.epsilon = 0.1;

    this.weights = [];
    for (let i = 0; i < size + 1; i++) {
      this.weights.push(Math.random());
    }
  }

  /* AGENT FUNCTIONS */

  // Get Action Function:
  public getAction(position: number[]): number {
    if (Math.random() < this.epsilon) {
      return Math.random() > 0.5 ? 1 : 0;
    }
    
    let output = this.output(position);
    return output > 0.5 ? 1 : 0;
  }

  // Update Weights Function:
  public updateWeights(position: number[]): number[] {
    let reward = position[0] - position[2];
    for (let i = 0; i < this.weights.length - 1; i++) {
      this.weights[i] += this.learningRate * reward * position[i];
    }

    this.weights[this.weights.length - 1] += this.learningRate * reward;
    return this.weights;
  }

  // Output Function:
  private output(position: number[]): number {
    let sum = 0;
    for (let i = 0; i < this.weights.length - 1; i++) {
      sum += position[i] * this.weights[i];
    }

    sum += this.weights[this.weights.length - 1];
    return this.sigmoid(sum);
  }

  // Sigmoid Activation Function:
  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }
}