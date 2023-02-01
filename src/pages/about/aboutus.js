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

          <p> The <strong>New Nigerian Peoples Party</strong> (NNPP) was one of the major political parties that contested elections in the Nigerian Second Republic. The party was made up of three major groups: the Lagos Progressives, Club 19, and the Nigerian Council of Understanding. The Lagos progressives included some Lagos based NCNC politicians such as Adeniran Ogunsanya, T.O.S. Benson and Kola Balogun. The National Council of understanding was led by Waziri while Club 19 had Matthew Mbu, Solomon Lar, Omo Omoruyi, Paul Unongo, Antonio Fernandez and others as members. </p>
        </div>

        <GridImage />
      </div>
    </>
  )
}

export default AboutUs