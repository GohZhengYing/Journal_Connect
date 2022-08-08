
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/login/login';
import Error from './pages/error/error';
import Home from './pages/home/home';
import Explore from './pages/explore/explore';
import Friends from './pages/friends/friends';
import Settings from './pages/settings/settings';


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/settings' element={<Settings/>}/>
            <Route exact path='/explore' element={<Explore/>}/>
            <Route path='/explore/:id' element={<Explore/>}/>
            <Route exact path='/friends' element={<Friends/>}/>
            <Route path='/*' element={<Error/>}/>
          </Routes>
    </Router>
    </div>
  );
}

export default App;
