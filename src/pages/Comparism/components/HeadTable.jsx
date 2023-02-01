import React, { useState } from 'react'
import { DataTable } from 'mantine-datatable'
//
import css from '../comparism.module.scss'
import { camelize } from '../../../utils/camalize'


const HeadTable = ({ title, data }) => {
  return (
    <div className={css.headTable} >
        
        <div className={css.headTable_head} >
           {`${title}`.replaceAll("_", " ").toUpperCase()}
        </div>

        <DataTable
            className='without-head'
            withBorder
            withColumnBorders
            columns={[
                { accessor: "label", textAlignment: "left" },
                { accessor: "value", textAlignment: "right" },
            ]}
            records={Object.keys(data[title]).map((e) => {return { label : camelize(`${e}`.replace("_"," ")), value : data[title][e][0].COUNT1 } })}
        />

    </div>
  )
}

export default HeadTable