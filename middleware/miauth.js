export default ({ app, redirect }) => {
    const cookieRes = app.$cookies.get('r_auth')
    if(cookieRes){
        app.$axios.setToken(cookieRes, 'Bearer')
        app.$axios.$get("getSession")
       .then((response) => {   
           console.log("si hay")
       })
       .catch(({ response }) => {
           console.log("token invalido")
           return redirect('/')
         })
    }else{
        return redirect('/')
    }
   
  }