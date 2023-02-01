import React from 'react'
//
import css from '../Result.module.scss'


const Graph = ({ data }) => {
  return (
    <div className={css.graph_container} >

      <div className={css.content} >
         <h1> Party Performance </h1>

         <div>
            <span />
            <span> PARTY PERFORMANCE </span> 
         </div> 
      </div>

      <div className={css.graph_wrapper} >
         <div className={css.graph_left}  >
            {data.map((e, i) => <span key={i} >{e.PARTY}</span>)}
         </div>

         <div className={css.graph_right} >
            {data.map((e, i) => <div key={i} ><span style={{ width: e.PERCENTAGE_VOTES_CASTED }} > {e.VOTES} </span> {e.PERCENTAGE_VOTES_CASTED !== "0.00%" && e.PERCENTAGE_VOTES_CASTED} </div>)}
         </div> 
      </div>

    </div>
  )
}

export default Graph