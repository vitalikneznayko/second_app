import { useEffect, useState } from "react";
import axios from "axios";
import CountryList from "./CountryList";
import Header from "./Header";
import Pagination from "@mui/material/Pagination";
import "./Home.css";
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

function Home() {
  const [allCountry, setAllCountry] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [countItems] = useState(10);
  const [sortedCountry, setSortedCountry] = useState([]);
  const allPage =
    sortedCountry.length === 0
      ? allCountry.length / countItems
      : Math.ceil(sortedCountry.length / countItems);
  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = (
    sortedCountry.length === 0 ? allCountry : sortedCountry
  ).slice(firstCountryIndex, lastCountryIndex);
  const [flagSortAB, setFlagSortAB] = useState(false);
  const [flagSortId, setFlagSortId] = useState(false);
  const [chekContinent, setChekContinent] = useState(true);
  const [chekRegion, setChekRegion] = useState(true);
  const [currentContinent, setCurrentContinent] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);

  const regions = allCountry.reduce((acc, country) => {
    const { continents, subregion } = country;
    if (acc[continents]) {
      acc[continents].add(subregion);
    } else {
      acc[continents] = new Set([subregion]);
    }
    return acc;
  }, {});

  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };

  const filterById = () => {
    setFlagSortId(!flagSortId);
    let sortedById;
    if (!flagSortId) {
      sortedById = (sortedCountry.length === 0 ? allCountry : sortedCountry)
        .slice()
        .sort((a, b) => b.id - a.id);
      setSortedCountry(sortedById);
    } else
      sortedById = (sortedCountry.length === 0 ? allCountry : sortedCountry)
        .slice()
        .sort((a, b) => a.id - b.id);
    setSortedCountry(sortedById);
  };
  const filterAlphabetically = () => {
    setFlagSortAB(!flagSortAB);
    let sortedAlphabetically;
    if (flagSortAB) {
      sortedAlphabetically = (
        sortedCountry.length === 0 ? allCountry : sortedCountry
      )
        .slice()
        .sort(function (a, b) {
          if (a.name.common < b.name.common) {
            return 1;
          }
          if (a.name.common > b.name.common) {
            return -1;
          }
          return 0;
        });
    } else {
      sortedAlphabetically = (
        sortedCountry.length === 0 ? allCountry : sortedCountry
      )
        .slice()
        .sort(function (a, b) {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        });
    }
    setSortedCountry(sortedAlphabetically);
  };

  useEffect(
    () => async () => {
      try {
        const result = await axios("https://restcountries.com/v3.1/all");
        const resultAddId = result.data.map((item, ind) => {
          return { ...item, id: ind + 1 };
        });
        setAllCountry(resultAddId);
      } catch {
        setAllCountry("Error");
      }
    },
    []
  );
  const SortByContinent = (item) => {
      setCurrentContinent(item);
      chekContinent == true;
      const tmp = allCountry.filter(
        (obj) => String(obj.continents) === String(item)
      );
      setSortedCountry(tmp);
      setCurrentPage(1);
  };
  const ResetAll = () => {
    setChekContinent(true);
    setChekRegion(true);
    setCurrentContinent(null);
    setCurrentRegion(null);
    setActiveRegion(null);
    setFlagSortAB(null);
    setFlagSortId(null);
    allCountry.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    setSortedCountry(allCountry);
  };
  const SortByRegion = (item) => {
    if (currentRegion != item) {
      setCurrentRegion(item);
      setActiveRegion(item);
      chekRegion == true;
      const tmp = allCountry.filter(
        (obj) =>
          String(obj.continents) === String(currentContinent) &&
          String(obj.subregion) === String(item)
      );
      setSortedCountry(tmp);
      setCurrentPage(1);
    }
    if (currentRegion == item) {
      const tmp = allCountry.filter(
        (obj) => String(obj.continents) === String(currentContinent)
      );
      setCurrentRegion(null);
      setActiveRegion(null);
      setChekRegion(!chekRegion);
      setSortedCountry(tmp);
    }
  };
  if (allCountry.length === 0) return <div>Loading...</div>;
  return (
    <>
      <Header allCountry={allCountry} />
      <CountryList contriesOnPage={currentCountry} />
      <div className="bottom-block">
        <div>
          <button variant="contained" onClick={() => filterById()}>
            Filter id
          </button>
          <button variant="contained" onClick={() => filterAlphabetically()}>
            Filter A-UA
          </button>
          <button variant="contained" onClick={() => ResetAll()}>
            Reset
          </button>
          <div className="continents">
            {Object.keys(regions).map((item) => (
              <button onClick={() => SortByContinent(item)}>{item}</button>
            ))}
          </div>
        </div>
        <div className="pagination-box">
          {currentContinent && (
          <div className="sortPanel">
            {Array.from(regions[currentContinent]).map((subregion) => {
              if (currentContinent != "Antarctica") {
                return (
                  <button
                    onClick={() => SortByRegion(subregion)}
                    className={`defButton buttonRegion ${
                      activeRegion === subregion ? "activeBut" : ""
                    }`}
                    key={subregion}
                  >
                    {subregion}
                  </button>
                );
              }
              return null;
            })}
          </div>
          )}
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

export default Home;
