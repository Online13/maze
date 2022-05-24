import Position from "../models/Position.js";


class GameObject {

    alive;
    instance;
    #position = new Position();

    constructor({ position=null, alive=false, instance=null }) {
        this.instance = instance;
        this.position = position;
        this.alive = alive; 
    }
    
    get position() {
        return this.#position;
    }

    get positionDom() {
        return { ...this.instance.dataset };
    }

    /**
     * @param {Position} position
     */
    set position(pposition) {
        let position = new Position(pposition);
        this.#updatePosition(position);
        this.#updateDomPosition(position);
    }

    #updatePosition(position) {
        this.#position.x = position.x;
        this.#position.y = position.y;
    }

    #updateDomPosition(position) {
        this.instance.dataset.x = position.x;
        this.instance.dataset.y = position.y;
        Object.assign(this.instance.style, {
            zIndex: `${this.#position.x * 10}`,
            transform: `translateX(calc(${this.#position.y} * var(--size-col))) translateY(calc(${this.#position.x} * var(--size-row)))`,
        });
    }

}

export default GameObject;