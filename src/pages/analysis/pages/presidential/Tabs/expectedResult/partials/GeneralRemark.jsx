import { DataTable } from 'mantine-datatable'
import React from 'react'
//
import css from '../Result.module.scss'


const GeneralRemark = ({ data }) => {
  return (
    <div className={css.generalRemark} >
        <div className={css.performanceTable} >
            <DataTable
                className='without-head'
                withBorder
                withColumnBorders
                columns={[
                    { accessor: "label", textAlignment: "left" },
                    { accessor: "value", textAlignment: "right" },
                ]}
                records={[
                    { label : "General Remark", value : data }
                ]}
            />
        </div>
    </div>
  )
}

export default GeneralRemark