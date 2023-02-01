import React from 'react'
import { useLocation } from 'react-router-dom';
import { randomId } from "@mantine/hooks";
//
import css from "../../presidential.module.scss";
//
import LevelTable from '../../../../components/LevelTable/LevelTable';
import PartyTable from '../../../../components/PartyTable/PartyTable';
import usePartyAnalysis from '../../../../../../hooks/usePartyAnalysis'
import { PresidentialSelectBoxes } from '../../../../components/SelectBoxes/SelectBoxes';
import PartyAnalysisResult from '../../../../components/results/PartyAnalysis/PartyAnalysisResult';
import { PartiesNames } from '../../../../../parties/partiesNames';


const Index = () => {

  // hook
  const location = useLocation();
  const { routeLevel, selectedLevel, setSelectedLevel, setApiLevel, apiLevel, searchFields, setSearchFields, searchLevel, parties, setParty, getPartyAnalysis, data, isLoading } = usePartyAnalysis(location)


  console.log(data)


  // party list
  const partyList = PartiesNames.map((party) => {
    return { label: party, checked: party === parties ? true : false, key: randomId() };
  })


  return (
    <div className={css.container}>
        {/* head */}
        <h3>{location.state.parent}  Analysis ({ location.state.child }) Level</h3>

        {/* to select the level */}
        <LevelTable receivedlevel={selectedLevel} setLevel={setSelectedLevel} routeLevel={routeLevel}/>

        {/* to select the parties */}
        <PartyTable values={partyList} setParty={setParty} single />
        
        {/* all level select boxes */}
        <PresidentialSelectBoxes searchFields={searchFields} apiLevel={apiLevel} setApiLevel={setApiLevel} setSearchFields={setSearchFields} parties={parties} searchLevel={searchLevel} getResults={getPartyAnalysis}/>

        {/* contains results */}
        <PartyAnalysisResult results={data} isResultLoading={isLoading} searchLevel={searchLevel} apiLevel={apiLevel} />
    </div>
  )
}

export default Index