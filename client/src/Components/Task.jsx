import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { AiOutlineHolder, AiOutlineClose } from 'react-icons/ai'

const Container = styled.div`
    max-width: 99%;
    display: flex;
    align-items: center;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 5px;
    background-color: ${props => props.isDragging ? '#86d3ff' : '#ffffff'};
    box-shadow: 2px 2px 10px #ebebeb;
    color: ${props => props.isDragging ? 'white' : 'black'};

    p{
        word-break: break-word;
        max-width: 200px;
    }

    &:hover .text{
        cursor: text;
    }
    &:hover .close{
        cursor: pointer;
    }
`

const Handle = styled.div`
    width: 20;
    height: 20;
    padding-right: 5px;
`

export default function Task({ task, index, removeTask, setUpdate }) {

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <AiOutlineClose
                        className='close'
                        onClick={() => { removeTask({ taskId: task.id }) }}
                    />

                    <Handle
                        {...provided.dragHandleProps}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <AiOutlineHolder />
                    </Handle>

                    <p
                        className='text'
                        onClick={() => setUpdate({ type: 't', id: task.id, content: task.content })}>{task.content}
                    </p>

                </Container>
            )}
        </Draggable>
    )
}