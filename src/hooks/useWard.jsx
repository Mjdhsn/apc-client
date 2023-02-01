import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getWard as getWardApi} from "../utils/api";
import { isFill } from "../utils/isFill";

const useWard = ( path, fields ) => {

  const { token } = useToken();

  const { data, error, isLoading, refetch, isFetching } = useQuery(
    ["wardBadge"],
    () => getWard(token, path, fields),
    {
      enabled : isFill(fields)
    }
  );

  return { data, error, isLoading, refetch, isFetching };
};

const getWard = (token, path, fields) => getWardApi(token, path, fields)

export default useWard;
