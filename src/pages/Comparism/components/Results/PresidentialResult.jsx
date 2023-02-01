import React from 'react'
import { Table } from '@mantine/core'
//
import css from '../../comparism.module.scss'
import HeadTable from '../HeadTable'
import Loader from '../../../../compononts/Loader/Loader'


const PresidentialResult = ({ data, isLoading }) => {

  if(isLoading) return <Loader />

  return (
    <div className={css.comparism_presidential_result} >
      {data &&
        <>
          <div className={css.comparism_presidential_result_tables}  >
              {Object.keys(data).map((e, i) => {
                if(e !== 'others'){
                  return <HeadTable title={e} data={data} key={i} />
                }
              })}
          </div>

          {data?.others?.comparism_table && <Table className={css.table} >
            <thead>
              <tr>
                {Object.keys(data?.others?.comparism_table[0]).map((name, i) => {
                  return <th key={i}>{name.replace("_", " ")}</th>;
                })}
              </tr>
            </thead>

            <tbody>
                {data?.others?.comparism_table?.map((ele, i) => (
                  <tr key={i} >
                    {Object.keys(ele).map((e, i) => <td key={i} >{ele[e]}</td>)}
                  </tr>   
                ))}
            </tbody>
          </Table>} 
        </>
      }
       
    </div>
  )
}

export default PresidentialResult