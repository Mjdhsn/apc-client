import { useAtom } from "jotai";
import React from "react";
import { useEffect } from "react";
import { authInit } from "../../config/state";
import useWard from "../../hooks/useWard";
import ComboBox from "../ComboBox/ComboBox";

const WardBox = ({ disabled = false, searchFields, setSearchFields, path }) => {

  // hooks
  const [auth, setAuth] = useAtom(authInit)
  const { data, error, isLoading, refetch } = useWard( path, searchFields );

  // convert data to level & value
  const convData = data ? data[2]?.sort((a, b) => a.WARD_ID - b.WARD_ID)?.map((e) => { return {label : e.WARD_NAME, value : e.WARD_ID} }) : []
  const authWard = convData.filter((e) => e.value === auth?.level_childs?.ward)
  
  useEffect(() => {
    refetch();
  }, [searchFields]);

  if (error) {
    return <p>Error in fetching ward data</p>;
  }

  const getWardId = (name) => {
    const selectedWard = data[2].filter((ward) => ward.ward_name === name);
    return selectedWard[0].ward_id;
  };

  return !isLoading ? (
    <ComboBox
      data={auth?.level_childs?.ward.toString().length > 0 ? authWard : convData}
      disabled={disabled || isLoading}
      value={searchFields?.ward}
      setValue={(value) => {
        setSearchFields({
          ...searchFields,
          ward: value,
        })        

        if(searchFields.wardId){
          setSearchFields({
             ...searchFields,
             wardId : getWardId(value)
          })
        }
      }}
      label="Ward"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default WardBox;