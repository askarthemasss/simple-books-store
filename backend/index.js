import express from "express"
import mysql from "mysql"
import cors from 'cors'

const app = express()

// By default cannot send data to express server - overcome by using a express middleware
// allows us to send any json file using a client
app.use(express.json())
// our backend blocks using api - overcome with cors middleware
app.use(cors())

// create connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"lama_dev_books"
})

// For Auth Error - add to mysql code
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

// Reach backend server - fetch - using express server
app.get("/", (req,res)=> {
    res.json("Hello this is Backend!!")
})

// fetch books
app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// add book
app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES(?)"
    // const values = ["title-3 from vs", "desc-3 from vs", "cover-3 from vs"]
    // read input from client
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]
    db.query(q,[values],(err, data)=>{
        if(err) return res.json(err)
        // return res.json(data)
        return res.json("Books has been creatd Successfully!!!")
    })
})

// delete book
app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Books has been deleted Successfully!!!")
    })
})

// update book
app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ? "

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values,bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Books has been updated Successfully!!!")
    })
})

// listen
app.listen(8800, ()=>{
    console.log("Connected to Backend!");
})