import { useAtom } from 'jotai'
import React from 'react'
//
import Users from './Users'
import AddUser from './AddUser'
import { activeNav } from '../../../config/state'


const Body = () => {
  // hook
  const [active, setActive] = useAtom(activeNav)

  return (
    <>
      {active === 0 && <Users />}  
      {active === 1 && <AddUser />}  
    </>
  )
}

export default Body