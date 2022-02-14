import { createStore } from "redux"
import universalReducer, { createActions } from "universal-reducer"

const store = createStore(universalReducer, {}, global.__REDUX_DEVTOOLS_EXTENSION__?.())

export const actions = createActions(store)
export default store