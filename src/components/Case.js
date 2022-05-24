import GameObject from "./GameObject.js";

class Case extends GameObject {

    wall;
    constructor(position, type) {
        super({ 
            position,
            alive: false,
            instance: Case.create(type),
        });
        this.wall = type === 0 ? true : false;
    }

    static create(type) {
        const _case = document.createElement('div');
        _case.classList.add('case');
        _case.classList.add(`type-${type === 0 ? 0 : 1}`);
        return _case;
    }

}

export default Case;