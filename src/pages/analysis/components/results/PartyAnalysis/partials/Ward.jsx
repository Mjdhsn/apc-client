import { Button } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useState } from 'react'
import { useEffect } from 'react';
//
import css from '../Result.module.scss'
//
import Modal from '../shared/Modal'
import GPP from '../shared/GPP';


// data
const tableData = [
  { 
    lga_name : "ABA NORTH",
    pu_code : "01/01/01/001",
    pu_name : "B.T.C-SCHOOL PREMISES I",
    state_name : "ABIA",
    ward_name:"ARIARIA MARKET" 
  }
]

const performanceData = [
  { label : "REGISTERED VOTERS", value: "100", table : tableData },
  { label : "ACCREDITED VOTERS", value: "100", table : tableData  },
  { label : "REJECTED VOTES", value: "100", table : tableData  },
  { label : "VALID VOTES", value: "100", table : tableData  },
  { label : "VOTES CASTED", value: "100", table : tableData  },
  { label : "PERCENTAGE TURN-OUT", value: "100", table : tableData  },
  { label : "COLLATION STATUS", value: "100", table : tableData  },
  { label : "OVER-VOTING STATUS", value: "100", table : tableData  },
  { label : "OVER-VOTING VALUES", value: "100", table : tableData  },
]


const Ward = () => {

  // state
  const [partyPerfRecords, setPertyPerfRecods] = useState([])
  const [modalOpened, setModalOpened] = useState(false)
  const [tableData, setTableData] = useState([])

  // set party performance data
  useEffect(() => {
    setPertyPerfRecods(performanceData)
  }, [])

  return (
    <div>
        
        <div className={css.wardTable} >
            <DataTable 
              withBorder
              withColumnBorders
              columns={[
                { accessor: "label" ,title: "PERFORMANCE PARAMETERS", textAlignment: "left" },
                { 
                  accessor: "value",
                  title: "POLLING UNITS", 
                  textAlignment: "right", 
                  render : (render) => ( 
                    <Button 
                      color='dark' 
                      onClick={() => {
                         setModalOpened(!modalOpened)
                         setTableData(render.table)  
                      }} 
                    > 
                      Click To See 
                    </Button> )
                },
              ]}
              records={partyPerfRecords}
            />          
        </div>

        <Modal table={tableData} modalOpened={modalOpened} setModalOpened={setModalOpened}/>
        
        <GPP />        

    </div>
  )
}

export default Ward