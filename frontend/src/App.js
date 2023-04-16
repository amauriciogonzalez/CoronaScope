import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Predict from './components/Predict';
import {Routes, Route, useNavigate} from 'react-router-dom'

function App()
{
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/predict' element={<Predict/>} />
            </Routes>
        </div>
    );
}

export default App;
