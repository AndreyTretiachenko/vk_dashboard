
export const VKget = () => {
    
     return new Promise((resolve, redject) => {
      //eslint-disable-next-line no-undef
      VK.Api.call('groups.getById', {group_id: '173281049', v:"5.86"}, (res) => (
        resolve(res)
      ))
     })
    
}

export const VKgetStatus = () => {
      return new Promise ((resolve, reject) => {
      //eslint-disable-next-line no-undef
        VK.Auth.getLoginStatus((res) => {
          switch (res.status) {
            case 'connected':
              resolve(res.session)
              break
            case 'not_authorized':
              reject('error - user dont autorisation')
              break
            case 'unknown':
              resolve(false)
              break
            default: return 
          }
          
        }
      )})
    }
        
      
      


