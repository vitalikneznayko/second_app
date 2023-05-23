import "./HeaderAbout.css";
import { Link, useNavigate } from "react-router-dom";

function HeaderAbout() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <button onClick = {() => navigate(-1)}className="header-text">Back</button>
      <Link key = "HeaderAbout" to="/">
        <button className="header-text">Back to list</button>
      </Link>
    </div>
  );
}

export default HeaderAbout;
