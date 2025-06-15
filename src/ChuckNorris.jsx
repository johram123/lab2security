// ChuckNorris.jsx
import React, { useEffect, useState } from "react";

function ChuckNorris({ token }) {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFact = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3333/fact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFact(data.fact);
      } catch (error) {
        setFact("Failed to fetch fact.");
      }
      setLoading(false);
    };
    getFact();
  }, [token]);

  return (
    <div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="fact">{fact}</div>
      )}
    </div>
  );
}

export default ChuckNorris;
