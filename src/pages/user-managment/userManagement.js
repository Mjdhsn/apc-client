import React from 'react'
//
import css from './User.module.scss'
//
import Sidebar from './partials/Sidebar'
import Body from './partials/Body'
import Header from '../../compononts/header'
import useToken from '../../compononts/useToken'


const UserManagement = () => {

  // hook
  const { removeToken } = useToken()

  return (
    <>
      <Header token={removeToken} />

      <div className={css.wrapper} >

        <div className={css.wrapper_left} >
          <Sidebar />
        </div> 

        <div className={css.wrapper_right} >    
          <Body />
        </div> 

      </div>    
    </>
  )
}

export default UserManagement