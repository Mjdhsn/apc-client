import React from 'react'
//
import removeToken from "../../../../compononts/useToken";
//
import Header from '../../../../compononts/header'
import AnalysisBy from './Tabs/analysisBy'
import PartyAnalysis from './Tabs/partyAnalysis'
import ExpectedResult from './Tabs/expectedResult'
import Tabs from '../../../../compononts/Tabs'
import css from './presidential.module.scss'


const Presidential = () => {
  return (
    <>
      <Header token={removeToken} />    

      <div className={css.analysis} >
        <Tabs 
           head={[ "Analysis By Country, State, Ward and PU", "Party Performance", "Prediction" ]}
           childs={[ <AnalysisBy />, <PartyAnalysis />, <ExpectedResult /> ]}
        />
      </div>
    </>
  )
}

export default Presidential