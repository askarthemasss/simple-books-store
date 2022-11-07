import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Update = () => {
  const [book, setBook] = useState({
    title:"",
    desc:"",
    price:0,
    cover:"",
  })

  // const location = useLocation()
  // let bookId = location.pathname.split("/").pop();

  // Load Current Title, desc, price,... like opening in edit mode
  useEffect(()=>{
    fetch("http://localhost:8800/books/")
    .then(res => res.json())
    .then(data => {
        let bookData = data.filter(e => e.id == bookId)
        setBook({
          title:bookData[0].title,
          desc:bookData[0].desc,
          price:bookData[0].price,
          cover:bookData[0].cover
        })
    })
  },[])

  // console.log(book)

  const navigate = useNavigate()
  // can reach the url to get ID using useLocation() - from react-router-dom
  const location = useLocation()
  // console.log(location);
  // split pathname prop and get last element - i.e, ID
  // console.log(location.pathname.split("/").pop());
  let bookId = location.pathname.split("/").pop();

  const handleChange = (e) => {
    setBook(prev => ({...prev, [e.target.name]:e.target.value}))
  }

  // console.log(books);

  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.put("http://localhost:8800/books/"+bookId, book)
      // Navigate to Home Page
      navigate("/")
    } catch(err){
      console.log(err);
    }
  }

  return (
    <div className='form'>
      <h1>Update the Book</h1>
      <input type="text" name="title" value={book.title} placeholder='Title' onChange={handleChange}/>
      <input type="text" name="desc" value={book.desc} placeholder='Description' onChange={handleChange}/>
      <input type="number" name="price" value={book.price} placeholder='Price' onChange={handleChange}/>
      <input type="text" name="cover" value={book.cover} placeholder='Cover' onChange={handleChange}/>
      <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update