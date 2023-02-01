import { useQuery } from "react-query";
import useToken from "../compononts/useToken";
import { getLga as getLgaApi} from "../utils/api";
import { isFill } from "../utils/isFill";


const useLga = (path, fileds) => {
  const { token } = useToken();

  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["lga"],
    () => getLgaApi(token, path, fileds),
    {
      enabled : isFill(fileds)
    }
  );

  return { data, error, isLoading, refetch, isRefetching };
};

export default useLga;