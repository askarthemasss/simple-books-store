// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Books from './pages/Books'
import Add from './pages/Add'
import Update from './pages/Update'
import NoPage from './pages/NoPage'
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books />}></Route>
          <Route path='/add' element={<Add />}></Route>
          <Route path='/update/:id' element={<Update />}></Route>
          <Route path='/*' element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
