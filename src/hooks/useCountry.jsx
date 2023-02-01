import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getCountry } from "../utils/api";

const queryOptions = {
  staleTime: 5 * 1000 , //5 sec
  cacheTime: 5 * 1000 ,
};

const useCountry = (path) => {

  const { token } = useToken();

  const { data, error, isLoading, refetch, isFetching } = useQuery(
    ["country"],
    () => getCountry(token, path),
    {
      ...queryOptions,
    }
  );

  return { data, error, isLoading, refetch, isFetching };
};

export default useCountry;
