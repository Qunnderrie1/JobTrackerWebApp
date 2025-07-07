import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Protected from './Pages/Protected';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import NavBar from './Components/NavBar';


function App() {
  return (
    <div className="App relative">

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<SignUp />} />
        <Route element={<Protected />} >
          <Route path='/' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Profile />} />
        </Route>
        <Route />
      </Routes>
    </div>
  );
}

export default App;
