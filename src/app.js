import Maze from "./components/Maze.js";
import Agent from "./components/Agent.js";

const agent = new Agent();
const maze = new Maze();

maze.generate().then(() => {
    maze.add(agent);
});
