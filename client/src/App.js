
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NewCustomer from './pages/NewCustomer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/newcustomer' element={<ProtectedRoute><NewCustomer/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      
        </Routes>
      </BrowserRouter>
    </>
  );
}


export function ProtectedRoute({children}){
  if(localStorage.getItem('auth')){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}

export default App;
