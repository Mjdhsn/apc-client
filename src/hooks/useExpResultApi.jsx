import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getExpResult as getExpResultApi } from "../utils/api";

const useExpResultApi = (apiUrl, apiFirst) => {

  const { token } = useToken();

  const { data, error, isLoading, refetch, isFetching } = useQuery(
    ["pollingApi", "GET"],
    () => getExpResult(token, apiUrl, apiFirst),
    {
        staleTime: 10000, // 5 seconds
        cacheTime: 10000,
        enabled : apiUrl !== ""
    }
  );

  return { data, error, isLoading, refetch, isFetching };
};

const getExpResult = (token, apiUrl, apiFirst) => getExpResultApi(token, apiUrl, apiFirst)

export default useExpResultApi;
