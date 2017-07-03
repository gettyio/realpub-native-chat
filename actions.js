function addUserActive ( payload ) {
  return dispatch => dispatch({ type: 'ADD_ACTIVE_USER', payload })
}

function removeUserInactive ( payload ) {
  return dispatch => dispatch({ type: 'REMOVE_INACTIVE_USER', payload })
}

export { addUserActive, removeUserInactive }