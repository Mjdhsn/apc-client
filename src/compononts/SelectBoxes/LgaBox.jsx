import { useAtom } from "jotai";
import React from "react";
import { useEffect } from "react";
import { authInit } from "../../config/state";
import useLga from "../../hooks/useLga";
import ComboBox from "../ComboBox/ComboBox";


const LgaBox = ({ disabled = false, searchFields, setSearchFields, path }) => {

  // hooks
  const [auth, setAuth] = useAtom(authInit)
  const { data, error, isLoading, refetch } = useLga( path, searchFields );

  // convert data to level & value
  const convData = data ? data[2]?.sort((a, b) => a.LGA_ID - b.LGA_ID)?.map((e) => { return {label : e.LGA_NAME, value : e.LGA_ID} }) : []
  const authLGA = convData.filter((e) => e.value === auth?.level_childs?.lga)

  useEffect(() => {
    refetch();
  }, [searchFields]);
  
  if (error) {
    return <p>Error in fetching lga data</p>;
  }  

  return !isLoading ? (
    <ComboBox
      data={auth?.level_childs?.lga.toString().length > 0 ? authLGA : convData}
      disabled={disabled}
      value={searchFields?.lga}
      setValue={(value) => setSearchFields({ ...searchFields, lga: value })}
      label="LGA"
    />
  ) : (
    <p>Loading...</p>
  );
};


export default LgaBox;