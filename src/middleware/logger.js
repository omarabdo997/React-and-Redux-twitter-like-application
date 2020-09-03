const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action', action)
        const next_ = next(action)
        console.log('The new state', store.getState())
    console.groupEnd()
    return next_

}
export default logger