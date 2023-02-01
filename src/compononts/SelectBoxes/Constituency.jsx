import React from "react";
import { useAtom } from "jotai";
import { useEffect } from "react";
//
import useConstituency from "../../hooks/useConstituency";
import { authInit } from "../../config/state";
import ComboBox from "../ComboBox/ComboBox";
import { isFill } from "../../utils/isFill";


const Constituency = ({ disabled = false, searchFields, setSearchFields }) => {

  // hooks
  const [auth, setAuth] = useAtom(authInit)
  const { data, error, isLoading, refetch } = useConstituency( "getRepConstituency", { state : searchFields.state });

  // convert data to level & value
  const convData = data ? data[2]?.sort((a, b) => a.CONST_ID - b.CONST_ID)?.map((e) => { return {label : e.CONSTITUENCY_NAME, value : Number(e.CONST_ID)} }) : []
  const authLGA = convData.filter((e) => e.value === auth?.level_childs?.constituency)

  useEffect(() => {
    if(isFill({ state : searchFields.state })){
      refetch();
    }
  }, [searchFields]);

  if (error) {
    return <p>Error in fetching Constituency data</p>;
  }
  
  return !isLoading ? (
    <ComboBox
      data={auth?.level_childs?.constituency?.toString().length > 0 ? authLGA : convData}
      disabled={disabled}
      value={searchFields?.constituency}
      setValue={(value) => setSearchFields({ ...searchFields, constituency: value })}
      label="Constituency"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default Constituency;