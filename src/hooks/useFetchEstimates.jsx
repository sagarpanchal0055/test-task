import { useState, useEffect } from "react";
import axios from "axios";

const useFetchEstimates = (page, rowsPerPage) => {
  const [estimates, setEstimates] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstimates = async () => {
      setLoading(true);
      try {
        const responseOfCount = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}estimates`
        );
        setCount(responseOfCount.data.length);

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}estimates`,
          {
            params: {
              _page: page + 1,
              _limit: rowsPerPage,
            },
          }
        );
        setEstimates(response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching estimates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimates();
  }, [page, rowsPerPage]);

  return { estimates, count, loading, error };
};

export default useFetchEstimates;
