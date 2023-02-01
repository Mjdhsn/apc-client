import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getDistrict } from "../utils/api";
import { isFill } from "../utils/isFill";


const useDistrict = ( path, fields ) => {
  
  const { token } = useToken();

  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["district"],
    () => getDistrict(path, token, fields),
    {
      enabled : isFill(fields),
    }
  );

  return { data, error, isLoading, refetch, isRefetching };
};


export default useDistrict;
