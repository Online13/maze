import { createArray2D } from "../helpers/array.js";
import Position from "../models/Position.js";
import Case from "./Case.js";

class Maze {

    maze;
    ROW = 21;
    COL = 21;
    field;
    cases;

    constructor() {

        this.ROW += 2;
        this.COL += 2;
        this.field = createArray2D(this.ROW, this.COL);
        // inject wall
        for (let j = 0;j < this.COL; j++) {
            this.field[0][j] = 0;
            this.field[this.ROW-1][j] = 0;
        }
        for (let i = 0;i < this.ROW; i++) {
            this.field[i][0] = 0;
            this.field[i][this.COL-1] = 0;
        }
        // this.field = [
        //     [0, 1, 0, 0, 0, 1, 0],
        //     [1, 1, 0, 1, 1, 1, 0],
        //     [0, 1, 0, 1, 0, 0, 0],
        //     [0, 1, 0, 1, 1, 1, 1],
        //     [1, 1, 1, 1, 0, 1, 0],
        //     [1, 0, 0, 1, 0, 0, 0],
        //     [1, 1, 0, 1, 1, 1, 1],
        //     [0, 1, 0, 0, 0, 0, 0],
        // ];

        this.cases = new Array(this.ROW);
        for (let i = 0; i < this.ROW; i++)
            this.cases[i] = new Array(this.COL);

        this.maze = document.querySelector('.maze');
        Object.assign(this.maze.style, {
            width: `calc(${this.COL} * var(--size-col))`,
            height: `calc(${this.ROW} * var(--size-row))`,
        });
    }


    render() {
        this.maze.innerHTML = "";
        for (let i = 0; i < this.ROW; i++) {
            for (let j = 0; j < this.COL; j++) {
                let position = new Position({ x: i, y: j });
                let cas = new Case(position, this.field[i][j])
                this.cases[i][j] = cas;
                this.maze.appendChild(cas.instance);
            }
        }
    }

    getRandomPath() {
        const paths = this.cases.flat().filter(c => !c.wall);
        return paths[Math.floor(Math.random() * (paths.length))].position;
    }

    isPath(position) {
        return this.cases[position.x][position.y].instance.classList.contains('type-1');
    }

    add(object) {
        object.defineEnvironment(this);
        const position = { ...(this.getRandomPath()) };
        object.position = position;
        this.maze.appendChild(object.instance);
    }

    isIn(position) {
        return (position.x >= 0 && position.x < this.ROW) &&
            (position.y >= 0 && position.y < this.COL);
    }

    isUsefulWall(position) {

        const neighbors = [
            { x: position.x + 1, y: position.y },
            { x: position.x - 1, y: position.y },
            { x: position.x, y: position.y + 1 },
            { x: position.x, y: position.y - 1 },
        ];
        let value = neighbors.filter(neighbor => this.isIn(neighbor))
            .map((position) => this.field[position.x][position.y])
            .filter(value => value > 0);

        let min = Infinity, max = 0;
        value.forEach(v => {
            if (min > v) min = v;
            if (max < v) max = v;
        });
        return (max !== 0 && min !== max);
    }

    mergePath(position) {
        const neighbors = [
            { x: position.x + 1, y: position.y },
            { x: position.x - 1, y: position.y },
            { x: position.x, y: position.y + 1 },
            { x: position.x, y: position.y - 1 },
        ];

        const value = neighbors.filter(neighbor => this.isIn(neighbor))
            .map((p) => this.field[p.x][p.y])
            .filter(value => value > 0);

        // get min
        let min = Infinity;
        value.forEach(v => {
            if (min > v) min = v;
        });

        // broke wall 
        this.field[position.x][position.y] = min;

        for (let i = 0; i < this.ROW; i++) {
            for (let j = 0; j < this.COL; j++) {
                for (const v of value) {
                    if (this.field[i][j] === v) {
                        this.field[i][j] = min;
                    }
                }
            }
        }

    }

    generate() {
        return new Promise((resolve) => {
            // create grid
            for (let i = 1, k = 1; i < this.ROW-1; i++) {
                for (let j = 1; j < this.COL-1; j++) {
                    this.field[i][j] = ((i-1) % 2 === 0) && ((j-1) % 2 === 0) ?
                        k++ : 0;
                }
            }

            // create maze
            let temp = createArray2D(this.ROW, this.COL);
            for (let i = 0, k = 1; i < this.ROW; i++)
                for (let j = 0; j < this.COL; j++)
                    temp[i][j] = { x: i, y: j };

            let useFullWallPosition = [0];
            const id = setInterval(() => {
                useFullWallPosition = temp.flat().filter((e) => this.isUsefulWall(e));
                if (useFullWallPosition.length > 0) {
                    let toBroke = useFullWallPosition[parseInt(Math.random() * useFullWallPosition.length - 1)];
                    this.mergePath(toBroke);
                    this.render();
                } else {
                    clearInterval(id);
                    resolve();
                }
            }, 30);

        })

    }

}

export default Maze;