import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Protected from './Pages/Protected';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';


function App() {
  return (
    <div className="App overflow-x-hidden ">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<Protected />} >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route />
      </Routes>
    </div>
  );
}

export default App;
