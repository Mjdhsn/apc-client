import React from 'react'
//
import css from './message.styled.scss'


const Index = ({ children }) => {
  return (
    <div className={css.message} >
       {children} 
    </div>
  )
}

export default Index