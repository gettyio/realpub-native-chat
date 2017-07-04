const initialState = { activeUsers: [] }

export default ( state=initialState, { type, value }) => {
  switch (type) { 
    case 'CHANGE_REALPUB_STATUS':
      return { realpubStatus: value }
    case 'ADD_ACTIVE_USER':
      const activeUsers = [].concat(state.activeUsers)
      activeUsers.push(value)
      return { activeUsers }
    case 'REMOVE_INACTIVE_USER':
      const usersActive = [].concat(state.activeUsers)
      usersActive.forEach( (id, i) => {
        if ( id === value ) {
          usersActive.splice(id, index)
        }
      })
    return { activeUsers: usersActive }
    default:
      return state
  }
}