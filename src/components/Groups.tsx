import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getLogin } from '../features/loginSlice';
import {  getStats } from '../features/statSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hookStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, AreaChart, Area, Label } from 'recharts'
import { getGroupInfo } from '../features/membersSlice';


function Groups() {

  const dispatch = useAppDispatch()

  const handlerOAuthVK = () => {
    dispatch(getLogin())
  }
  
  const {data, error, isLoading} = useAppSelector((state) => state.login)
  const members = useAppSelector((state) => state.members)
  const response = useAppSelector((state) => state.stats)
  const [inputGroup, setinputGroup] = useState('')
  


  const handlerGetStatGroup = () => {
    dispatch(getStats({id:-inputGroup, offset:0, count:100}))
    dispatch(getGroupInfo({id: Number(inputGroup), offset:0, count:100}))
  }

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
        <div className='col-5 align-items-center'>
          <div className="input-group mb-2 mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">ID группы</span>
            </div>
            <input 
            onChange={e => setinputGroup(e.target.value)}
            type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
          </div>
        </div>
        <div className='col-2 d-flex align-items-center justify-content-center' >
        <div className="form-group form-check">
          <input
          type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">все группы</label>
        </div>
        </div>
      </div>
      { !response.isLoading && response.error === '' && members.error === '' ? 
      <div style={{display:'inline-block', width: '100%'}}>
        <div className="card">
          <div className="card-header text-center">
            Статистика группы {response?.groups[0]?.name ?? ' - '}
          </div>
          <div className="card-body">
            
            <h5 className="card-title">Показатели эффективности группы</h5>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">ERpost</h5>
                <h2 className="card-text">
                  {((response.result.comments+response.result.likes+response.result.reposts)/members.count*100).toFixed(2)}%
                  </h2>
              </div>
            </div>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">ERview</h5>
                <h2 className="card-text">
                  {((response.result.comments+response.result.likes+response.result.reposts)/response.result.views*100).toFixed(2)}%
                  </h2>
              </div>
            </div>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">Средний ERpost</h5>
                <h2 className="card-text">
                  {((response.result.comments+response.result.likes+response.result.reposts)/members.count/response.count*100).toFixed(2)}%
                  </h2>
              </div>
            </div>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">LR (Love Rate)</h5>
                <h2 className="card-text">
                  {(response.result.likes/123/response.items.length*100).toFixed(2)}%
                  </h2>
              </div>
            </div>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">TR (Talk Rate)</h5>
                <h2 className="card-text">
                  {(response.result.comments/123/response.items.length*100).toFixed(2)}%
                  </h2>
              </div>
            </div>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">Posts</h5>
                <h2 className="card-text">
                  {response.items.length}
                  </h2>
              </div>
            </div>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">Likes</h5>
                <h2 className="card-text">
                  {response.result.likes}
                  </h2>
              </div>
            </div>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">Comments</h5>
                <h2 className="card-text">
                  {response.result.comments}
                  </h2>
              </div>
            </div>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">Reposts</h5>
                <h2 className="card-text">
                  {response.result.reposts}
                  </h2>
              </div>
            </div>
            <div className="card d-inline-flex m-1" style={{width: "250px"}}>
              <div className="card-body">
                <h5 className="card-title">Members</h5>
                <h2 className="card-text">
                  {members.count}
                  </h2>
              </div>
            </div>
          <ul>
            <li>ERpost = (лайки+репосты+комментарии)/кол-во подписчиков</li>
            <li>ERview = (лайки+репосты+комментарии)/кол-во просмотров публикации</li>
            <li>Средний ERpost = (Сумма лайков за весь период + сумма репостов за весь период + сумма комментариев за весь период[+сумма дизлайков за весь период для YouTube])/кол-во подписчиков/кол-во публикаций за весь период</li>
            <li>ERpost = (лайки+репосты+комментарии)/кол-во подписчиков</li>
            <li>ERpost = (лайки+репосты+комментарии)/кол-во подписчиков</li>

          </ul>
          
          </div>
          <div className="card-footer text-muted">
          <p> Engagement Rate - коэффициент вовлеченности пользователей в публикуемый контент (посты). Иными словами, отображает процент пользователей, которые проявляли активность у публикаций.</p>
          </div>
        </div>
      
        <AreaChart
          width={1000}
          height={500}
          data={response.items.map((item) => {
            return {
              дата: new Intl.DateTimeFormat('ru',{month:'long'}).format(item.date*1000),
              просмотры: item.views.count ?? 0
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
          <Area type="monotone" dataKey="просмотры" stroke="#82ca9d" fillOpacity={1} fill="url(#colorUv)"/>
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