import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import "./Language.css";
import axios, { all } from "axios";
import CountriesList from "../Home/CountryList";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import SortList from "../Home/SortList";
import Header from "../Home/Header";
import Pagination from "@mui/material/Pagination";

import { styled } from "@mui/material/styles";

const StyledPagination = styled(Pagination)(() => ({
  "& .MuiPaginationItem-root": {
    color: "aliceblue",
    background: "rgb(40, 54, 73)",
    "&.Mui-selected": {
      background: "rgb(0, 136, 255)",
      color: "aliceblue",
      "&:hover": {
        background: "rgb(0, 136, 255)",
      },
    },
    "&:hover": {
      background: "rgb(0, 136, 255)",
    },
  },
}));

function CountriesWithOneLanguage() {
  const { language } = useParams();
  const [allCountry, setAllCountry] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [sortedCountry, setSortedCountry] = useState([]);
  const navigate = useNavigate();
  const [countItems] = useState(10);
  const allPage =
    sortedCountry.length === 0
      ? Math.ceil(allCountry.length / countItems)
      : Math.ceil(sortedCountry.length / countItems);
  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = (
    sortedCountry.length === 0 ? allCountry : sortedCountry
  ).slice(firstCountryIndex, lastCountryIndex);
  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };
  useEffect(() => async () => {
    try {
      const result = await axios("http://46.101.96.179/all");
      const resultId = result.data.map((item, i) => {
        return { ...item, id: i + 1 };
      });
      const filteredCountry = resultId.filter(
        (country) => country.languages && country.languages[language]
      );
      setAllCountry(filteredCountry);
    } catch {
      setAllCountry([]);
    }
    [language];
  });
  return (
    <>
      <Header
        allCountry={allCountry}
        // headerText={`COUNTRIES THAT SPEAKS ${langName.toUpperCase()}`}
      />
      <button className="button" onClick={() => navigate(-1)}>{`Back`}</button>
      <Link className="button" to="/">
        <button>Back to list</button>
      </Link>
      <div className="center-info">
        <CountriesList contriesOnPage={currentCountry} />
        <SortList
          allCountry={allCountry}
          sortedCountry={sortedCountry}
          setSortedCountry={setSortedCountry}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></SortList>
        <div className="pagination-box">
          <StyledPagination
            count={allPage}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            size="large"
            onChange={nextListPage}
            siblingCount={2}
          ></StyledPagination>
        </div>
      </div>
    </>
  );
}

export default CountriesWithOneLanguage;
