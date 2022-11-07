import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [book, setBook] = useState({
    title:"",
    desc:"",
    price:null,
    cover:"",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook(prev => ({...prev, [e.target.name]:e.target.value}))
  }

  // console.log(books);

  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/books", book)
      // Navigate to Home Page
      navigate("/")
    } catch(err){
      console.log(err);
    }
  }

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" name="title" placeholder='Title' onChange={handleChange}/>
      <input type="text" name="desc" placeholder='Description' onChange={handleChange}/>
      <input type="number" name="price" placeholder='Price' onChange={handleChange}/>
      <input type="text" name="cover" placeholder='Cover' onChange={handleChange}/>
      <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add
