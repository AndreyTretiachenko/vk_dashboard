import React, { useEffect } from 'react'
import { getLogin } from '../features/loginSlice';
import { getStats } from '../features/statSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hookStore';
import { VKget, VKgetStatus } from '../hooks/VKget';

function Groups() {

  const dispatch = useAppDispatch()

  const handlerOAuthVK = () => {
    dispatch(getLogin())
  }

  const handlerGetStatGroup = () => {
    dispatch(getStats())
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
            <button
        onClick={handlerGetStatGroup}
      >Загрузить статистику</button>
    </div>
  )
}

export default Groups