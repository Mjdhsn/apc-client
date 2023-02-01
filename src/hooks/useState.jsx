import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getStates as getStatesApi} from "../utils/api";

const queryOptions = {
  staleTime: 2 * 1000, //2 sec
  cacheTime: 5 * 60 * 1000, // 5 mins
};

const useStatesName = (path) => {
  const { token } = useToken();

  const { data, error, isLoading, refetch, isFetching } = useQuery(
    ["states"],
    () => getStates(token, path),
    {
      ...queryOptions,
    }
  );

  return { data, error, isLoading, refetch, isFetching };
};

const getStates = (token, path) => getStatesApi(token, path)

export default useStatesName;
