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
      : Math.round(sortedCountry.length / countItems);
  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = (
    sortedCountry.length === 0 ? allCountry : sortedCountry
  ).slice(firstCountryIndex, lastCountryIndex);
  const [flagSortAB, setFlagSortAB] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);

  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };

  const filterById = () => {
    setFlagSortAB(!flagSortAB);
    if (flagSortAB) {
      sortedById = allCountry.sort((a, b) => b.id - a.id);
      setSortedCountry(sortedById);
    } else sortedById = allCountry.sort((a, b) => a.id - b.id);
    setSortedCountry(sortedById);
  };
  const filterAlphabetically = () => {
    setFlagSortAB(!flagSortAB);
    if (flagSortAB) {
      sortedAlphabetically = allCountry.sort(function (a, b) {
        if (a.name.common < b.name.common) {
          return 1;
        }
        if (a.name.common > b.name.common) {
          return -1;
        }
        return 0;
      });
    } else {
      sortedAlphabetically = allCountry.sort(function (a, b) {
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
  const handleSearch = () => {
    const filteredByRegion = allCountry.filter((country) =>
      country.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortedCountry(filteredByRegion);
  };

  if (allCountry.length === 0) return <div>Loading...</div>;
  return (
    <>
      <Header allCountry={sortedCountry} />
      <CountryList contriesOnPage={currentCountry} />
      <button variant="contained" onClick={() => filterById()}>
        Filter id
      </button>
      <button variant="contained" onClick={() => filterAlphabetically()}>
        Filter A-UA
      </button>
      <input
        type="text"
        placeholder="Search by region"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
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
