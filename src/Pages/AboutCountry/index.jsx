import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import CountryInfo from "./CountryInfo";
import HeaderAbout from "./HeaderAbout";

function AboutCountry() {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://46.101.96.179/all");
        const tmp = result.data.find((item) => item.cca3 === cca3);
        setCountry(tmp);
      } catch (error) {
        console.error(error);
        setCountry("Error");
      }
    };

    fetchData();
  }, [cca3]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderAbout />
      <CountryInfo country={country} />
    </>
  );
}

export default AboutCountry;
