import React from 'react'
import { useLocation } from 'react-router-dom';
//
import css from "../../presidential.module.scss";
//
import LevelTable from '../../../../components/LevelTable/LevelTable';
import { PresidentialSelectBoxes } from '../../../../components/SelectBoxes/SelectBoxes';
import AnalysisByResult from '../../../../components/results/AnalysisBy/AnalysisByResult';
import { usePresidentialAnalysisBy } from '../../../../../../hooks/useAnalysisBy';


const Index = () => {
  // hook
  const location = useLocation();
  const { routeLevel, selectedLevel, setSelectedLevel, searchFields, setSearchFields, searchLevel, getAnalysisBy, data, isLoading, menuSelected } = usePresidentialAnalysisBy(location)

  return (
    <div className={css.container}>
        {/* head */}
        <h3>{location.state.parent}  Analysis ({ location.state.child }) Level</h3>

        {/* to select the level */}
        <LevelTable receivedlevel={selectedLevel} setLevel={setSelectedLevel} routeLevel={routeLevel}/>
        
        {/* all level select boxes */}
        <PresidentialSelectBoxes searchFields={searchFields} setSearchFields={setSearchFields} isParite={false} searchLevel={searchLevel} getResults={getAnalysisBy} />

        {/* search Result */}
        <AnalysisByResult results={data} isLoading={isLoading} menuSelected={menuSelected}  />
    
    </div>
  )
}

export default Index