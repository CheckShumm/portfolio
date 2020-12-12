
export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function toRadians(angle) {
    return Math.PI*angle/180;
}

export function timer(ms) { 
    return new Promise(res => setTimeout(res, ms));
}

// For drawing a line
export function computeWayPoints(startX, startY, endX, endY){
    let waypoints = [];
    let dx = endX - startX;
    let dy = endY - startY;
    const numWayPoints = 20
    for(let j=0;j<numWayPoints;j++){
        let x=startX+dx*j/numWayPoints;
        let y=startY+dy*j/numWayPoints;
        waypoints.push([x,y]);
    }
    return waypoints;
}