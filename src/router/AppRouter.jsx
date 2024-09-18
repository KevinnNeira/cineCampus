import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import LogIn from '../components/LogIn';

export const AppRouter = () => {
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LogIn/>}/>
        </Routes>
    )
}

export default AppRouter