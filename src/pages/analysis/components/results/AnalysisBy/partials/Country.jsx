import { DataTable } from 'mantine-datatable'
import { useState, useEffect } from 'react'
//
import css from '../Result.module.scss'


const Country = ({ results }) => {

  // table data
  const records = [
    { label : "collation status", value : (results?.collation_status[0])['coallation status'] },
    { label : "over voting status", value : results?.over_voting_status[0].over_voting_status },
    { label : "over voting figure", value : results?.over_voting_figure[0].Total_over_vote_figures },
    { label : "total registered voters", value : results?.total_registered_voters[0].COUNT1 },
    { label : "total accredited voters", value : results?.total_accredited_voters[0].COUNT1 },
    { label : "total rejected voters", value : results?.total_rejected_votes[0].COUNT1 },
    { label : "total votes casted", value : results?.total_vote_casted[0].COUNT1 },
    { label : "total valid votes", value : results?.total_valid_votes[0].COUNT1 },
    { label : "percentage turnout", value : results?.percentage_voters_turnout[0].COUNT1 },
  ]


  return (
    <div>
        
        <div className={css.performanceTable} >
            <DataTable
              className='without-head'
              withBorder
              withColumnBorders
              columns={[
                { accessor: "label", textAlignment: "left" },
                { accessor: "value", textAlignment: "center" },
              ]}
              records={records}
            />          
        </div>
  
    </div>
  )
}

export default Country