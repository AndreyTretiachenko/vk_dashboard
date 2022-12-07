import React, { useEffect } from 'react'
import { VKget, VKgetStatus } from '../hooks/VKget';

function Groups() {
  const user = VKget()
  const key = 'vk1.a.35k7vdnZtgzEwhGvjq_Ansf9CZcMGaFemThU7MtcwnENFl5FT_FBG2k57dZpdLpaG-vyukFB7KRS3f88w-KfnDrmbZBBgj7pL392-DOKnFH_4KjHQuIthtqUkDib6lUoH624fOzRDF_i97Cy2No4-v6Gv2q3N_5uxDxyh2la_4p7FGGMqFXh4yPMegpEyJ7SCY5mpDgn61gUyB8IFSL2Mw'

  useEffect(() => {
    fetch('/method/users.get?'+
    new URLSearchParams({
      access_token:key,
      user_id:'478583',
      v:'5.86'

    })
    ).then(res => res.json()).then(result => {
      console.log(result)
    })
    VKgetStatus().then(data => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  },[])
  
  return (
    <div>
      <span>{user}</span>
      <span></span>
    </div>
  )
}

export default Groups