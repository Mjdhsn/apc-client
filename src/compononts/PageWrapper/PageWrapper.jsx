import React from 'react'
import css from './PageWrapper.module.scss'
const PageWrapper = ({children}) => {
  return (
    <div className={css.container}>
        {children}
    </div>
  )
}

export default PageWrapper