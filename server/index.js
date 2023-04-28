const express = require('express')
const http = require('http')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasker'

})

const app = express()

app.use(cors())
app.use(express.json())
app.use(jsonParser)

http
    .createServer(app)
    .listen(4001)

app.get('/:userid', (req, res) => {
    const {userid} = req.params
    con.query(`SELECT * FROM users WHERE id = ${userid}`, (err, result) => {
        res.send(result[0])
    })
})

app.post('/', (req, res) => {
    const { dashboard } = req.body
    const sql = `UPDATE users SET dashboard='${dashboard}' WHERE username='bruno'`
    con.query(sql, (err, result) => {
        res.send(result)
    })
})