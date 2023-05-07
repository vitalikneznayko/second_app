import "./Header_About.css";
import { Link } from "react-router-dom";

function Header_About({country}) {
  return (
    <div className ="header">
      <Link className="header-text" to="/">
        Back
      </Link>
      <Link className="header-text" onClick={() => {open( country.maps.googleMaps)}}>
        Go to map
      </Link>
    </div>
  );
}

export default Header_About;
