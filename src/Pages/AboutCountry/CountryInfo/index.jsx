import "./CountryInfo.css";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Maps from "../../../componets/Maps";
import { Link } from "react-router-dom";

function CountryInfo({ country }) {
  const currenciesKey =
    country.currencies != null ? Object.keys(country.currencies) : null;
  const langKey =
    country.languages != null ? Object.keys(country.languages) : null;
  const [value, setValue] = useState("1");

  if (country.name.official == "Russian Federation") {
    <button
      onClick={open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
    ></button>;
    return "Poop";
  }
  const handleChange = (e, p) => {
    setValue(p);
  };
  return (
    <div className="container_CountryInfo">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "white", color: "white" }}>
          <TabList
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="gray"
          >
            <Tab label="Main Info" value="1" />
            <Tab label="More Info" value="2" />
            <Tab label="Maps" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
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
                        {country.population === undefined
                          ? "-"
                          : country.population}
                      </p>
                      <p>
                        Region:{" "}
                        {country.region === undefined ? "-" : country.region}
                      </p>
                      <p>
                        Capital:{" "}
                        {country.capital === undefined ? "-" : country.capital}
                      </p>
                    </div>
                    <div className="languages">
                      <p>
                        Continets:{" "}
                        {country.continents === undefined
                          ? "-"
                          : country.continents}
                      </p>
                      <p>
                        Languages:{" "}
                        {langKey.map((item, index) => (
                          <Link
                            className="language"
                            key={item}
                            to={`/home/language/${item}`}
                          >
                            {country.languages[item]}
                            {langKey[index + 1] === undefined ? " " : ", "}
                          </Link>
                        ))}
                      </p>
                      <p>
                        Curiencies:{" "}
                        {currenciesKey === null
                          ? "-"
                          : currenciesKey.map(
                              (item, index) =>
                                `${country.currencies[item].name}${
                                  currenciesKey[index + 1] === undefined
                                    ? ""
                                    : ","
                                } `
                            )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="container-border">
                      <span className="text-border">Borders:</span>
                      <span className="border">
                        {country.borders === undefined
                          ? "-"
                          : country.borders.map((item) => (
                              <Link key={item} to={`/about/${item}`}>
                                <button>{item}</button>
                              </Link>
                            ))}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="container-info">
            <div className="country-info-box">
              <div
                className={
                  country.coatOfArms.svg == null ? "flags" : "coatofarms-box"
                }
              >
                {country.coatOfArms.svg == null ? (
                  <img src={country.flags.png} alt={country.flags.alt}></img>
                ) : (
                  <img
                    src={country.coatOfArms.svg}
                    alt={country.coatOfArms.alt}
                  ></img>
                )}
              </div>
              <div>
                <div className="name-country">{country.name.common}</div>
                <div className="info-block">
                  <div className="info">
                    <div>
                      <p>
                        Area: {country.area === undefined ? "-" : country.area}
                      </p>
                      <p>
                        Fifa: {country.fifa === undefined ? "-" : country.fifa}
                      </p>
                      <p>
                        Car signs:{" "}
                        {country.car.signs === undefined
                          ? "-"
                          : country.car.signs}
                      </p>
                      <p>
                        Car side:{" "}
                        {country.car.side === undefined
                          ? "-"
                          : country.car.side}
                      </p>
                      <p>
                        Start of week:{" "}
                        {country.startOfWeek === undefined
                          ? "-"
                          : country.startOfWeek}
                      </p>
                    </div>
                    <div className="languages">
                      <p>
                        Status:{" "}
                        {country.status === undefined ? "-" : country.status}
                      </p>
                      <p>
                        Independent:{" "}
                        {country.independent === true ? "yes" : "no"}
                      </p>
                      <p>
                        UnMember: {country.unMember === true ? "yes" : "no"}
                      </p>
                      <p>
                        Landlocked: {country.landlocked === true ? "yes" : "no"}
                      </p>
                      <p>
                        Start number:{" "}
                        {country.idd.root === undefined
                          ? "-"
                          : country.idd.root}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="3" sx={{width: "90%", justifyContent: "center", display: "flex"}}>
            <Maps />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default CountryInfo;
