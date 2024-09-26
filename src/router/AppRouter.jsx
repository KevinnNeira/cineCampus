import { Routes, Route } from 'react-router-dom';
import {Home} from '../components/Home';
import {LogIn} from '../components/LogIn';
import {SignUp} from '../components/SignUp';
import {Cinema} from '../components/Cinema';
import { Homme } from '../components/HomeApp';

export const AppRouter = () => {
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/logIn' element={<LogIn/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/homeapp'element={<Homme/>}/>
            <Route path='/cinema' element={<Cinema/>}/>
        </Routes>
    )
}

export default AppRouter