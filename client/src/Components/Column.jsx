import React from "react";
import styled from 'styled-components'
import Task from './Task'
import { Droppable } from "react-beautiful-dnd";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 275px;
    max-width: 275px;
    margin: 0px 8px 8px 8px;
    border-radius: 7px 7px;
    box-shadow: 2px 2px 10px #0000001c;
    align-self: start;
    background-color: white;
`
const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .delete-button{
        margin-top: 10px;
        margin-right: 10px;
        :hover{
            cursor: pointer;
        }
    }
`

const Title = styled.h3`
    max-width: 300px;

    word-break: break-word;

    padding: 8px;
    margin-left: 10px;
    margin-top: 3px;    
`
const TaskList = styled.div`
    min-height: 20px;
    flex-grow: 1;
    padding: 8px;
    background-color: ${props => props.isDraggingOver ? '#e7f6ff' : '#ffffff'};
`
const AddTaskButton = styled.div`
    height: 20px;

    margin-bottom: 12px;

    display: flex;
    flex-direction: row;
    
    justify-content: left;
    align-items: center;
    align-self: center;
    
    h3{
        font-weight: 500;
        font-size: 15px;
    }

    &:hover{
        cursor: pointer;
    }
`

export default function Column({ column, tasks, addTask, removeTask, updateTask, setUpdate, removeColumn }) {

    const handleRemoveTask = taskId => {
        removeTask(taskId.taskId, column.id)
    }

    return (
        <Container>
            <Header>
                <Title onClick={() => setUpdate({ type: 'c', id: column.id, content: column.title })}>{column.title}</Title>
                <AiOutlineDelete onClick={() => removeColumn(column.id)} size={'25px'} color='lightgrey' className="delete-button" />
            </Header>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Task
                                key={task.id}
                                task={task}
                                removeTask={handleRemoveTask}
                                updateTask={updateTask}
                                setUpdate={setUpdate}
                                index={index} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
            <AddTaskButton onClick={() => { addTask(column.id) }}>
                <AiOutlinePlus color="lightgrey" />
                <h3 style={{ 'marginLeft': '15px', 'color': 'lightgrey' }}>Adicionar tarefa</h3>
            </AddTaskButton>
        </Container>
    )
}