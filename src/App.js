import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import AuthProvider from './components/context/AuthProvider/AuthProvider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter >
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<Login />}></Route>
            <Route path='/reg' element={<PrivateRoute><Register /></PrivateRoute>}></Route>
          </Routes>
        </BrowserRouter >
      </AuthProvider>
    </div>
  );
}

export default App;
