import React from 'react'
//
import css from './loading.module.scss'
//
import Loading from '../../assets/loading.gif'

const Global = () => {
  return (
    <div className={css.global} >
       <img src={Loading} /> 
    </div>
  )
}

export default Global