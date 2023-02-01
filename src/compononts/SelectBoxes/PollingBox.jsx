import { useAtom } from "jotai";
import React from "react";
import { useEffect } from "react";
import { authInit } from "../../config/state";
import usePollingDropDown from "../../hooks/usePollingDropDown";
import ComboBox from "../ComboBox/ComboBox";

const PollingBox = ({ disabled = false, searchFields, setSearchFields, path }) => {

  // hooks
  const [auth, setAuth] = useAtom(authInit)  
  const { data, error, isLoading, refetch } = usePollingDropDown( path, searchFields );

  // convert data to level & value
  const convData = data ? data[3]?.sort((a, b) => a.PU_ID - b.PU_ID)?.map((e) => { return {label : e.PU_NAME, value : e.PU_ID} }) : []
  const authPU = convData.filter((e) => e.value === auth?.level_childs?.pollingUnit)

  useEffect(() => {
    refetch();
  }, [searchFields]);

  if (error) {
    return <p>Error in fetching ward data</p>;
  }

  return !isLoading ? (
    <ComboBox
      data={auth?.level_childs?.pollingUnit.toString().length > 0 ? authPU : convData}
      disabled={disabled || isLoading}
      value={searchFields?.pollingUnit}
      setValue={(value) =>
        setSearchFields({ ...searchFields, pollingUnit: value })
      }
      label="Polling Unit"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default PollingBox;
