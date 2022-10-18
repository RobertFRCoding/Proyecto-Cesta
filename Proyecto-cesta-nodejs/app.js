const servidor = require('express');
const app = servidor();
const cors = require('cors');
const mysql = require('./db.js');
app.use(cors());
app.get("/ping" , (req, res) =>{
    res.send({"pong": new Date() })
})

app.get("/products", async (req, res) => {
    try {
        const [results, fields] = await mysql.q("SELECT * FROM Products");
        res.send(results);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }    
})

app.get("/products/:id", async (req, res) => {
    try {
        const [results, fields] = await mysql.q("SELECT * FROM Products where ProductID = ?", [req.params.id]);
        res.send(results);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }    
})

app.listen(7777, () => {
    console.log('servidor iniciado');
})