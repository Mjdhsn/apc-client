import React from "react";
//
import ComboBox from "../ComboBox/ComboBox";
import { conditionalLevelData } from "../../config/constant";


const LevelBox = ({ disabled = false, setApiLevel, apiLevel, searchLevel }) => {

  if(!conditionalLevelData[searchLevel]) return <></>

  return (
    <ComboBox
      data={conditionalLevelData[searchLevel] || []}
      disabled={disabled}
      setValue={(value)=> setApiLevel(value)}
      label="Level"
    />
  )
};

export default LevelBox;
