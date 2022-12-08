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
  const response = useAppSelector((state) => state.stats)

  useEffect(() => {

    dispatch(getLogin())

  },[])


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
      { !response.isLoading ? 
      <div style={{display:'inline-block', width: '100%'}}>
          {response.response.map((item) => (
            <div className="card m-2" style={{display:'inline-block', width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
          ))}
      </div>
      :
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      }
    </>
  )
}

export default Groups