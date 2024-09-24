import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';
import Crud from '../components/Crud';
import { Homme } from '../components/HomeApp';

export const AppRouter = () => {
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/logIn' element={<LogIn/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/client' element={<Crud/>}/>
            <Route path='/homeapp'element={<Homme/>}/>
        </Routes>
    )
}

export default AppRouter