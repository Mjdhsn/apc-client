import React from 'react'
import { Table } from '@mantine/core';
//
import css from '../Result.module.scss'


const PartyInfo = ({ data }) => {
  return (
    <div className={css.partyInfo} >
        {Array.isArray(data) &&
            <Table className="table">
                <thead>
                    <tr>
                        <th> S/N </th>
                        {Object.keys(data[0]).map((name, i) => {
                            if(name !== 'ROW_NUM'){
                               return <th key={i}>{name.replace("_", " ")}</th>;
                            }
                        })}
                    </tr>
                </thead>

                <tbody>
                    {data.map((e, i) => {
                        return (
                           <tr>
                              {
                                Object.values(e).map((value, j)=>{
                                  return <td key={j} >{value}</td>
                                })
                              }
                           </tr> 
                        )
                    })}
                </tbody>
            </Table>
        }
    </div>
  )
}

export default PartyInfo