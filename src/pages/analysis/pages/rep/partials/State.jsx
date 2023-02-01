import React from 'react'
import { DataTable } from 'mantine-datatable'
//
import css from '../REP.module.scss'


const State = () => {

  // demo data
  const demo_data = [
    { serioul : 1, state : "Kano", district_code : "KANO CENTRAL", district : "KANO CENTRAL", party_won : "APC", party_won_ward: "APC", party_won_lga : "APC", party_won_district : "APC" },
    { serioul : 2, state : "Kano", district_code : "KANO CENTRAL", district : "KANO CENTRAL", party_won : "APC", party_won_ward: "APC", party_won_lga : "APC", party_won_district : "APC" },
    { serioul : 3, state : "Kano", district_code : "KANO CENTRAL", district : "KANO CENTRAL", party_won : "APC", party_won_ward: "APC", party_won_lga : "APC", party_won_district : "APC" },
  ]

  return (
    <div className={css.state} >

      <h4>
          Table of parties won the senatorial districts of every state in Nigeria and FCT based on Results from Polling
          Unites, Wards, LGAs and Senatorial Districts
      </h4>

      <DataTable
         withBorder
         withColumnBorders
         columns={[
           { accessor: "serioul", title : "S/N" },
           { accessor: "state", title : "State Name" },
           { accessor: "district_code", title : "District Code" },
           { accessor: "district", title : "District Name" },
           { accessor: "party_won", title : "Party Won (Pus Result)" },
           { accessor: "party_won_ward", title : "Party Won (Ward's Result)" },
           { accessor: "party_won_lga", title : "Party Won (LGA's Result)" },
           { accessor: "party_won_district", title : "Party Won (District's Result)" },
         ]}
         records={demo_data}
      />     

    </div>
  )
}

export default State