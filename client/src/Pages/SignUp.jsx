import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Body = styled.div`

    width: 100vw;
    height: 100vh;

    background: linear-gradient(0,
        #a445fc,
        #fd1df2,
        #ff1111);
`
const Container = styled.div`

    width: 300px;

    background-color: white;
    border-radius: 15px;

    margin: 0 auto;
    padding: 0 0 20px 0;
    position: relative;
    top: 20%;

    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        margin-top: 30px;
        color: #0485ff;
        text-decoration: underline;
        :hover{color: orange; cursor: pointer;}
    }
`

const Title = styled.h1`
    margin: 30px 0px;
    color: #0485ff;
`

const Input = styled.input`
    padding-left: 10px;
    margin-bottom: 15px;
    width: 250px;
    border-radius: 5px;
    border: none;
    background-color: #f0f0f0;
    font-size: 12px;
    height: 35px;
`

const SubmitButton = styled.button`
    width: 250px;
    background-color: #0485ff;
    color: #ffffff;
    border: solid 2px #7bbfff;
    border-radius: 5px;
    transition: background-color 0.5s, border-color 0.5s;
    :hover{
        background-color: orange;
        border-color: #ffc965;
        cursor: pointer;
    }
`

export default function SignUp() {
    
    let navigate = useNavigate()

    return (
        <Body>
            <Container>
                <Title>Cadastro</Title>
                <Input type="text" placeholder='Digite seu email'/>
                <Input type="password" placeholder='Digite sua senha'/>
                <Input type="password" placeholder='Confirme sua senha'/>
                <SubmitButton>Cadastrar</SubmitButton>
                <p onClick={() => {navigate('/signin')}}>ou faça login</p>
            </Container>
        </Body>
    )
}