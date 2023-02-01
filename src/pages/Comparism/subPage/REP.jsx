import React from 'react'
//
import Layout from '../components/Layout'
import LevelTable from '../components/LevelTable/LevelTable'
import { RepSelectBoxes } from '../components/SelectBoxes/SelectBoxes'
import PresidentialResult from '../components/Results/PresidentialResult'
import { useRep } from '../../../hooks/useComparism'


const Rep = () => {

  // hook
  const { selectedLevel, setSelectedLevel, searchFields, setSearchFields, searchLevel, getPresidential, data, isLoading } = useRep()
  
  return (
    <Layout>

        {/* heading */}
        <h2> Comparison ({selectedLevel.replace("-", " ")}) </h2>

        {/* to select the level */}
        <LevelTable receivedlevel={selectedLevel} setLevel={setSelectedLevel} routeLevel={5} />
        
        {/* all level select boxes */}
        <RepSelectBoxes searchFields={searchFields} setSearchFields={setSearchFields} isParite={false} searchLevel={searchLevel} getResults={getPresidential} />

        {/* result */}
        <PresidentialResult data={data} isLoading={isLoading} />

    </Layout>
  )
}

export default Rep