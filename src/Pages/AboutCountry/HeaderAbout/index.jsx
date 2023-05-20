import "./HeaderAbout.css";
import { Link } from "react-router-dom";


function HeaderAbout({country}) {
  return (
    <div className="header">
      <Link to="/">
        <button className="header-text">Back</button>
      </Link>
      <button
        className="header-text"
        disabled={country.name.official == "Russian Federation" ? true : false}
        onClick={() => {
          open(country.maps.googleMaps);
        }}
      >
        Go to map
      </button>
    </div>
  );
}

export default HeaderAbout;
