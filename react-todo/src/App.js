import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import { Signin } from './components/usersignin';
import { Signup } from './components/usersignup.';
import { Userdashboard } from './components/userdashboard';
import { InvalidUser } from './components/userinvalid';

function App() {
  return (
    <div className='container-fluid'>
      <div className='bg-shade'>
        <BrowserRouter>
          <header className='text-center'>
            <h1 className=' m-2 p-2 text-danger'>TO-DO</h1>
            <Link to={'/login'} className='btn btn-success me-2 mt-2 p-2'>Sign In</Link>
            <Link to={'/register'} className='btn btn-danger me-2 mt-2 p-2'>Sign Up</Link>
          </header>
          <section className='d-flex align-items-center justify-content-center ' >

            <Routes>
              <Route path='/login' element={<Signin />} />
              <Route path='/register' element={<Signup />} />
              <Route path='/dashboard' element={<Userdashboard/>}/>
              <Route path='/invaid' element={<InvalidUser/>}/>

            </Routes>
          </section>


        </BrowserRouter>

      </div>

    </div>
  );
}

export default App;
