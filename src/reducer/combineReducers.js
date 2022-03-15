import React, { useContext, useReducer } from 'react'
function combineReducers(stMap) {
  const initState = {
    state: {},
    dispatch: () => {},
  }
  for (let key in stMap) {
    initState.state[key] = stMap[key](undefined, {})
  }
  const ReduxContext = React.createContext(initState)

  const reducer = (state, action) => {
    const data = state[action.dataType]
    const comState = stMap[action.dataType](data, action)
    return {
      ...state,
      [action.dataType]: comState,
    }
  }
  const useRedux = (dataType) => {
    const { state, dispatch } = useContext(ReduxContext)

    return [
      state[dataType],
      (action) => {
        dispatch({
          dataType,
          ...action,
        })
      },
    ]
  }
  function Provider(props) {
    const [state, dispatch] = useReducer(reducer, initState.state)

    return (
      <ReduxContext.Provider value={{ state, dispatch }}>
        {props.children}
      </ReduxContext.Provider>
    )
  }
  return {
    useRedux,
    Provider,
  }
}

export default combineReducers
