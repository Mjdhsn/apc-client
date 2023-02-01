import React from "react";
import { useAtom } from "jotai";
//
import { authInit } from "../../config/state";
import useStatesName from "../../hooks/useState";
import ComboBox from "../ComboBox/ComboBox";


const StateBox = ({ disabled = false, searchFields, setSearchFields }) => {

  // hooks
  const [auth, setAuth] = useAtom(authInit)
  const { data, error, isLoading } = useStatesName("getState");

  // convert data to level & value
  const convData = data ? data[2]?.sort((a, b) => a.STATE_ID - b.STATE_ID)?.map((e) => { return {label : e.STATE_NAME, value : e.STATE_ID} }) : []
  const authState = convData.filter((e) => e.value === auth?.level_childs?.state)
  
  if (error) {
    return <p>Error in fetching state data</p>;
  }

  return !isLoading ? (
    <ComboBox
      data={auth?.level_childs?.state.toString().length > 0 ? authState : convData}
      disabled={disabled || isLoading}
      value={searchFields?.state}
      // Here I am making country static as Nigeria
      setValue={(value)=>setSearchFields({ ...searchFields  ,state : value  })}
      label="State"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default StateBox;
