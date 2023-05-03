import './App.css';
import AdminIndex from './pages/AdminIndex';
import CarMenu from './pages/CarMenu';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes, Link } from 'react-router-dom';
import UserMenu from './pages/UserMenu';
import DiscussionCommentMenu from './pages/DiscussionCommentMenu';
import CarCreate from './pages/CarCreate';
import CarDelete from './pages/CarDelete';
import CarUpdate from './pages/CarUpdate';
import AdvertCreate from './pages/AdvertCreate';


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
      <Route path='/advert'>
        <Route index element ={<></>}></Route>
        <Route path='create' element = {<AdvertCreate />}></Route>
      </Route>
      <Route path='/admin' >
        <Route index element={<AdminIndex />}></Route>
        <Route path='carmenu'>
          <Route index element ={<CarMenu />}></Route>
          <Route path='create' element={<CarCreate />}></Route>
          <Route path='delete/:id' element={<CarDelete />}></Route>
          <Route path='update/:id' element={<CarUpdate />}></Route>
        </Route>
        <Route path='/admin/userMenu'>
          <Route index element = {<UserMenu />}></Route>
          
        </Route>
        <Route path = '/admin/discussioncommentmenu'>
          <Route index element = {<DiscussionCommentMenu />}></Route>
        </Route>

      </Route>

    </Routes>  
        
    </div>
    </>
  );
}

export default App;
