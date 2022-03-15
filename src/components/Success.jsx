import React from 'react'
import './success.scss'

const Success = () => {
  return (
    <div className='wrapper'>
      <div class="container">
        <div class="action">
          <div class="trophy">
            <svg fill="green" width="100%" height="100%" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
            </svg>
          </div>
          <div class="line"></div>
          <div class="line two"></div>
          <div class="line three"></div>
          <div class="line four"></div>
          <div class="line-aqua"></div>
          <div class="line-aqua two"></div>
          <div class="line-aqua three"></div>
          <div class="line-aqua four"></div>
        </div>
      </div>
    </div>
  )
}

export default Success