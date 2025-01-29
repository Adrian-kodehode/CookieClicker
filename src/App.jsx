import { useState, useEffect } from "react";
import "./App.css";
import UsersComponent from "./UsersComponent.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const requests = Array.from({ length: 5 }, () =>
          fetch("https://catfact.ninja/fact")
        );
        const responses = await Promise.all(requests);
        const results = await Promise.all(
          responses.map((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error. Status ${response.status}`);
            }
            return response.json();
          })
        );
        console.log("API Responses", results);
        setData(results);
      } catch (error) {
        console.log("Error fetching data", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + Infinity)}>
          {count} Cookies
        </button>
      </div>
      <div className="cookie">
        <button onClick={() => setCount((count) => count + 1)}>
          <img
            src="/cookie.png"
            alt="Image of a Cookie"
            width={200}
            height={200}
            onError={() => console.log("Failed to load cookie image")}
          />
        </button>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {data?.length > 0 ? (
          <div>
            <h2>Cat Facts</h2>
            <ul>
              {data.map((fact, index) => (
                <li key={index}>{fact.fact}</li>
              ))}
            </ul>
          </div>
        ) : (
          !loading && <p>No facts available</p>
        )}
      </div>

      <UsersComponent />
    </>
  );
}

export default App;
