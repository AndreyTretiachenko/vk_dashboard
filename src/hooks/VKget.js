
export const VKget = () => {
    //eslint-disable-next-line no-undef
    return VK.Api.call('users.get', {user_ids: 478583, v:"5.86"}, function(r) {
        if(r.response) {
          console.log(r.response);
        }
      });
}