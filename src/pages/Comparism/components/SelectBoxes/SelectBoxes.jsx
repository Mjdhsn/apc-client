import React from "react";
import LgaBox from "../../../../compononts/SelectBoxes/LgaBox";
import PollingBox from "../../../../compononts/SelectBoxes/PollingBox";
import StateBox from "../../../../compononts/SelectBoxes/StateBox";
import WardBox from "../../../../compononts/SelectBoxes/WardBox";
import css from "./SelectBoxes.module.scss";
import { Button } from "@mantine/core";
import { Search } from "@mui/icons-material";
import DistrictBox from "../../../../compononts/SelectBoxes/DistrictBox";
import Constituency from "../../../../compononts/SelectBoxes/Constituency";


// --------- PRESIDENTIAL -----------
export const PresidentialSelectBoxes = ({ searchFields, setSearchFields, searchLevel, isParite, parties, getResults }) => {

  const checkSearchFields = ()=> {
    if (searchLevel === 1 && searchFields?.country) return true
    if (searchLevel === 2 && searchFields?.country && searchFields?.state) return true
    if (searchLevel === 3 && searchFields?.country && searchFields?.state && searchFields?.lga) return true
    if (searchLevel === 4 && searchFields?.country && searchFields?.state && searchFields?.lga && searchFields?.ward) return true
    if (searchLevel === 5 && searchFields?.country && searchFields?.state && searchFields?.lga && searchFields?.ward && searchFields?.pollingUnit) return true
    return false
  }

  const checkParties= () =>  parties.some((party)=>party.checked === true)

  const checkDisableStatus = () => checkSearchFields() && (isParite ? checkParties() : true)

  const submit = () => {
    getResults()
  }

  return (
    <div className={css.container}>
      {searchLevel >= 2 && searchFields?.country && (
        <StateBox searchFields={searchFields} setSearchFields={setSearchFields} />
      )}

      {searchLevel >= 3 && searchFields?.state && (
        <LgaBox searchFields={searchFields} setSearchFields={setSearchFields} path="getLGA" />
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


// --------- SENATE -----------
export const SenateSelectBoxes = ({ searchFields, setSearchFields, searchLevel, isParite, parties, getResults }) => {

  const checkSearchFields = ()=> {
    if (searchLevel === 1 && searchFields?.district && searchFields?.state) return true
    if (searchLevel === 2 && searchFields?.district && searchFields?.state && searchFields?.lga) return true
    if (searchLevel === 3 && searchFields?.district && searchFields?.state && searchFields?.lga && searchFields?.ward) return true
    return false
  }

  const checkParties= () =>  parties.some((party)=>party.checked === true)

  const checkDisableStatus = () => checkSearchFields() && (isParite ? checkParties() : true)

  const submit = () => {
    getResults()
  }


  return (
    <div className={css.container}>
      {searchLevel <= 3 && (
        <StateBox searchFields={searchFields} setSearchFields={setSearchFields} />
      )}

      {searchLevel <= 3 && searchFields?.state && (
        <DistrictBox searchFields={searchFields} setSearchFields={setSearchFields} />
      )}

      {searchLevel >= 2 && searchFields?.district && (
        <LgaBox searchFields={searchFields} setSearchFields={setSearchFields} path="getSenateLGA" />
      )}

      {searchLevel == 3 && searchFields?.lga && (
        <WardBox
          searchFields={searchFields}
          setSearchFields={setSearchFields}
          path="getWard"
        />
      )}

      <Button color="dark" leftIcon={<Search />} disabled={!checkDisableStatus()} onClick={submit}>
        Search
      </Button>
    </div>
  );
};


// --------- REP -----------
export const RepSelectBoxes = ({ searchFields, setSearchFields, searchLevel, isParite, parties, getResults }) => {

  const checkSearchFields = ()=> {
    if (searchLevel === 1 && searchFields?.constituency && searchFields?.state) return true
    if (searchLevel === 2 && searchFields?.constituency && searchFields?.state && searchFields?.lga) return true
    if (searchLevel === 3 && searchFields?.constituency && searchFields?.state && searchFields?.lga && searchFields?.ward) return true
    return false
  }

  const checkParties= () =>  parties.some((party)=>party.checked === true)

  const checkDisableStatus = () => checkSearchFields() && (isParite ? checkParties() : true)

  const submit = () => {
    getResults()
  }


  return (
    <div className={css.container}>
      {searchLevel <= 3 && (
        <StateBox searchFields={searchFields} setSearchFields={setSearchFields} />
      )}

      {searchLevel <= 3 && searchFields?.state && (
        <Constituency searchFields={searchFields} setSearchFields={setSearchFields} />
      )}

      {searchLevel >= 2 && searchFields?.constituency && (
        <LgaBox searchFields={searchFields} setSearchFields={setSearchFields} path="getRepLGA" />
      )}

      {searchLevel == 3 && searchFields?.lga && (
        <WardBox searchFields={searchFields} setSearchFields={setSearchFields} path="getRepWard" />
      )}

      <Button color="dark" leftIcon={<Search />} disabled={!checkDisableStatus()} onClick={submit}>
        Search
      </Button>
    </div>
  );
};