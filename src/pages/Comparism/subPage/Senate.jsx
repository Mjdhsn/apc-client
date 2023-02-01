import React from 'react'
//
import Layout from '../components/Layout'
import LevelTable from '../components/LevelTable/LevelTable'
import { SenateSelectBoxes } from '../components/SelectBoxes/SelectBoxes'
import PresidentialResult from '../components/Results/PresidentialResult'
import { useSenate } from '../../../hooks/useComparism'


const Senate = () => {

  // hook
  const { selectedLevel, setSelectedLevel, searchFields, setSearchFields, searchLevel, getSenate, data, isLoading } = useSenate()

  return (
    <Layout>

        {/* heading */}
        <h2> Comparison ({selectedLevel.replace("-", " ")}) </h2>

        {/* to select the level */}
        <LevelTable receivedlevel={selectedLevel} setLevel={setSelectedLevel} routeLevel={5} />
        
        {/* all level select boxes */}
        <SenateSelectBoxes searchFields={searchFields} setSearchFields={setSearchFields} isParite={false} searchLevel={searchLevel} getResults={getSenate} />

        {/* result */}
        <PresidentialResult data={data} isLoading={isLoading} />

    </Layout>
  )
}

export default Senate