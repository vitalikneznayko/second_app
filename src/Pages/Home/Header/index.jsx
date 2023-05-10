import { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router";

function Header({ allCountry }) {
  const [CountrySearch, setCountrySearch] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      setCountrySearch([]);
      return;
    }

    const resultArr = allCountry.filter((item) =>
      item.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setCountrySearch(resultArr);
  };

  const handleSearchButton = () => {
    if (CountrySearch.length > 0) {
      navigate(`/about/${CountrySearch[0].name.common}`);
    }
  };

  return (
    <div className="header-container">
      <div className="header-text">Country list</div>
      <div className="searcher">
        <input
          onChange={handleSearchChange}
          placeholder="Search..."
          list="country"
          type="text"
        />
        <datalist id="country">
          {CountrySearch.map((item) => (
            <option key={item.name.common} value={item.name.common}></option>
          ))}
        </datalist>
        <button onClick={handleSearchButton}>Search</button>
      </div>
    </div>
  );
}

export default Header;
