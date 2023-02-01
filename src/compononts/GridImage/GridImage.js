import React from 'react'
//
import img1 from '../../assets/grid/img1.png'
import img2 from '../../assets/grid/img2.png'
import img3 from '../../assets/grid/img3.png'
import img4 from '../../assets/grid/img4.png'
import img5 from '../../assets/grid/img5.png'
import img6 from '../../assets/grid/img6.png'
import img7 from '../../assets/grid/img7.png'
import img8 from '../../assets/grid/img8.png'
import img9 from '../../assets/grid/img9.png'
import img10 from '../../assets/grid/img10.png'


const GridImage = () => {

  // array of images
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10
  ]

  return (
    <div className='__thegrid' >
        <div class="container">
          {images.map((image, index) => (<img key={index} src={image} alt="" />))}
        </div>
    </div>
  )
}

export default GridImage