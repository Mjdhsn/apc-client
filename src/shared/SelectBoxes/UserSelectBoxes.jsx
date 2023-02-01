import React from "react";
import { useAtom } from "jotai";
import css from "./SelectBoxes.module.scss";
//
import LgaBox from "../../compononts/SelectBoxes/LgaBox";
import PollingBox from "../../compononts/SelectBoxes/PollingBox";
import StateBox from "../../compononts/SelectBoxes/StateBox";
import WardBox from "../../compononts/SelectBoxes/WardBox";
import DistrictBox from "../../compononts/SelectBoxes/DistrictBox";
import Constituency from "../../compononts/SelectBoxes/Constituency";
import { authInit } from "../../config/state";


// ----- PRESIDENTIAL ------
export const PresidentialSelectBoxes = ({ searchFields, setSearchFields, searchLevel }) => {
  return (
    <div>
      <div className={css.container_2}>
        {searchFields?.country && (
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
      </div>      
    </div>
  );
};


// ----- SENATE ------
export const SenateSelectBoxes = ({ searchFields, setSearchFields, searchLevel, count }) => {
  return (
    <div>
      <div className={css.container}>
        {searchLevel <= 5 && (
          <StateBox searchFields={searchFields} setSearchFields={setSearchFields} />
        )}

        {searchLevel >= count-3 && searchFields?.state && (
          <DistrictBox searchFields={searchFields} setSearchFields={setSearchFields} />
        )}

        {searchLevel >= count-2 && searchFields?.district && (
          <LgaBox searchFields={searchFields} setSearchFields={setSearchFields} path="getSenateLGA"  />
        )}

        {searchLevel >= count-1 && searchFields?.lga && (
          <WardBox
            searchFields={searchFields}
            setSearchFields={setSearchFields}
            path="getSenateWard"
          />
        )}

        {searchLevel >= count && searchFields?.ward && (
          <PollingBox
            searchFields={searchFields}
            setSearchFields={setSearchFields}
            path="getSenatePol"
          />
        )}
      </div>      
    </div>
  );
};


// ----- REP ------
export const RepSelectBoxes = ({ searchFields, setSearchFields, searchLevel }) => {
  return (
    <div>
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
      </div>      
    </div>
  );
};
