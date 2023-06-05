import { useEffect, useState } from "react";
import axios from "axios";
import CountryList from "./CountryList";
import Header from "./Header";
import SortList from "./SortList";
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
  const [sortedCountry, setSortedCountry] = useState([]);
  const [countItems] = useState(10);
  const [countSiblings, setCountSiblings] = useState(getCountSiblings());

  function getCountSiblings() {
    return document.documentElement.clientWidth <= 750 ? 1 : 2;
  }

  const allPage = Math.ceil(sortedCountry.length / countItems);
  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = sortedCountry.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };

  useEffect(() => {
    if (sortedCountry.length === 0) {
      setSortedCountry(allCountry);
    }
  }, [sortedCountry, allCountry]);

  useEffect(() => {
    const handleResize = () => {
      setCountSiblings(getCountSiblings());
    };

    addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const result = await axios.get("http://46.101.96.179/all");

        const resultAddId = result.data.map((item, i) => {
          return { ...item, id: i + 1 };
        });

        setAllCountry(resultAddId);
      } catch {
        setAllCountry("Error");
      }
    };
    fetchCountryData();
  }, []);

  if (allCountry.length === 0) return <div>Loading...</div>;
  return (
    <>
      <Header allCountry={allCountry} headerText="Country list" />
      <div className="center-info">
        <CountryList contriesOnPage={currentCountry} />
        <SortList
          allCountry={allCountry}
          setAllCountry={setAllCountry}
          sortedCountry={sortedCountry}
          setSortedCountry={setSortedCountry}
          setCurrentPage={setCurrentPage}
        ></SortList>
      </div>
      <div className="pagination-box">
        <StyledPagination
          count={allPage}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          size={
            document.documentElement.clientWidth <= 750 ? "medium" : "large"
          }
          onChange={nextListPage}
          siblingCount={countSiblings}
        ></StyledPagination>
      </div>
    </>
  );
}

export default Home;
