import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../compononts/header";
import removeToken from "../../../compononts/useToken";
import usePresidentialResult from "../../../hooks/useResult";
import LevelTable from "../partials/LevelTable/LevelTable";
import css from "../GeneralResults.module.scss";
import PartyTable from "../partials/PartyTable/PartyTable";
import SelectBoxes from "../partials/SelectBoxes/SelectBoxes";
import TotalFields from "../partials/TotalFields/TotalFields";


const Presidential = () => {
  const location = useLocation();
  const { selectedLevel, setSelectedLevel, searchFields, setSearchFields, searchLevel, routeLevel, menuSelected, parties, partyHandlers, getResults, results, isResultLoading } = usePresidentialResult(location);

  return (
    <>
      <Header token={removeToken} /> 
      
      <div className={css.container}>
        
        {/* head */}
        <h3>{location.state.parent}  Result ({location.state.child}) Level</h3>

        {/* to select the level */}
        <LevelTable receivedlevel={selectedLevel} setLevel={setSelectedLevel} routeLevel={routeLevel}/>

        {/* to select the parties */}
        <PartyTable values={parties} handlers={partyHandlers}/>

        {/* all level select boxes */}
        <p>Select the Fields</p>
        <SelectBoxes searchFields={searchFields} setSearchFields={setSearchFields} parties={parties} searchLevel={searchLevel} getResults={getResults}/>

        {/* contains results */}
        <TotalFields results={results} isResultLoading={isResultLoading} menuSelected={menuSelected} child={location.state.child} />

      </div>
    </>
  );
};

export default Presidential;
