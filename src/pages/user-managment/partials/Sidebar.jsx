import React from 'react'
import { useAtom } from 'jotai'
import { HiUserAdd, HiUsers } from 'react-icons/hi'
//
import css from '../User.module.scss'
//
import { activeNav, authInit } from '../../../config/state'


// icons
const icons = [ <HiUsers />, <HiUserAdd /> ]

const Sidebar = () => {

  // Hooks
  const [auth, setAuth] = useAtom(authInit)
  const [active, setActive] = useAtom(activeNav)

  return (
    <div>

      <p className={active == 0 && css.active} onClick={() => setActive(0)} > {icons[0]} Users </p>
      { auth?.role !== 'ppa' && auth?.role !== 'spa' && auth?.role !== 'rpa'  && 
        <p className={active == 1 && css.active} onClick={() => setActive(1)} > {icons[1]} Add User </p>
      }
    
    </div>
  )
}

export default Sidebar