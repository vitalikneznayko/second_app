import { useEffect, useState } from "react";
import Header from "./Header_About";
import axios from "axios";
import { useParams } from "react-router";
import CountryInfo from "./CountryInfo";

function AboutCountry() {
  const { countryInfo } = useParams();
  const [country, setCountry] = useState(null);
  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await axios(
          `https://restcountries.com/v3.1/name/${countryInfo}`
        );
        setCountry(response.data[0]);
      } catch {
        setCountry("Error");
      }
    }
    fetchCountry();
  }, [countryInfo]);

  if (!country) {return <div>Loading...</div>;}
  return (
    <>
      <Header country={country} />
      <CountryInfo country={country} />
    </>
  );
}

export default AboutCountry;
