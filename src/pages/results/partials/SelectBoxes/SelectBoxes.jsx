import React from "react";
import LgaBox from "../../../../compononts/SelectBoxes/LgaBox";
import PollingBox from "../../../../compononts/SelectBoxes/PollingBox";
import StateBox from "../../../../compononts/SelectBoxes/StateBox";
import WardBox from "../../../../compononts/SelectBoxes/WardBox";
import css from "./SelectBoxes.module.scss";
import { Button } from "@mantine/core";
import { Search } from "@mui/icons-material";

const SelectBoxes = ({ searchFields, setSearchFields, searchLevel, parties, getResults }) => {

  const checkSearchFields = ()=> {
    if (searchLevel === 1 && searchFields?.country) return true
    if (searchLevel === 2 && searchFields?.country && searchFields?.state) return true
    if (searchLevel === 3 && searchFields?.country && searchFields?.state && searchFields?.lga) return true
    if (searchLevel === 4 && searchFields?.country && searchFields?.state && searchFields?.lga && searchFields?.ward) return true
    if (searchLevel === 5 && searchFields?.country && searchFields?.state && searchFields?.lga && searchFields?.ward && searchFields?.pollingUnit) return true
    return false
  }

  const checkParties= () => parties.some((party)=>party.checked === true)


  const checkDisableStatus = () => checkSearchFields() && checkParties()

  const submit = () => {
    getResults()
  }
  
  return (
    <div className={css.container}>
      {searchLevel >= 2 && searchFields?.country && (
      <StateBox searchFields={searchFields} setSearchFields={setSearchFields} />
      )}

      {searchLevel >= 3 && searchFields?.state && (
        <LgaBox searchFields={searchFields} setSearchFields={setSearchFields}  path="getLGA"  />
      )}

      {searchLevel >= 4 && searchFields?.lga && (
        <WardBox
          searchFields={searchFields}
          setSearchFields={setSearchFields}
          path="getWard"
        />
      )}

      {searchLevel >= 5 && searchFields?.ward && (
        <PollingBox
          searchFields={searchFields}
          setSearchFields={setSearchFields}
          path="getPol"
        />
      )}

      <Button color="dark" leftIcon={<Search />} disabled={!checkDisableStatus()} onClick={submit}>
        Search
      </Button>
    </div>
  );
};

export default SelectBoxes;
