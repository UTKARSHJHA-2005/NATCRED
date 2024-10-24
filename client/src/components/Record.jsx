import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Record() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = 'a3eec8d6d36d489:28fowzsr5d9rvh8'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.tradingeconomics.com/country/mexico?c=${apiKey}`);
        setData(response.data); 
      } catch (err) {
        console.error(err); 
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Trading Economics Data for Mexico</h1>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <p><strong>Country:</strong> {item.country}</p>
            <p><strong>Indicator:</strong> {item.indicator}</p>
            <p><strong>Value:</strong> {item.value}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
