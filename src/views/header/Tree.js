import {React, Component} from 'react';
import styled from 'styled-components';
import {Branch} from './Branch';
import {getRandomInt, toRadians, timer, computeWayPoints} from 'utils.js';

const TreeCanvas = styled.canvas`
    background-color: rgba(255, 232, 192, 0);
    z-index: 1;
    top: 0%;
    left: 0%;
    position:absolute;
`;

const MAX_LEVELS = 10;

class Tree extends Component {

    /// tree constructor
    constructor(props) {
        super(props);
        this.time = 1;
        this.canvas = null;
        this.branchColor = 'black'
        this.shadeColor = 'grey'
        this.branches = [];
        this.nextLevelBranches = [];
        this.branchCount = 0;
        this.state = { treeDrawn : false }
    }

    componentDidMount() {
        if (this.state.treeDrawn)
            return;

        this.canvas = document.getElementById('tree-canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setState({treeDrawn : true})
        // create root branch
        let rootBranch = new Branch(3*this.canvas.width/4, 
                                this.canvas.height+5, 180, 30, 80 , 0);
        this.branches.push(rootBranch);
        let another = new Branch(this.canvas.width/4, 
            this.canvas.height+5, 180, 30, 80 , 0);
        this.branches.push(another);
        this.drawTree();
    }

    async drawTree() {
        while(this.branches.length > 0) {
            await this.drawCurrentLevelBranches();
        }
    }
    
    drawShade = () => {
        this.branchColor = 'grey';
        this.drawCurrentLevelBranches();
    }

    async drawCurrentLevelBranches() {
        await timer(400);
        for (let branch of this.branches) {
            this.computeBranchPath(branch);
            this.drawBranch(branch);
            this.branchCount += 1;
        }
        this.branches = this.nextLevelBranches;
        this.nextLevelBranches = [];
    }

    computeBranchPath = (branch) => {
        const ctx = this.canvas.getContext("2d");
        
        // stop drawing branches once length is too small
        if (branch.length < 10 || branch.level === MAX_LEVELS) {
            //this.drawLeafForBranch(branch);
            return;
        }
        
        // draw branch
        let radians = toRadians(branch.angle);
        let nextX = -branch.length * Math.sin(radians) + branch.x;
        let nextY = branch.length * Math.cos(radians) + branch.y;
        let wayPoints = computeWayPoints(branch.x, branch.y, nextX, nextY);
        branch.setWayPoints(wayPoints);

        let numBranches = branch.level === 1 ? 4 : getRandomInt(3) + 1;
        numBranches = branch.level === MAX_LEVELS - 1 ? 10 : numBranches;
        for (let i = 0; i < numBranches; i++) {
            let angleOffset = -1*getRandomInt(45) + getRandomInt(45)
            let lengthReduction = getRandomInt(8) + 3;
            let nextLevelBranch = new Branch(nextX, nextY, branch.angle + angleOffset, 
                                    branch.width - 3,
                                    branch.length - lengthReduction, 
                                    branch.level+1);
            this.nextLevelBranches.push(nextLevelBranch);
        }
        ctx.restore();
    }
    
    drawBranch(branch) {
        var t = 1;
        var points = branch.wayPoints;
        var ctx = this.canvas.getContext("2d");
        if (branch.level < MAX_LEVELS-1)
            animateBranch();
        else
            animateLeaf();
        
        function animateBranch(){
            if(t<points.length-1 && points.length > 1){ requestAnimationFrame(animateBranch); }
            
            if (t >= points.length || points.length <= 1)
                return;
            // draw a line segment between waypoints
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.strokeStyle = 'rgba(219, 207, 175,0.5)';
            ctx.lineWidth = branch.width;  
            ctx.moveTo(points[t-1][0], points[t-1][1]);
            ctx.lineTo(points[t][0], points[t][1]);
            ctx.stroke();
            t++;
        }

        function animateLeaf(){
            if(t<points.length-1 && points.length > 1){ requestAnimationFrame(animateLeaf); }
            
            if (t >= points.length || points.length <= 1)
                return;
                
            //draw leaf
            ctx.beginPath();
            let radius = t;
            ctx.arc(branch.x, branch.y, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(176, 204, 165,0.015)";
            ctx.stroke();
            ctx.fillStyle = "rgba(176, 204, 165," + t*0.015 + ")" ;
            ctx.fill();
            ctx.restore();
            t++
        }
    }

    render() {
      return <TreeCanvas id="tree-canvas"/>;
    }
}

export default Tree;