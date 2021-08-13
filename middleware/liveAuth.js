export default ({ app, redirect, route }) => {
    console.log("estoy en el liveauth")
    const cookieRes = app.$cookies.get('r_auth')
    var status = 0
    if(cookieRes){
        app.$axios.setToken(cookieRes, 'Bearer')
        app.$axios.$get("getSessionAndCodLive?cod="+route.params.cod)
       .then((response) => { 
           console.log("response del liveauth", response)
           if(response.status == 1){
            console.log("si hay")
           }  
           if(response.status == 2){
            console.log("codigo esta disabled x lo tanto redirect to dashboard")
            redirect('/dashboard')
           }  
           
       })
       .catch(({ response }) => {
           console.log("error respoonse", response)
           console.log("token invalido")
           redirect('/')
         })
    }else{
        redirect('/')
    }
   
  }