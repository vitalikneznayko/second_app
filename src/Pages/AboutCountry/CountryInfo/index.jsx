import "./CountryInfo.css";
import React from "react";

function CountryInfo({ country }) {
  const currenciesKey = Object.keys(country.currencies);
  const langKey = Object.keys(country.languages);
  return (
    <div className="container_info">
      <div className="country_information_box">
        <div className="flags">
          <img src={country.flags.png}></img>
        </div>
        <div className="country_information">
          <div className="name_country">{country.name.official}</div>
          <div className="info_block">
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
              </div>
              <div className="languages">
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
                <p>
                  Languages:{" "}
                  {langKey.map(
                    (item, index) =>
                      `${country.languages[item]}${
                        langKey[index + 1] === undefined ? "" : ","
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
                  : country.borders.map((item) => <span>{item }</span>)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;
