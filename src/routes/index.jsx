import {Navigate, Route, Routes} from 'react-router'
import Home from '../pages/Home'
import AboutCountry from '../pages/AboutCountry';
import Language from '../pages/Language';

function AppRouter(){
  sessionStorage.setItem("pageNum", 1);
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about/:cca3" element={<AboutCountry />} />
        <Route path="" element={<Navigate to="/home" />} />
        <Route path="/home/language/:language" element={<Language />} />
      </Routes>
    );
}

export default AppRouter