import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CountryList.css";
function CountryList({ contriesOnPage }) {
  const [showDiv, setShowDiv] = useState({
    isVisible: false,
    object: null,
  });
  const onMouseEnter = (id) => {
    setShowDiv({
      isVisible: true,
      object: contriesOnPage.find((item) => item.id === id),
    });
  };
  const onMouseLeave = () => {
    setShowDiv({
      isVisible: false,
      object: null,
    });
  };
  return (
    <div className="main-page">
      <div className="country-list">
        {contriesOnPage.map((item) => (
          <Link
            className="country-item"
            onMouseEnter={() => onMouseEnter(item.id)}
            onMouseLeave={() => onMouseLeave()}
            key={item.name.common}
            to={`/about/${item.name.common}`}
          >
            <div className="item-right">
              <img src={item.flags.png} />
              <div className="index">{item.id}</div>
            </div>
            {item.name.common}
          </Link>
        ))}
      </div>
      <div>
        {showDiv.isVisible && (
          <div className="Info-Country">
            <img className="flag" src={showDiv.object.flags.png} />
            <div className="country-info">
              <div>Name: {showDiv.object.name.common}</div>
              <div>Capital: {showDiv.object.capital}</div>
              <div>Population: {showDiv.object.population}</div>
              <div>Region: {showDiv.object.region}</div>
              <div>
                Landlocked: {showDiv.object.landlocked == false ? "No" : "Yes"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryList;
