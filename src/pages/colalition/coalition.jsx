import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//
import { BluePrint } from '../../compononts/BluePrint/BluePrint'
import Header from '../../compononts/header'
import removeToken from '../../compononts/useToken'
import css from './coalition.module.scss'
import { authInit } from '../../config/state'
import { useAtom } from 'jotai'
import CollationSearch from '../../compononts/CollationSearch/CollationSearch'


const Coalition = (props) => {
  const navigate= useNavigate()
  const [auth, setAuth] = useAtom(authInit)

  useEffect(()=> {
    if(!auth){
      navigate('/login');
    }
  },[])

  return (
    <>
      <Header token={removeToken}/>
      <div className={css.wrapper}>
      <CollationSearch source="coalation" token={props.token} />
      </div>
      <BluePrint/>
    </>
  )
}

export default Coalition