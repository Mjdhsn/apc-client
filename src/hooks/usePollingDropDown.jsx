import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getPollingDropDown as getPollingApi} from "../utils/api";
import { isFill } from "../utils/isFill";


const usePollingDropDown = (path, fields) => {

  const { token } = useToken();

  const { data, error, isLoading, refetch, isFetching } = useQuery(
    ["pollingDropDown"],
    () => getPollingApi(token, path, fields),
    {
      enabled : isFill(fields)
    }
  );

  return { data, error, isLoading, refetch, isFetching };
};

export default usePollingDropDown;
