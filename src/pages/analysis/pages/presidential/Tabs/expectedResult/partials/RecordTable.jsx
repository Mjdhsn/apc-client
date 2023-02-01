import { DataTable } from 'mantine-datatable'
import { useState, useEffect } from 'react'
import { Button } from '@mantine/core';
//
import css from '../Result.module.scss'
import Modal from './Modal';


const RecordTable = ({ data, menuSelected }) => {

  // state
  const [modalOpened, setModalOpened] = useState(false)

  // table data records
  const records = [
    { label : "total registered voters", value :  data?.total_registered_voters[0].COUNT1 },
    { label : "total accredited voters", value : data?.total_accredited_voters[0].COUNT1 },
    { label : "total rejected voters", value : data?.total_rejected_votes[0].COUNT1 },
    { label : "total votes casted", value : data?.total_vote_casted[0].COUNT1 },
    { label : "total valid votes", value : data?.total_valid_votes[0].COUNT1 },
    { label : `over-voting ${menuSelected}`, value : data?.total_over_voting[0].COUNT1 },
    data?.total_over_voting_table && { label : "total over-voting votes", value : <Button color="dark" onClick={() => setModalOpened(true)} > Click </Button> }
  ]

  return (
    <div className={css.performanceTableContainer} >
        <div className={css.performanceTable} >
            <DataTable
                className='without-head'
                withBorder
                withColumnBorders
                columns={[
                  { accessor: "label", textAlignment: "left" },
                  { accessor: "value", textAlignment: "right" },
                ]}
                records={records}
            />

            {data?.total_over_voting_table && <Modal table={data?.total_over_voting_table} modalOpened={modalOpened} setModalOpened={setModalOpened}/>}
        </div>
        
    </div>
  )
}

export default RecordTable