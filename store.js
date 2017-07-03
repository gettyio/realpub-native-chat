import {createStore} from 'dutier'
import reducer from './reducers'

export const store = createStore(reducer)