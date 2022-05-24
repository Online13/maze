import GameObject from "./GameObject.js";

class Agent extends GameObject {

    environment;

    constructor() {
        super({ instance: Agent.create(), alive: true });
        this.environment = null;
        this.handleMove();
    }

    defineEnvironment(environment) {
        this.environment = environment;
    }

    static create() {
        let instance = document.createElement('div');
        instance.classList.add('agent');
        return instance;
    }

    handleMove() {
        window.addEventListener('keydown', (e) => {
            const { x, y } = this.positionDom;
            let nextPosition = { ...this.positionDom };
            switch (e.key) {
                case "ArrowUp":
                    nextPosition.x = parseInt(x) - 1;
                    break;
                case "ArrowDown":
                    nextPosition.x = parseInt(x) + 1;
                    break;
                case "ArrowLeft":
                    nextPosition.y = parseInt(y) - 1;
                    break;
                case "ArrowRight":
                    nextPosition.y = parseInt(y) + 1;
                    break;
            }
            if (this.environment.isIn(nextPosition) && this.environment.isPath(nextPosition)) {
                this.position = nextPosition;
            }
        });
    }

}

export default Agent;