import React from 'react';
import styled from 'styled-components'
import "styles/Bird.scss";

const BirdImage = styled.div`
	background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg);
	background-size: auto 100%;
	width: 88px;
	height: 125px;
	will-change: background-position;
	animation-name: fly-cycle;
	animation-timing-function: steps(10);
	animation-iteration-count: infinite;
	animation-duration: ${props => props.flapVelocity}s;
	animation-delay: ${props => props.flapDelay}s;
`;

const BirdContainer = styled.div`
	position: absolute;
	top: 10%;
	left: -10%;
	transform: scale(0) translateX(-10vw);
	will-change: transform;
	animation-name: fly-path;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	animation-duration: ${props => props.velocity}s;
	animation-delay: ${props => props.delay}s;
`;

function Bird({velocity, delay, flapVelocity, flapDelay}) {
    console.log("BIRDY:", flapVelocity, flapDelay);
    return (
        <BirdContainer
            velocity={velocity}
            delay={delay}
        >
            <BirdImage
                flapVelocity={flapVelocity}
                flapDelay={flapDelay}
            />
        </BirdContainer>
    );
}

export default Bird;