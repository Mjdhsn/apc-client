import React from "react";
import css from "./SelectBoxes.module.scss";
import { Button } from "@mantine/core";
import { Search } from "@mui/icons-material";
//
import LgaBox from "../../../../compononts/SelectBoxes/LgaBox";
import PollingBox from "../../../../compononts/SelectBoxes/PollingBox";
import StateBox from "../../../../compononts/SelectBoxes/StateBox";
import WardBox from "../../../../compononts/SelectBoxes/WardBox";
import DistrictBox from "../../../../compononts/SelectBoxes/DistrictBox";
import Constituency from "../../../../compononts/SelectBoxes/Constituency";
import LevelBox from "../../../../compononts/SelectBoxes/LevelBox";


// ----- PRESIDENTIAL ------
export const PresidentialSelectBoxes = ({ searchFields, setApiLevel, apiLevel, setSearchFields, searchLevel, parties, isParite, getResults }) => {

  const checkSearchFields = ()=> {
    if (searchLevel === 1 && searchFields?.country) return true
    if (searchLevel === 2 && searchFields?.country && searchFields?.state) return true
    if (searchLevel === 3 && searchFields?.country && searchFields?.state && searchFields?.lga) return true
    if (searchLevel === 4 && searchFields?.country && searchFields?.state && searchFields?.lga && searchFields?.ward) return true
    if (searchLevel === 5 && searchFields?.country && searchFields?.state && searchFields?.lga && searchFields?.ward && searchFields?.pollingUnit) return true
    return false
  }

  const checkParties= () => parties.some((party)=>party.checked === true)

  const checkDisableStatus = () => checkSearchFields() && (isParite ? checkParties() : true)

  const submit = () => {
    getResults()
  }

  return (
    <div>
      <p>Select the Fields</p>

      <div className={css.container}>

        {apiLevel !== undefined && <LevelBox setApiLevel={setApiLevel} apiLevel={apiLevel} searchLevel={searchLevel} />}

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
    </div>
  );
};


// ----- SENATE ------
export const SenateSelectBoxes = ({ searchFields, setSearchFields, searchLevel, parties, isParite, getResults }) => {

  const checkSearchFields = ()=> {
    if (searchLevel === 1 && searchFields?.state) return true
    if (searchLevel === 2 && searchFields?.district && searchFields?.state) return true
    if (searchLevel === 3 && searchFields?.district && searchFields?.state && searchFields?.lga) return true
    if (searchLevel === 4 && searchFields?.district && searchFields?.state && searchFields?.lga && searchFields?.ward) return true
    if (searchLevel === 5 && searchFields?.district && searchFields?.state && searchFields?.lga && searchFields?.ward && searchFields?.pollingUnit) return true
    return false
  }

  const checkParties= () => parties.some((party)=>party.checked === true)

  const checkDisableStatus = () => checkSearchFields() && (isParite ? checkParties() : true)

  const submit = () => {
    getResults()
  }

  return (
    <div>
      <p>Select the Fields</p>

      <div className={css.container}>
        {searchLevel <= 5 && (
          <StateBox searchFields={searchFields} setSearchFields={setSearchFields} />
        )}

        {searchLevel >= 2 && searchFields?.state && (
          <DistrictBox searchFields={searchFields} setSearchFields={setSearchFields} />
        )}

        {searchLevel >= 3 && searchFields?.district && (
          <LgaBox searchFields={searchFields} setSearchFields={setSearchFields} path="getSenateLGA"  />
        )}

        {searchLevel >= 4 && searchFields?.lga && (
          <WardBox
            searchFields={searchFields}
            setSearchFields={setSearchFields}
            path="getSenateWard"
          />
        )}

        {searchLevel == 5 && searchFields?.ward && (
          <PollingBox
            searchFields={searchFields}
            setSearchFields={setSearchFields}
            path="getSenatePol"
          />
        )}

        <Button color="dark" leftIcon={<Search />} disabled={!checkDisableStatus()} onClick={submit}>
          Search
        </Button>
      </div>      
    </div>
  );
};


// ----- REP ------
export const RepSelectBoxes = ({ searchFields, setSearchFields, searchLevel, parties, isParite, getResults }) => {

  const checkSearchFields = ()=> {
    if (searchLevel === 1 && searchFields?.state) return true
    if (searchLevel === 2 && searchFields?.constituency && searchFields?.state) return true
    if (searchLevel === 3 && searchFields?.constituency && searchFields?.state && searchFields?.lga) return true
    if (searchLevel === 4 && searchFields?.constituency && searchFields?.state && searchFields?.lga && searchFields?.ward) return true
    if (searchLevel === 5 && searchFields?.constituency && searchFields?.state && searchFields?.lga && searchFields?.ward && searchFields?.pollingUnit) return true
    return false
  }

  const checkParties= () => parties.some((party)=>party.checked === true)

  const checkDisableStatus = () => checkSearchFields() && (isParite ? checkParties() : true)

  const submit = () => {
    getResults()
  }

  return (
    <div>
      <p>Select the Fields</p>

      <div className={css.container}>
        {searchLevel <= 5 && (
          <StateBox searchFields={searchFields} setSearchFields={setSearchFields} />
        )}

        {searchLevel >= 2 && searchFields?.state && (
          <Constituency searchFields={searchFields} setSearchFields={setSearchFields} />
        )}

        {searchLevel >= 3 && searchFields?.constituency && (
          <LgaBox searchFields={searchFields} setSearchFields={setSearchFields} path="getRepLGA"  />
        )}

        {searchLevel >= 4 && searchFields?.lga && (
          <WardBox
            searchFields={searchFields}
            setSearchFields={setSearchFields}
            path="getRepWard"
          />
        )}

        {searchLevel == 5 && searchFields?.ward && (
          <PollingBox
            searchFields={searchFields}
            setSearchFields={setSearchFields}
            path="getRepPol"
          />
        )}

        <Button color="dark" leftIcon={<Search />} disabled={!checkDisableStatus()} onClick={submit}>
          Search
        </Button>
      </div>      
    </div>
  );
};
