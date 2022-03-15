import com from './state/com'
import combineReducers from './combineReducers'
const { Provider, useRedux } = combineReducers({ com })

export { Provider, useRedux }
