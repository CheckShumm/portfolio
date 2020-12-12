import React from 'react';
import styled from 'styled-components'
import IconLinkedIn from 'icons/IconLinkedIn';
import IconResume from 'icons/IconResume';
import IconGithub from 'icons/IconGithub';
import Bird from './Bird';
import Tree from './Tree';

import "styles/App.scss";

const Title = styled.div`
    height: 3.3vw;
    padding: 8px;
    z-index: 1;
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
    font-size: 2.2vw;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 4px;
    text-align: center;
    text-transform: uppercase;
    color: white;
    mix-blend-mode: difference;
    animation: fade-in 2s;
`;

const SubTitle = styled.div`
    height: 1.0vw;
    padding: 8px;
    z-index: 1;
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
    font-size: 1vw;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 2px;
    text-align: center;
    color: white;
    mix-blend-mode: difference;
    animation: fade-in 2s;
`;

const ProfileContainer = styled.div`
    border: 3px solid white;
    padding: 10px;
    position: fixed;
    mix-blend-mode: difference;
    left: 50%;
    top: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
`

const Container = styled.div`
    height: 100vh;
    padding: 0px;
    position: relative;
    z-index: 10;
    background-size: cover; /* or contain depending on what you want */
    background-position: center center;
    background-image: linear-gradient(
        165deg,  
        rgba(240, 232, 192, 1.0) 50%,
        rgba(240, 232, 192, 0.8) 50%);
    text-align:center;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 16px;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease; 
    margin: 8px;
    fill: white;
    height: 3vw;
    width: 3vw;
    animation: fade-in 5s;
    &:hover {
        fill: #888888;
        height: 5vw;
        width: 5vw;
    }
    & > svg {
        height: 100%;
        width: 100%;
    }
`;

const renderBirds = (numBirds) => {
    let birds = [];
    for (let i = 0; i < numBirds; i ++) {
        birds.push(
            <Bird
                key={i}
                velocity={6*Math.random() + 2}
                delay={2*Math.random()}
                flapVelocity={2*Math.random()+ 0.25}
                flapDelay={-2*Math.random() - 0.25}
            />
        )
    }
    return birds;
}

function Header() {
    return (
        <Container>
            <Tree/>
            <ProfileContainer>
                <Title> Nathan Shummoogum </Title>
                <SubTitle> I like to code.</SubTitle>
                <Row>
                <SubTitle> About Me </SubTitle>
                <SubTitle>| Projects |</SubTitle>
                <SubTitle> Experience </SubTitle>
                </Row>

                <Row>
                    <Icon>
                        <IconLinkedIn/>
                    </Icon>
                    <Icon>
                        <IconResume/>
                    </Icon>
                    <Icon>
                        <IconGithub/>
                    </Icon>
                </Row>
            </ProfileContainer>
            {renderBirds(5)}
        </Container>
    );
}

export default Header;