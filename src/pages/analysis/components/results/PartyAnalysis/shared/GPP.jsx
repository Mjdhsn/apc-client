import React, { useState } from 'react'
import { Button } from '@mantine/core'
import { Modal as MantineModal, Table } from "@mantine/core";
import { DataTable } from 'mantine-datatable';
//
import css from '../Result.module.scss'


const gppData = [
    { index : 1, party_name : "ZLP", scories : "125", percentage_scories : "60%" },
    { index : 2, party_name : "LGA", scories : "563", percentage_scories : "20%" },
    { index : 3, party_name : "LRM", scories : "457", percentage_scories : "50%" },
]

const GPP = ({ records }) => {

  // state  
  const [openedModal, setOpenedModal] = useState(false)

  return (
    <div>

        <div className={css.gpp} >
           <div> Generel Party Performance </div>   
           <div></div>

           <div>
              <Button color="dark" onClick={() => setOpenedModal(!openedModal)} >
                 Click To See
              </Button>
           </div>
        </div>   


        <MantineModal
            opened={openedModal}
            onClose={() => setOpenedModal(false)}
            overflow="inside"
            size={"80%"}
        >
            <DataTable
              withBorder
              withColumnBorders
              columns={[
                { accessor: "index", title: "S/N", textAlignment: "left" },
                { accessor: "party_name", textAlignment: "left" },
                { accessor: "scories", textAlignment: "left" },
                { accessor: "percentage_scories", textAlignment: "left" },
              ]}
              records={records || gppData}
            />   
        </MantineModal>

    </div>
  )
}

export default GPP