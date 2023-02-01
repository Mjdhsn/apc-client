import { useState } from "react";
import usePollingsApi from "./usePollingApi";

const useGeneralPollings = (props) => {
  const [coalData, setCoalData] = useState([])
  const { level, data: levelData, apiUrl } = props;
  const coalitionData = usePollingsApi(apiUrl);

  return coalitionData;
};

export default useGeneralPollings;
