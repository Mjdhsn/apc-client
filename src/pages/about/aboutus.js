import React from 'react'
import Header from '../../compononts/header'
import css from './about.module.scss'
import useToken from '../../compononts/useToken'
import GridImage from '../../compononts/GridImage/GridImage'


const AboutUs = () => {
  const { removeToken } = useToken();

  return (
    <>
      <Header token={removeToken}/>

      <div className={css.container} >

        <div className={css.about_content}>
          <h1>About Us</h1>

          <p> The <strong>All Progressives Congress</strong> (APC) is a Nigerian political party with a platform focused on good governance, economic growth, and improving the standard of living for all Nigerians. The party values diversity, free and fair elections, transparency, and the protection of human rights. Under the leadership of President Muhammadu Buhari, the APC has implemented reforms aimed at building a stronger, more inclusive society in Nigeria. The party is dedicated to promoting national unity and equality.</p>
        </div>

        <GridImage />
      </div>
    </>
  )
}

export default AboutUs