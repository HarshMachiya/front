import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState(""); // For JSON input from the user
  const [response, setResponse] = useState(null); // For storing API response
  const [error, setError] = useState(null); // To handle errors
  const [filters, setFilters] = useState([]); // To track selected filters

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:3000/bfhl", parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON input or server error.");
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilters(
      filters.includes(value)
        ? filters.filter((item) => item !== value)
        : [...filters, value]
    );
  };

  const renderFilteredResponse = () => {
    if (!response) return null;
    const filteredData = {};
    filters.forEach((filter) => {
      if (response[filter]) {
        filteredData[filter] = response[filter];
      }
    });
    return filteredData;
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>0827IT211040</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={6}
          cols={50}
          placeholder='Enter JSON payload, e.g., {"data": ["1", "a", "b"]}'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          style={{ width: "80%", marginBottom: "10px" }}
        ></textarea>
        <br />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      {response && (
        <div>
          <h3>Filters:</h3>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet"
              onChange={handleFilterChange}
            />
            Highest Lowercase Alphabet
          </label>
          <h3>Response:</h3>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              textAlign: "left",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(renderFilteredResponse(), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
