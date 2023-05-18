import "./CountryInfo.css";
import React from "react";

function CountryInfo({ country }) {
  const currenciesKey = Object.keys(country.currencies);
  const langKey = Object.keys(country.languages);
  if(country.name.official == "Russian Federation"){
    <button
      onClick={ open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>
      </button>
    return "Poop"
  }
  return (
    <div className="container-info">
      <div className="country-info-box">
        <div className="flags">
          <img src={country.flags.png} alt={country.flags.alt}></img>
        </div>
        <div>
          <div className="name-country">{country.name.official}</div>
          <div className="info-block">
            <div className="info">
              <div>
                <p>
                  Population:{" "}
                  {country.population === undefined ? "-" : country.population}
                </p>
                <p>
                  Region: {country.region === undefined ? "-" : country.region}
                </p>
                <p>
                  Capital:{" "}
                  {country.capital === undefined ? "-" : country.capital}
                </p>
                <p>
                  Continets:{" "}
                  {country.continents === undefined ? "-" : country.continents}
                </p>
              </div>
              <div className="languages">
                <p>
                  Languages:{" "}
                  {langKey.map(
                    (item, index) =>
                      `${country.languages[item]}${
                        langKey[index + 1] === undefined ? "" : ","
                      } `
                  )}
                </p>

                <p className="coatofarms-box">
                  Coat Of Arms:
                  {country.coatOfArms.svg === undefined ? (
                    "-"
                  ) : (
                    <img src={country.coatOfArms.svg}></img>
                  )}
                </p>
                <p>
                  Curiencies:{" "}
                  {currenciesKey === null
                    ? "-"
                    : currenciesKey.map(
                        (item, index) =>
                          `${country.currencies[item].name}${
                            currenciesKey[index + 1] === undefined ? "" : ","
                          } `
                      )}
                </p>
              </div>
            </div>
            <div>
              <p className="border">
                Borders:{" "}
                {country.borders === undefined
                  ? "-"
                  : country.borders.map((item) => `${item} `)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;
