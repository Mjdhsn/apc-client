import { Button } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useState } from 'react'
import { useEffect } from 'react';
//
import css from '../Result.module.scss'
import GPP from '../shared/GPP';


const performanceData = [
  { label : "REGISTERED VOTERS", value: "100" },
  { label : "ACCREDITED VOTERS", value: "100" },
  { label : "REJECTED VOTES", value: "100" },
  { label : "VALID VOTES", value: "100" },
  { label : "VOTES CASTED", value: "100" },
  { label : "PERCENTAGE TURN-OUT", value: "100" },
  { label : "COLLATION STATUS", value: "100" },
  { label : "OVER-VOTING STATUS", value: "100" },
  { label : "OVER-VOTING VALUES", value: "100" },
]

const gppData = [
  { index : 1, party_name : "ZLP", scories : "125", percentage_scories : "60%" },
  { index : 2, party_name : "LGA", scories : "563", percentage_scories : "20%" },
  { index : 3, party_name : "LRM", scories : "457", percentage_scories : "50%" },
]

const PollingUnit = () => {
  
  // state
  const [partyPerfRecords, setPertyPerfRecods] = useState([])
  const [gppRecords, setGppRecods] = useState([])
  
  // set party performance data
  useEffect(() => {
    setPertyPerfRecods(performanceData)
  }, [])
  
  // set general party performance data
  useEffect(() => {
    setGppRecods(gppData)
  }, [])


  return (
    <div>
        
        <div className={css.performanceTable} >
            <DataTable 
              withBorder
              withColumnBorders
              columns={[
                { accessor: "label", textAlignment: "left" },
                { accessor: "value", textAlignment: "center" },
              ]}
              records={partyPerfRecords}
            />          
        </div>

        <GPP records={gppRecords} />

    </div>
  )
}

export default PollingUnit