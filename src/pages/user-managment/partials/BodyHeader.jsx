import { useAtom } from 'jotai'
import React from 'react'
//
import css from '../User.module.scss'
import { activeNav } from '../../../config/state'
import { bodytitle } from '../../../config/constant'


const BodyHeader = () => {
  
  // hook 
  const [active, setActive] = useAtom(activeNav)

  return (
    <div className={css.body_header} >

        <h3> {bodytitle[active]} </h3>

    </div>
  )
}

export default BodyHeader