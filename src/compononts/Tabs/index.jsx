import { useState } from 'react'
//
import css from './tabs.module.scss'


const Index = ({ childs, head }) => {
  // state
  const [active, setActive] = useState(0)

  return (
    <div className={css.tabs} >

       <div className={css.tab_head} >
          {head.map((e, i) => <span key={i} onClick={() => setActive(i)} className={active == i ? css.tab_active : ""} > {e} </span>)}
       </div>

       <div className={css.tab_body} >
          {childs[active]}
       </div>

    </div>
  )
}

export default Index