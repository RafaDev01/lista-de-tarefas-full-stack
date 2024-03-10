const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'bd_tasks'
})

const app = new express()
app.listen(3000, () => {
    console.log('Servidor iniciado')
})

app.use(cors())
app.use(bodyParser.json());

let user_id = null

/*
app.use((req, res, next) => {
    if (user_id) {
        console.log(user_id);
        res.send(user_id); // Envie o ID do usuário como resposta
        next(); // Continue para o próximo middleware ou rota
    }
});*/

//rotas
app.post('/login', (req, res) => {
    const { user, pw } = req.body;

    connection.query("SELECT id FROM users WHERE username = ? AND passwrd = ?", [user, pw], (err, results) => {
        if (err) {
            res.status(500).send(err.sqlMessage);
        } else {
            if (results.length > 0) {
                const id = results[0].id;
                user_id = results[0].id
                res.status(200).json({ id: id });
            } else {
                console.log('log in incorreto')
                res.status(401).send("Usuário ou senha incorretos.");
            }
        }
    });
});

app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results)=> {
        if(err) res.send('MySQL connection error.')
        
        console.log(req.params)
        res.send('MySQL connection OK.')
    })
})

//-----------------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id], (err, results)=> {
        if(err) res.send('MySQL connection error.')
        
        res.json(results)
    })
})

//-----------------------------------------------
app.get("/user/:id/tasks/:status", (req, res) => {
    if(req.params.status !== "all"){
        connection.query("SELECT * FROM tasks WHERE id_user = ? AND task_status = ?", [req.params.id, req.params.status], (err, results)=> {
            if(err) res.send('MySQL connection error.')
            
            res.json(results)
        })
    }else{
        connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results)=> {
            if(err) res.send('MySQL connection error.')
            
            res.json(results)
        })
    }
})

//------------------------------------------------------------

app.post("/user/tasks/update_status", (req, res) => {
    connection.query("UPDATE tasks SET task_status = ?, updated_at = NOW() WHERE id = ?", [req.body.status, req.body.id_task], (err, results)=> {
        if(err) res.send('MySQL connection error.')
    })
    res.json("ok respsota ok")
})

//-------------------------------------------------------------

app.post("/user/tasks/new_task/", (req, res) => {
    connection.query("INSERT INTO tasks VALUES(0, ?, ?, 'new', NOW(), NOW())", [req.body.id_user, req.body.task_text], (err, results)=> {
        if(err) res.send('MySQL connection error.')
    })
    res.json("ok respsota ok")
})

//-----------------------------------------
app.get("/user/tasks/get_task/:id_task/", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id = ?", [req.params.id_task], (err, results)=> {
        if(err) res.send('MySQL connection error.')
        
        res.json(results)
    })
})

//-------------------------------------------------------------

app.post("/user/tasks/update_task/", (req, res) => {
    connection.query("UPDATE tasks SET task_text = ?, updated_at = NOW() WHERE id = ?", [req.body.task_text, req.body.id_task], (err, results)=> {
        if(err) res.send('MySQL connection error.')
    })
    res.json("ok respsota ok")
})

//------------------------------------------------------------

/* FIZ ESSA PARTE SOZINHO COM BASE NO QUE APRENDI E FUNCIONOU.
app.delete("/user/tasks/delete_task/", (req, res) => {
    connection.query("DELETE from tasks WHERE id = ?", [req.body.id_task], (err, results)=> {
        if(err) res.send('MySQL connection error.')
    })
    res.json("ok respsota ok")
})
*/

//-------------------------------------------------------------
app.get("/user/tasks/delete_task/:id_task/", (req, res) => {
    connection.query("DELETE FROM tasks WHERE id = ?", [req.params.id_task], (err, results)=> {
        if(err) res.send('MySQL connection error.')
        res.json(results)
    })
})