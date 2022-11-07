import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import Delete from "./Delete"

const Books = () => {
    const [books, setBooks] = useState([])
    // Delete Confirmation
    const [sureToDelete, setSureToDelete] = useState(false)
    // Book ID to Delete
    const [bookIdToDelete, setBookIdToDelete] = useState(null)

    useEffect(()=>{
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
                // console.log(res);
            } catch(err) {
                console.log(err);
            }
        }
        fetchAllBooks()
    },[])

    // const handleDelete = async bookId => {
    //     try{
    //         await axios.delete(`http://localhost:8800/books/${bookId}`)
    //         window.location.reload()
    //     } catch(err){
    //         console.log(err);
    //     }
    // }

    // let bookIdToDelete ;
    const handleDelete = (bookId) => {
        setBookIdToDelete(bookId);
        setSureToDelete(true)
        // console.log(bookIdToDelete)
    }
    
  return (
    <div className='container'>
        <h1>Mr Masss Book Shop</h1>
        <div className="books">
            {books.map(book =>(
                <div className="book" key={book.id}>
                    {book.cover && <img src={book.cover} alt="" />}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>{book.price}</span>
                    <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>                    
                </div>
            )
            )}
        </div>
        {/* Delete Pop-up */}
        {sureToDelete && <Delete bookIdToDelete={bookIdToDelete} setSureToDelete={setSureToDelete} />}
        <button ><Link className='add-new-book' to="/add">Add New Book</Link></button>
    </div>
  )
}

export default Books