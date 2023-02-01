import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getCoalition as getCoalitionApi } from "../utils/api";

const useCoalitionApi = (apiUrl) => {

  const { token } = useToken();

  const { data, error, isLoading, refetch } = useQuery(
    ["coalitionApi", "GET"],
    () => getCoalition(token, apiUrl),
    {
        staleTime: 10000, // 5 seconds
        cacheTime: 10000,
        enabled : apiUrl !== ""
    }
  );

  return { data, error, isLoading, refetch };
};

const getCoalition = (token, apiUrl) => getCoalitionApi(token, apiUrl)

export default useCoalitionApi;
