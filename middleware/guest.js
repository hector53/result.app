export default ({ store, redirect }) => {
    if(store.state.login){
        return redirect('/dashboard')
    }
  }