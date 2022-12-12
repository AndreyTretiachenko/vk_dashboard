import React, { useEffect } from 'react'
import { getLogin } from '../features/loginSlice';
import { getStats } from '../features/statSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hookStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, AreaChart, Area, Label } from 'recharts'

function Groups() {

  const dispatch = useAppDispatch()

  const handlerOAuthVK = () => {
    dispatch(getLogin())
  }

  const handlerGetStatGroup = () => {
    dispatch(getStats({id:-196618209, offset:0}))
  }
  
  const {data, error, isLoading} = useAppSelector((state) => state.login)
  const response = useAppSelector((state) => state.stats)

  useEffect(() => {

    // dispatch(getLogin())

  },[])


  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col-3 d-flex align-items-center'>
        <button
          className='btn btn-sm btn-primary m-2'
          onClick={handlerOAuthVK}
        >
          Войти
        </button>
        <button
          className='btn btn-sm btn-primary m-2'
          onClick={handlerGetStatGroup}
        >
          Загрузить статистику
        </button>
        </div>
        <div className='col-3 align-items-center'>
        <select
          className='form-control m-2'
          // style={{width:300}}
        >
          <option>Группа 1</option>
          <option>Группа 2</option>
        </select>
        </div>
        <div className='col-2 d-flex align-items-center justify-content-center' >
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">все группы</label>
        </div>
        </div>
      </div>
      { !response.isLoading ? 
      <div style={{display:'inline-block', width: '100%'}}>
          {response.response.map((item) => (
            <div className="card m-2" style={{display:'inline-block', width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">Статистика за {new Intl.DateTimeFormat("ru").format(item.period_from*1000)}</h5>
              <h6 className="card-subtitle mb-2 text-muted">просмотры {item.visitors.views}, посетители {item.visitors.visitors}</h6>
              <p className="card-text">
                <ul>
                  <li>
                    <span>Позитивные</span>
                    <ul>
                      <li>Охват: {item.reach.reach ?? 'нет'}</li>
                      <li>Подписчики: {item.activity.subscribed  ?? 'нет'}</li>
                      <li>Лайки: {item.activity.likes  ?? 'нет'}</li>
                      <li>Комментарии: {item.activity.comments  ?? 'нет'}</li>
                      <li>Репосты: {item.activity.copies  ?? 'нет'}</li>
                    </ul>
                  </li>
                  <li>
                    <span>Негативные</span>
                    <ul>
                      <li>Отписка: {item.activity.unsubscribed  ?? 'нет'}</li>
                      <li>Скрытия из ленты: {item.activity.hidden  ?? 'нет'}</li>
                    </ul>
                  </li>
                </ul>
              </p>
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
          
          ))}
      
        <AreaChart
          width={800}
          height={500}
          data={response.response.map((item) => {
            return {
              дата: new Intl.DateTimeFormat('ru').format(item.period_from*1000),
              охват: item.activity.likes?? 0
            }
          }

          )}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        
        <CartesianGrid strokeDasharray="3 3" />
          <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="50%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="дата" />
          <YAxis />
          <Tooltip/>
          
          <Legend />
          <Area type="monotone" dataKey="охват" stroke="#82ca9d" fillOpacity={1} fill="url(#colorUv)"/>
        </AreaChart>   
        
      </div>
      :
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      }
    </div>  
    </>
  )
}

export default Groups