import axios from "axios"

export default class DBInterface {
    static getData(userid) {
        const callApi = async () => {
            try {
                const url = `http://localhost:4001/${userid}`
                const apiRes = await axios.get(url)
                return apiRes.data
            } catch (error) {
                console.log(error)
            }
        }
        return callApi()
        // const options = {
        //     method: 'get',
        //     url: `http://localhost:4001/${userid}`,
        //     headers: {
        //         'content-type': 'application.json'
        //     }
        // }
        // axios.request(options)
        //     .then((res) => {
        //         console.log(res.data)
        //     })
    }
    static saveData (data, userId) {
        const dataJson = JSON.stringify(data)
        const options = {
            method: 'get',
            url: `http://localhost:4001`,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                "dashboard": dataJson
            }
        }
        axios.request(options)
            .then((res) => console.log(res))
    }
}