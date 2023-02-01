import React, { useState } from 'react'
import { Button, Table } from "@mantine/core";
//
import Modal from '../../../../../../compononts/TotalField/Modal/Modal'
import css from '../Result.module.scss'
import { camelize } from '../../../../../../utils/camalize';


const MainTable = ({ results, name }) => {
  
  // state
  const [modalOpened, setModalOpened] = useState(false)
  const [tableData, setTableData] = useState()

  // performance perameters data
  const PPData = {
     total : "Total",
     total_collated: "Total Collated",   
     total_non_collated:"Total Non-Collated",   
     total_canceled:"Total Cancelled",   
     total_over_voting:"Total Over-voting",   
     number_clear_win: "Number Of Clear Win",   
     number_win_with_doubt:"Number Of Win With Doubt",   
     number_of_clear_loss:"Number Of Clear Loss",   
     number_of_loss_with_doubt:"Number Of Loss With Doubt",   
     above_clearly_25:"Where Got 25% and Above Clearly",
     above_with_doubt_25:"Where Got 25% and Above With Doubt",
  }

  return (
    <div className={css.mainTable} >
        <Table className="table">
            <thead>
                <tr>
                    <th> Performance Parameters </th>
                    <th> {camelize(name)} </th>
                </tr>
            </thead>
            
            <tbody>    
                {
                   Object.keys(results.values).map((ele, i) => (
                      <tr>
                         <td> {PPData[ele]} </td>   
                         {
                           ele != 'general_party_performance' &&
                    
                                        <td>
                                            <div className={css.doubleData} >
                                                <span> {results.values[ele][0]} </span>
                                                <Button 
                                                    color="dark"
                                                    onClick={() => {
                                                        setModalOpened(true)
                                                        setTableData(results.tables[ele])
                                                    }}
                                                >
                                                    See More
                                                </Button>                                              
                                            </div> 
                                        </td>                                           
                         }     
                      </tr>
                   )) 
                }
            </tbody>
        </Table>

        {tableData && <Modal table={tableData} modalOpened={modalOpened} setModalOpened={setModalOpened}/>}
    </div>
  )
}

export default MainTable