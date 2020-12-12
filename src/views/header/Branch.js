
export class Branch {
    constructor(rootX, rootY, angle, width, length, level) {
        this.x = rootX;
        this.y = rootY;
        this.angle = angle;
        this.width = width;
        this.length = length;
        this.level = level;
        this.wayPoints = []
    }

    setWayPoints = (wayPoints) => {
        this.wayPoints = wayPoints;
    }


}