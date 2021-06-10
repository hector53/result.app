export default ({ app, redirect }) => {
    const cookieRes = app.$cookies.get('r_auth')
    app.$axios.setToken(cookieRes, 'Bearer')
     app.$axios.$get("getSession")
    .then((response) => {
        console.log("si hay")
    })
    .catch(({ response }) => {
        return redirect('/')
      })
  }