import './App.css';
import AdminIndex from './pages/AdminIndex';
import CarMenu from './pages/CarMenu';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes, Link } from 'react-router-dom';
import UserMenu from './pages/UserMenu';
import CarCreate from './pages/CarCreate';
import CarDelete from './pages/CarDelete';
import CarUpdate from './pages/CarUpdate';
import AdvertCreate from './pages/AdvertCreate';
import DiscussionCreate from './pages/DiscussionCreate';
import AdvertMenu from './pages/AdvertMenu';
import AdvertView from './pages/AdvertView';
import Discussions from './pages/Discussions';
import DiscussionView from './pages/DiscussionView';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Dialog from './pages/Dialog';
import DialogMenu from './pages/DialogMenu';
import DialogAnsw from './pages/DialogAnsw';
import DiscussionChart from './pages/Chart';


function App() {
  return (
    <>
    <div className="App">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
    <header className="navbar navbar-expand-md bg-dark navbar-dark">
      <a className='navbar-brand mr-sm-2' href='/home'>Личный кабинет</a>
      <a className='navbar-brand' href='/advert'>Объявления</a>
      <a className='navbar-brand' href='/admin/carmenu'>Меню машин</a>
      <a className='navbar-brand' href='/discussion'>Обсуждения</a>
    </header>
    <Routes>
      <Route path='/login' element={<Login />}></Route> 
      <Route path='/register' element = { <Register />}></Route>
      <Route path='/advert'>
        <Route index element ={<AdvertMenu />}></Route>
        <Route path='create' element = {<AdvertCreate />}></Route>
        <Route path=':id' element = {<AdvertView/>}></Route>
        <Route path='dialog/:id' element = {<Dialog />}></Route>
      </Route>
      <Route path='/discussion'>
        <Route index element ={<Discussions/>}></Route>
        <Route path='create' element = {<DiscussionCreate />}></Route>
        <Route path=':id' element = {<DiscussionView/>}></Route>
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
      </Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/chart' element={<DiscussionChart />}></Route>
      <Route path='/home/favourite' element={<Favourites />}></Route>
      <Route path='/home/dialogmenu' element={<DialogMenu />}></Route>
      <Route path='/home/dialog/:id' element={<DialogAnsw />}></Route>
    </Routes>  
    </div>
    </>
  );
}

export default App;