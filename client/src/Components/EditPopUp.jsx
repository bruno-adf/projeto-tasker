import React, { useState } from 'react'
import styled from 'styled-components'

const PopUp = styled.div`
    position: fixed;
    top: 0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color: #29292971;

    display: flex;
    justify-content: center;
    align-items: center;
`
const PopUpInner = styled.div`
    position: relative;
    padding: 32px;
    min-width: 500px;
    background-color: white;
    border-radius: 15px;
`
const SubmitButton = styled.button`
    border: none;
    background-color: #d6d6d6;
    border-radius: 5px;
    width: 40%;
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

const CancelButton = styled.button`
    border: none;
    background-color: #d6d6d6;
    border-radius: 5px;
    width: 40%;
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
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
`

const TextInput = styled.input`
    border-radius: 5px;
    border: 1px solid grey;
    width: 100%;
    text-align: center;
`

function EditPopUp({ object, updateFunction, setObject }) {

    const [newObject, setNewObject] = useState(object)
    
    return (
        <PopUp>
            <PopUpInner>
                <TextInput
                    type='text'
                    value={newObject.content}
                    maxLength={object.type === 't' ? '50' : '20'}
                    onChange={(e) => {
                            setNewObject({...newObject, content: e.target.value})
                        }
                    }
                />
                <ButtonContainer>
                    <SubmitButton onClick={() => updateFunction(newObject)}>Submit</SubmitButton>
                    <CancelButton onClick={() => setObject('')}>Cancel</CancelButton>
                </ButtonContainer>
            </PopUpInner>
        </PopUp>)
}

export default EditPopUp