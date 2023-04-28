import React, { useEffect, useState } from "react";
import Column from './Column'
import styled from "styled-components";
import '../../node_modules/modern-css-reset/src/reset.css'
import { DragDropContext } from "react-beautiful-dnd";
import EditPopUp from "./EditPopUp";
import { AiOutlinePlus } from "react-icons/ai";
import DBI from "../Interface/DBInterface";

const Container = styled.div`
    display: flex;
    overflow-x: scroll;
    height: 92vh;
`

const AddColumnButton = styled.button`
    border: none;
    border-radius: 5px;
    margin-right: 8px;
    margin-left: 5px;
    min-width: 275px;
    height: 45px;
    align-items: center;
    justify-content: center;
    background: #ffffff4e;
    
    &:hover{
        cursor: pointer;
        background-color: #99ceff;
    }
`

const TaskManager = () => {

    const [data, setData] = useState()
    const [object, setObject] = useState()

    useEffect(() => {
        saveData(data)
        console.log('salvo')
    },[data])

    useEffect(() => {
        getData('1')
    },[])

    const onDragEnd = result => {
        const { destination, source, draggableId } = result

        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return

        const start = data.columns[source.droppableId]
        const finish = data.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                'taskIds': newTaskIds
            }

            const newData = {
                ...data,
                'columns': {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            }
            setData(newData)
            return
        }

        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newData = {
            ...data,
            'columns': {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }
        setData(newData)
    }

    const addTask = column => {

        const randomId = Math.floor(Math.random() * 9999999).toString()

        const newTasks = {
            ...data.tasks,
            [randomId]: { id: randomId, content: 'Nova tarefa' }
        }

        const newTaskIds = [...data.columns[column].taskIds, randomId]

        const newData = {
            ...data,
            'tasks': newTasks,
            'columns': {
                ...data.columns,
                [column]: {
                    ...data.columns[column],
                    taskIds: newTaskIds
                }
            }
        }
        setData(newData)
    }

    const addColumn = () => {

        const randomId = Math.floor(Math.random() * 1000).toString()

        const newColumn = {
            id: randomId,
            title: 'Nova tabela',
            taskIds: []
        }

        const newData = {
            ...data,
            'columns': {
                ...data.columns,
                [randomId]: newColumn
            },
            columnOrder: [
                ...data.columnOrder,
                randomId
            ]
        }
        setData(newData)
    }

    const removeTask = (taskId, columnId) => {

        var newTasks = data.tasks
        delete newTasks[taskId]

        var newTaskIds = data.columns[columnId].taskIds
        // eslint-disable-next-line array-callback-return
        newTaskIds.map((taskid, index) => {
            if (taskid === taskId) {
                newTaskIds.splice(index, 1)
            }
        })

        const newData = {
            ...data,
            'tasks': newTasks,
            'columns': {
                ...data.columns,
                [columnId]: {
                    ...data.columns[columnId],
                    taskIds: newTaskIds
                }
            }
        }
        setData(newData)
    }

    const removeColumn = (columnId) => {

        const taskIds = data.columns[columnId].taskIds

        var newTasks = data.tasks
        var newColumns = data.columns
        var newColumnOrder = data.columnOrder

        if (taskIds) {
            // eslint-disable-next-line array-callback-return
            taskIds.map(taskid => {
                delete newTasks[taskid]
            })

            delete newColumns[columnId]

            // eslint-disable-next-line array-callback-return
            newColumnOrder.map((column, index) => {
                if (column === columnId) {
                    newColumnOrder.splice(index, 1)
                }
            })

            const newData = {
                ...data,
                tasks: newTasks,
                columns: newColumns,
                columnOrder: newColumnOrder
            }
            setData(newData)

            return
        }
        delete newColumns[columnId]

        // eslint-disable-next-line array-callback-return
        newColumnOrder.map((column, index) => {
            if (column === columnId) {
                newColumnOrder.splice(index, 1)
            }
        })

        const newData = {
            ...data,
            columns: newColumns,
            columnOrder: newColumnOrder
        }

        setData(newData)
    }

    const saveData = (userid) => {
        DBI.saveData(data, userid)
    }

    const updateObject = (newObject) => {
        if (newObject.content) {
            if (newObject.type === 't') {
                const newData = {
                    ...data,
                    tasks: {
                        ...data.tasks,
                        [newObject.id]: {
                            ...data.tasks[newObject.id],
                            content: newObject.content
                        }
                    }
                }
                setData(newData)
            } else {
                const newData = {
                    ...data,
                    columns: {
                        ...data.columns,
                        [newObject.id]: {
                            ...data.columns[newObject.id],
                            title: newObject.content
                        }
                    }
                }
                setData(newData)
            }
            
        }
        setObject('')
    }

    async function getData(userid) {
        const response = await DBI.getData(userid)
        setData(JSON.parse(response.dashboard))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                {data && data.columnOrder.map(columnId => {
                    const column = data.columns[columnId]
                    const tasks = column.taskIds.map(taskId => data.tasks[taskId])

                    return <Column
                        key={column.id}

                        addTask={addTask}
                        removeTask={removeTask}
                        setUpdate={setObject}
                        removeColumn={removeColumn}

                        column={column}
                        tasks={tasks} />
                })}
                <AddColumnButton onClick={addColumn}>
                    <AiOutlinePlus style={{ 'width': '25px', 'height': '25px' }} color='white' />
                </AddColumnButton>
            </Container>
            {object && <EditPopUp object={object} data={data} updateFunction={updateObject} setObject={setObject} />}
        </DragDropContext>
    )
}

export default TaskManager