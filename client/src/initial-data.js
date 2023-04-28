const initialData = {
    "tasks":{
        "0000000" : { "id": "0000000", "content": "Sua primeira tarefa" }
    },
    "columns":{
        "0000001": {
            "id": "0000001",
            "title": "A fazer",
            "taskIds": ["0000000"]
        },
        "0000002": {
            "id": "0000002",
            "title": "Fazendo",
            "taskIds": []
        },
        "0000003": {
            "id": "0000003",
            "title": "Feito",
            "taskIds": []
        }
    },
    "columnOrder": ["0000001", "0000002", "0000003"]
}

export default initialData