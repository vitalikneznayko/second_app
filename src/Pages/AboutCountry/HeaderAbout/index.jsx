import "./HeaderAbout.css";
import { Link } from "react-router-dom";


function HeaderAbout({country}) {
  return (
    <div className="header">
      <Link to="/">
        <button className="header-text">Back</button>
      </Link>
    </div>
  );
}

export default HeaderAbout;
