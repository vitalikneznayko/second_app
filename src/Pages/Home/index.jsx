import { useEffect, useState } from "react";
import axios, { all } from "axios";
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
  const [currentContinent, setCurrentContinent] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [regions, setRegion] = useState([]);
  useEffect(() => {
    const tmp = allCountry.reduce((acc, country) => {
      const { continents, subregion } = country;
      if (acc[continents]) {
        acc[continents].add(subregion);
      } else {
        acc[continents] = new Set([subregion]);
      }
      return acc;
    }, {});
    setRegion(tmp);
  }, [allCountry]);
  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };

  const filterById = () => {
    setFlagSortId(!flagSortId);
    let sortedById;
    if (!flagSortId) {
      sortedById = (
        sortedCountry.length === 0 ? allCountry : sortedCountry
      ).sort((a, b) => b.id - a.id);
      setSortedCountry(sortedById);
    } else
      sortedById = (
        sortedCountry.length === 0 ? allCountry : sortedCountry
      ).sort((a, b) => a.id - b.id);
    setSortedCountry(sortedById);
  };
  const filterAlphabetically = () => {
    setFlagSortAB(!flagSortAB);
    let sortedAlphabetically;
    if (flagSortAB) {
      sortedAlphabetically = (
        sortedCountry.length === 0 ? allCountry : sortedCountry
      ).sort(function (a, b) {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedAlphabetically = (
        sortedCountry.length === 0 ? allCountry : sortedCountry
      ).sort(function (a, b) {
        if (a.name.common < b.name.common) {
          return 1;
        }
        if (a.name.common > b.name.common) {
          return -1;
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
    setCurrentRegion(null);
    const tmp = allCountry.filter(
      (obj) => String(obj.continents) === String(item)
    );
    setSortedCountry(tmp);
    setCurrentPage(1);
  };
  const ResetAll = () => {
    setCurrentContinent(null);
    setCurrentRegion(null);
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
    setCurrentRegion(item);
    const tmp = allCountry.filter(
      (obj) =>
        String(obj.continents) === String(currentContinent) &&
        String(obj.subregion) === String(item)
    );
    setSortedCountry(tmp);
    setCurrentPage(1);
  };
  if (allCountry.length === 0) return <div>Loading...</div>;
  return (
    <>
      <Header allCountry={allCountry} />
      <div className="navbar">
        <div className="container nav-container">
          <input className="checkbox" type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <div className="menu-items">
            <button variant="contained" onClick={() => filterById()}>
              Filter id{flagSortId ? "↓" : "↑"}
            </button>
            <button variant="contained" onClick={() => filterAlphabetically()}>
              Filter {!flagSortAB ? "A-Y" : "Y-A"}
            </button>
            <button variant="contained" onClick={() => ResetAll()}>
              Reset
            </button>
            {Object.keys(regions).map((item) => (
              <button key={item} onClick={() => SortByContinent(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="center-info">
        <CountryList contriesOnPage={currentCountry} />
        <div className="container-filter">
          <div className="filter">
            <button variant="contained" onClick={() => filterById()}>
              Filter id{flagSortId ? "↓" : "↑"}
            </button>
            <button variant="contained" onClick={() => filterAlphabetically()}>
              Filter {!flagSortAB ? "A-Y" : "Y-A"}
            </button>
            <button variant="contained" onClick={() => ResetAll()}>
              Reset
            </button>
          </div>
          <div className="continents">
            {Object.keys(regions).map((item) => (
              <button key={item} onClick={() => SortByContinent(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="container-subreg">
            {currentContinent && (
              <div className="subreg">
                {Array.from(regions[currentContinent]).map((subregion) => {
                  if (currentContinent != "Antarctica") {
                    return (
                      <button
                        onClick={() => SortByRegion(subregion)}
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
          </div>
        </div>
      </div>
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
    </>
  );
}

export default Home;
