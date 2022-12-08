import React, { useEffect } from 'react'
import { getLogin } from '../features/loginSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hookStore';
import { VKget, VKgetStatus } from '../hooks/VKget';

function Groups() {

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(getLogin)
    console.log(data)
    console.log(
      VKget().then((res) => res)
    )
  },[dispatch])

  const {data, error, isLoading} = useAppSelector((state) => state.login)

  return (
    <div>
      <span></span>
    </div>
  )
}

export default Groups