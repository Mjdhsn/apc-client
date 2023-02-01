import React from 'react'
//
import removeToken from "../../../compononts/useToken";
import Header from '../../../compononts/header'
import css from '../comparism.module.scss'


const Layout = ({ children }) => {
  return (
    <>
      <Header token={removeToken} />

      <div  className={css.comparism}  >
        {children}
      </div>
    </>
  )
}

export default Layout