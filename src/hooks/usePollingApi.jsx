import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getPolling as getPollingApi } from "../utils/api";

const usePollingsApi = (apiUrl) => {

  const { token } = useToken();

  const { data, error, isLoading, refetch } = useQuery(
    ["pollingApi", "GET"],
    () => getPolling(token, apiUrl),
    {
        staleTime: 10000, // 5 seconds
        cacheTime: 10000,
        enabled : apiUrl !== ""
    }
  );

  return { data, error, isLoading, refetch };
};

const getPolling = (token, apiUrl) => getPollingApi(token, apiUrl)

export default usePollingsApi;
