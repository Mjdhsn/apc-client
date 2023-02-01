import React from 'react'
import { useLocation } from 'react-router-dom';
//
import css from "../../REP.module.scss";
//
import LevelTable from '../../../../components/LevelTable/LevelTable';
import { RepSelectBoxes } from '../../../../components/SelectBoxes/SelectBoxes';
import { useRepAnalysisBy } from '../../../../../../hooks/useAnalysisBy';
import Result from './partials/Result';


const Index = () => {

  // hook
  const location = useLocation();
  const { routeLevel, selectedLevel, setSelectedLevel, searchFields, setSearchFields, searchLevel, getAnalysisBy, data, isLoading, menuSelected } = useRepAnalysisBy(location)

  return (
    <div className={css.container}>
        {/* head */}
        <h3>{location.state.parent}  Analysis ({ location.state.child }) Level</h3>

        {/* to select the level */}
        <LevelTable receivedlevel={selectedLevel} setLevel={setSelectedLevel} routeLevel={routeLevel}/>
        
        {/* all level select boxes */}
        <RepSelectBoxes searchFields={searchFields} setSearchFields={setSearchFields} isParite={false} searchLevel={searchLevel} getResults={getAnalysisBy} />

        {/* search Result */}
        <Result data={data} selectedLevel={selectedLevel} isLoading={isLoading} menuSelected={menuSelected} />
    
    </div>
  )
}

export default Index