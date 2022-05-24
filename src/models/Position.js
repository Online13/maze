class Position {

    x = 0; y = 0;

    constructor(props=null) {
        this.x = parseInt(props?.x) || 0;
        this.y = parseInt(props?.y) || 0;
    }

}

export default Position;