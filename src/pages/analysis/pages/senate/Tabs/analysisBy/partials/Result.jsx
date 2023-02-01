import React from 'react'
//
import AnalysisByResult from '../../../../../components/results/AnalysisBy/AnalysisByResult';
import Party from '../../../partials/Party';
import State from '../../../partials/State';


const Result = ({ selectedLevel, isLoading, data, menuSelected }) => {
  return (
    <>

       <AnalysisByResult results={data} isLoading={isLoading} menuSelected={menuSelected}  />
       
       {selectedLevel === "national" && <State />}
       {selectedLevel === "party" && <Party />}

    </>
  )
}

export default Result