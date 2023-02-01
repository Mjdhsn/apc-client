import React from "react";
import { useAtom } from "jotai";
import { useEffect } from "react";
//
import useDistrict from "../../hooks/useDistrict";
import { authInit } from "../../config/state";
import ComboBox from "../ComboBox/ComboBox";
import { isFill } from "../../utils/isFill";


const DistrictBox = ({ disabled = false, searchFields, setSearchFields }) => {

  // hooks
  const [auth, setAuth] = useAtom(authInit)
  const { data, error, isLoading, refetch } = useDistrict("getSenateDistricts", { state : searchFields.state });
  
  // convert data to level & value
  const convData = data ? data[2]?.sort((a, b) => a.DISTRICT_ID - b.DISTRICT_ID)?.map((e) => { return {label : e.DISTRICT_NAME, value : Number(e.DISTRICT_ID)} }) : []
  const authLGA = convData.filter((e) => e.value === auth?.level_childs?.district)

  useEffect(() => {
    if(isFill({ state : searchFields.state })){
      refetch();
    }
  }, [searchFields]);

  if (error) {
    return <p>Error in fetching District data</p>;
  }
  
  return !isLoading ? (
    <ComboBox
      data={auth?.level_childs?.district?.toString().length > 0 ? authLGA : convData}
      disabled={disabled}
      value={searchFields?.district}
      setValue={(value) => setSearchFields({ ...searchFields, district: value })}
      label="District"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default DistrictBox;
