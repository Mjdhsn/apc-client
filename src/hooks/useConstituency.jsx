import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getConstituency } from "../utils/api";
import { isFill } from "../utils/isFill";

const useConstituency = ( path, fields ) => {

  const { token } = useToken();

  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["constituency"],
    () => getConstituency(path, token, fields),
    {
      enabled : isFill(fields)
    }
  );

  return { data, error, isLoading, refetch, isRefetching };
};


export default useConstituency;
