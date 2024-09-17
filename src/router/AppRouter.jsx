import { Routes, Route, Navigation } from 'react-router-dom';
import { Home } from '../components/Home';

export const AppRouter = () => {
    return(
        <Routes>
            <Route path='/home' element={<Home/>}/>
        </Routes>
    )
}

export default AppRouter