import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (countryCodes) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers(); // TODO: Fix two calls in the beginning.
  }, [countryCodes]);

  async function fetchUsers() {
    setIsLoading(true);
    const nationalityQuery = countryCodes.length > 0 ? `&nat=${countryCodes}` : '';
    const response = 
      await axios.get(`https://randomuser.me/api/?results=25&page=1${nationalityQuery}`);
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
