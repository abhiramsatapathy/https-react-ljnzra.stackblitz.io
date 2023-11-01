import React, { useState, useEffect, useRef } from 'react';
import './center.css';

export default function Center() {
  const [country, setCountry] = useState([]);
  const dataFetchRef = useRef(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currCountLoading, setCurrCountLoading] = useState(false);

  async function selectCountry(e) {
    setCurrCountLoading(true);
    try {
      const countryCca2 = e.target.value;
      const endpoint = `https://restcountries.com/v3.1/alpha/${countryCca2}`;
      const response = await fetch(endpoint).then((res) => res.json());
      setSelectedCountry(response[0] ?? null);
    } catch (err) {
      console.error(err);
    } finally {
      setCurrCountLoading(false);
    }
  }

  useEffect(() => {
    if (dataFetchRef.current) return;
    dataFetchRef.current = true;
    const getcountry = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const getcon = await res.json();
      setCountry(getcon);
    };
    getcountry();
  }, []);

  return (
    <div className="container-fluid">
      <div>
        
        <div className="search-area">
          <select  className="select-dropdown" onChange={selectCountry}>
            <option>SELECT A COUNTRY</option>
            {country.map((country, index) => (
              <option key={index} value={country.cca2}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
        <div className="country">
          {currCountLoading ? (
            <p className="country-loader">Loading...</p>
          ) : (
            selectedCountry && (
              <table className="country-table">
                <tr>
                  <th>COUNTRY NAME</th>
                  <th>CAPITAL NAME</th>
                  <th>POPULATION</th>
                  <th>FLAG    </th>
                </tr>
                <tr>
                  <td>{selectedCountry.name.common}</td>
                  <td>{selectedCountry.capital}</td>
                  <td>{selectedCountry.population}</td>
                  <td>{selectedCountry.flag}</td>
                </tr>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  );
}
