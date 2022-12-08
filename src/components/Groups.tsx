import React, { useEffect } from 'react'
import { getLogin } from '../features/loginSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hookStore';
import { VKget, VKgetStatus } from '../hooks/VKget';

function Groups() {

  const dispatch = useAppDispatch()

  const handlerOAuthVK = () => {
    dispatch(getLogin())
  }
  
  useEffect(() => {
    console.log(
      VKget().then((res) => res)
    )
  },[dispatch])

  const {data, error, isLoading} = useAppSelector((state) => state.login)

  return (
    <div>
      <button
        onClick={handlerOAuthVK}
      >Войти</button>
    </div>
  )
}

export default Groups