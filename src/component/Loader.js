import React from 'react'
import LoadingGif from '../images/loading.gif'

const Loader = () => {
  return (
    <div className='loader'>
        <div className='loader_img'>
            <img src={LoadingGif} alt="Loader" />
        </div>
    </div>
  )
}

export default Loader