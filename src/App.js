import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes, Link } from 'react-router-dom';


function App() {


  return (
    <>
    <div className="App">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
    <header className="navbar navbar-expand-md bg-dark navbar-dark">
      <a className='navbar-brand' href='/'>Home</a>
      <a className='navbar-brand' href='/login'>Login</a>
      <a className='navbar-brand' href='/register'>Register</a>
    </header>
    <Routes>
      <Route path='/login' element={<Login />}></Route> 
      <Route path='/register' element = { <Register />}></Route>
    </Routes>  
        
    </div>
    </>
  );
}

export default App;
