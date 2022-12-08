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
  
  const {data, error, isLoading} = useAppSelector((state) => state.login)
  const response = useAppSelector((state) => state.stats.response)

  return (
    <>
      <div>
        <button
          onClick={handlerOAuthVK}
        >
          Войти
        </button>
        <button
          onClick={handlerGetStatGroup}
        >
          Загрузить статистику
        </button>
      </div>
      <div>
        <ul>
          {response.map((item) => (
           <li key={item.period_from}>{`Дата: ${ new Date(item.period_from * 1000)} Комментариев:${item.activity.likes}`}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Groups