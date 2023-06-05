import { useEffect, useState } from "react";
import "../Home.css";

function SortList({
  allCountry,
  setAllCountry,
  sortedCountry,
  setSortedCountry,
  setCurrentPage,
}) {
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
  }, []);

  const filterById = () => {
    setFlagSortId(!flagSortId);
    if (!flagSortId) {
      const sortedById = sortedCountry.sort((a, b) => b.id - a.id);
      setSortedCountry([...sortedById]);
      const sortedByIdCountry = allCountry.sort((a, b) => b.id - a.id);
      setAllCountry([...sortedByIdCountry]);
      
    } else {
      const sortedById = sortedCountry.sort((a, b) => a.id - b.id);
      setSortedCountry([...sortedById]);
      const sortedByIdCountry = allCountry.sort((a, b) => a.id - b.id);
      setAllCountry([...sortedByIdCountry]);
      
    }
  };
  const filterAlphabetically = () => {
    setFlagSortAB(!flagSortAB);
    if (flagSortAB) {
      const tmpCountry = allCountry.sort((a, b) => {
        if (a.name.common > b.name.common) return -1;
        if (a.name.common < b.name.common) return 1;
        return 0;
      });
      setAllCountry([...tmpCountry]);

      const tmp = sortedCountry.sort(function (a, b) {
        if (a.name.common > b.name.common) return -1;
        if (a.name.common < b.name.common) return 1;
        return 0;
      });
      setSortedCountry([...tmp]);
    } else {
      const tmpCountry = allCountry.sort((a, b) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
      setAllCountry([...tmpCountry]);

      const tmp = sortedCountry.sort(function (a, b) {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
      setSortedCountry([...tmp]);
    }
  };

  const SortByContinent = (item) => {
    if (currentContinent != item) {
      setCurrentContinent(item);
      setCurrentRegion(null);
      const tmp = allCountry.filter(
        (obj) => String(obj.continents) === String(item)
      );
      setSortedCountry(tmp);
      setCurrentPage(1);
    } else {
      setCurrentContinent(null);
      setSortedCountry(allCountry);
    }
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
    <div className="container-filter">
      <div className="filter">
        <button key="id" variant="contained" onClick={() => filterById()}>
          Filter id{flagSortId ? "↓" : "↑"}
        </button>
        <button
          key="AB"
          variant="contained"
          onClick={() => filterAlphabetically()}
        >
          Filter {!flagSortAB ? "A-Y" : "Y-A"}
        </button>
        <button key="Reset" variant="contained" onClick={() => ResetAll()}>
          Reset
        </button>
      </div>
      <div key="continents" className="continents">
        {Object.keys(regions).map((item) => (
          <div key={item} className="continents">
            <button onClick={() => SortByContinent(item)}>{item}</button>
            {currentContinent === item && (
              <div key="blockreg" className="subreg">
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
        ))}
      </div>
    </div>
  );
}

export default SortList;
