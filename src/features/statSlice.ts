import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TstatsGroup } from '../models/stats'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const request = (settings) => { return new Promise ((resolve, reject) => {
  // @ts-ignore
  VK.Api.call('wall.get', {
    extended:1,
    owner_id: settings.id,
    offset: settings.offset,
    count:settings.count,
    v:'5.86'
  }, (res) => {
    resolve(res.response)
  }
)})}

export const getStats = createAsyncThunk(
    'vk/getStats',
    async (settings:{
      id:number, 
      offset:number, 
      count:number,
      dateStart:string,
      dateEnd:string,
    
    }, thunkApi) => {
        try {
          let statsAll = {
            count:0,
            items:[],
            groups:[],
           }
          const settingsReq = await request(settings).then((res:any) => {
            return {
              countOffset:Math.trunc(res.count/100),
              other:res.count%100,
              groups:res.groups
            }
          })

          console.log(settingsReq)
          statsAll = {...statsAll,
            groups: settingsReq.groups
            }
          for (let i=0; i <= settingsReq.countOffset; i++) {
            settings.offset=i*100
           
              await request(settings).then((res:any) => {
              statsAll = {...statsAll,
                count: statsAll.count + res.count,
                items: [...statsAll.items, ...res.items]
                
              }
            }).then(() => sleep(1000))

          }
            if (settings.dateEnd && settings.dateStart) {
              const dateEnd = new Date(Number(settings.dateEnd.split('-')[0]), Number(settings.dateEnd.split('-')[1])-1, Number(settings.dateEnd.split('-')[2])).getTime()/1000
              const dateStart = new Date(Number(settings.dateStart.split('-')[0]), Number(settings.dateStart.split('-')[1])-1, Number(settings.dateStart.split('-')[2])).getTime()/1000
              const result = statsAll.items.filter((item:any) => {
                return item.date <= dateEnd && item.date >= dateStart
              })
              statsAll.items = result
            }
            console.log(statsAll)
            return statsAll
        } catch (error:any)
        {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)


const initialState:TstatsGroup  = {
 count:0,
 items:[],
 error:'',
 isLoading: false,
 result:{
  likes:0,
  comments:0,
  views:0,
  reposts:0
 },
 groups:[],
}

export const statSlice = createSlice({
    name:'Stat',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(getStats.pending, (state, action) => {
          state.isLoading = true
        })
        .addCase(getStats.fulfilled, (state, action:PayloadAction<any>) => {
          state.isLoading = false
          state.items = action.payload.items
          state.count = action.payload.count
          state.groups = action.payload.groups
          let like = 0 
          action.payload.items.map((item:any) => {
            return like += item.likes.count 
          })
          state.result.likes = like
          let views = 0 
          action.payload.items.map((item:any) => {
            if (item.views)
              return views += item.views.count 
          })
          state.result.views = views
          let comments = 0 
          action.payload.items.map((item:any) => {
            return comments += item.comments.count 
          })
          state.result.comments = comments
          let reposts = 0 
          action.payload.items.map((item:any) => {
            return reposts += item.reposts.count 
          })
          state.result.reposts = reposts
        })
        .addCase(getStats.rejected, (state, action) => {
          state.error = 'error get statsGroup'  
        })
   
    }
})

export const {} = statSlice.actions
export default statSlice.reducer