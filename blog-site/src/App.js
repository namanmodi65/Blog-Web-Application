import './App.css';
import { useContext } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './component/footer/Footer';
import Home from './component/home/Home';
import Navbar from './component/navbar/Navbar';
import Login from './component/login/Login';
import Resister from './component/resister/Resister';
import About from './component/about/About';
import Write from './component/write/Write';
import SinglePost from './component/single post/SinglePost';
import { Context } from './context/Context';
import Settings from './component/settings/Settings';

function App() {
  const {user} = useContext(Context)
  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/login" element ={user?<Home/>:<Login/>} />
      <Route path="/setting" element ={user?<Settings/>:<Login/>} />
      <Route path="/resister" element ={user ? <Home /> : <Resister />} />
      <Route path="/" element ={user?<Home/>:<Login/>} />
      <Route path="/about" element ={user?<About/>:<Login/>} />
      <Route path="/write" element ={user ? <Write /> : <Resister />} />
      <Route path="/post/:postId" element={<SinglePost/>}/>
          
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
