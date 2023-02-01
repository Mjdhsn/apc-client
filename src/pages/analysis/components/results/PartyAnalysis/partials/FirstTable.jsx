import React, { useState } from 'react'
import { DataTable } from 'mantine-datatable'
import { Button } from '@mantine/core'
//
import Modal from '../shared/Modal'
import css from '../Result.module.scss'


const FirstTable = ({ response }) => {
  
  // state
  const [modalOpened, setModalOpened] = useState(false)
  const [tableData, setTableData] = useState([])


  return (
    <div className={css.firstTable} >
        <div >
            <DataTable
                className='without-head'
                withBorder
                withColumnBorders
                columns={[
                { accessor: "label", textAlignment: "left" },
                { accessor: "value", textAlignment: "right" },
                ]}
                records={
                    Object.keys(response.values).map((e) => {
                        if(e !== "general_party_performance"){
                            return { label : e.replaceAll('_', '  ') , value : response.values[e][0] }
                        }
                    })
                }
            />            
        </div>
        
        {response.values.general_party_performance && <div className={css.generalData} >
            <DataTable
                className='without-head'
                withBorder
                withColumnBorders
                columns={[
                    { accessor: "label", textAlignment: "left" },
                    { accessor: "value", textAlignment: "right" },
                    { accessor: "modal", textAlignment: "right" },
                ]}
                records={[
                   {
                      label : "General Party Performance",
                      value : response.values.general_party_performance[0],
                      modal : <Button color='dark' onClick={() => { setModalOpened(!modalOpened); setTableData(response.tables.general_party_performance) }} > Click To See </Button>
                   } 
                ]}
            />


            <Modal table={tableData} modalOpened={modalOpened} setModalOpened={setModalOpened}/>
        </div>}
    </div>
  )
}

export default FirstTable