import React from 'react'
import TaskManager from '../Components/TaskManager'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { AiOutlineProject } from 'react-icons/ai'
import '../Fonts.css'

const Header = styled.div`
    display: flex;
    width: 100vw;
    height: 8vh;
    color: #ffffff;
    justify-content: center;
    align-items: center;
    z-index: 15;
    box-shadow: 5px 5px 5px #000000d1f;
`
const Logo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 150px;

    h1{
        font-size: 32px;
        margin-left: 5px;
    }
`
const GlobalStyle = createGlobalStyle`
    body{
        background: linear-gradient(0,
        #a445fc,
        #fd1df2,
        #ff1111)
    }
    p{
        font-size: 14px;
    }
    ::-webkit-scrollbar {
        width: 1em;
        height: 1em;
    }
    ::-webkit-scrollbar-track {
        background: white;
    }
    ::-webkit-scrollbar-thumb {
        background: #ffc965;
        border-radius: 5px;
        border: solid 2px white;
        :hover{
            background-color: orange;
        };
    }
    @supports (scrollbar-color: orange white){
        *{
            scrollbar-color: orange white;
            scrollbar-width: auto;
        }
    }
`

export default function Dashboard() {
    return (
        <div>
            <link
                rel="preload"
                href="/fonts/Montserrat.ttf"
                as="font"
                type="font/ttf"
                crossOrigin=""
            />
            <GlobalStyle />
            <Header>
                <Logo>
                    <AiOutlineProject size={'50px'} />
                    <h1>Tasker</h1>
                </Logo>
            </Header>
            <TaskManager />
        </div>
    )
}