import React from 'react'
import { useLocation } from 'react-router-dom'
//
import Layout from '../components/Layout'
import LevelTable from '../components/LevelTable/LevelTable'
import { PresidentialSelectBoxes } from '../components/SelectBoxes/SelectBoxes'
import PresidentialResult from '../components/Results/PresidentialResult'
import { usePresidential } from '../../../hooks/useComparism'


const Presidential = () => {
  
  // hook
  const { selectedLevel, setSelectedLevel, searchFields, setSearchFields, searchLevel, getPresidential, data, isLoading } = usePresidential()

  return (
    <Layout>

        {/* heading */}
        <h2 className='heading_' > Presidential Comparison ({selectedLevel.replace("-", " ")}) </h2>

        {/* to select the level */}
        <LevelTable receivedlevel={selectedLevel} setLevel={setSelectedLevel} routeLevel={5} />
        
        {/* all level select boxes */}
        <PresidentialSelectBoxes searchFields={searchFields} setSearchFields={setSearchFields} isParite={false} searchLevel={searchLevel} getResults={getPresidential} />

        {/* result */}
        <PresidentialResult data={data} isLoading={isLoading} />

    </Layout>
  )
}

export default Presidential