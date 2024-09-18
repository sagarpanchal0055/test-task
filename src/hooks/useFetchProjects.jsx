import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetchProjects = (page, rowsPerPage, selectedStatus, dates) => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        _page: page + 1,
        _limit: rowsPerPage,
        status_like: Object.keys(selectedStatus)
          .filter((key) => selectedStatus[key])
          .join("|"),
        dueDate_like: dates || null,
      };

      const { data, headers } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}projects`,
        { params }
      );

      setProducts(data);
      setCount(parseInt(headers["x-total-count"], 10));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, selectedStatus, dates]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { products, count, loading, error };
};
