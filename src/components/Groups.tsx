import React, { useEffect } from 'react'
import { VKget } from '../hooks/VKget';

function Groups() {
  const user = VKget()

  
  return (
    <div>
      <span>{user}</span>
    </div>
  )
}

export default Groups