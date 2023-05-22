import {Navigate, Route, Routes} from 'react-router'
import Home from '../Pages/Home'
import AboutCountry from '../pages/AboutCountry';

function AppRouter(){
  sessionStorage.setItem("pageNum", 1);
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about/:cca3" element={<AboutCountry />} />
        <Route path="" element={<Navigate to="/home" />} />
      </Routes>
    );
}

export default AppRouter