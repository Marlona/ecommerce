import { combineReducers } from 'redux'
import userReducers from './user.reducer'

export default combineReducers({
    user: userReducers
})