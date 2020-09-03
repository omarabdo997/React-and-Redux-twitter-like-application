import {getInitialData} from '../utils/api'
import {recieveTweets} from './tweets'
import {recieveUsers} from './users'
import {setAuthedUser} from './authedUser'
import {showLoading, hideLoading} from 'react-redux-loading'

const AUTH_ID = 'tylermcginnis'
export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        getInitialData()
            .then(({tweets, users}) => {
                dispatch(recieveUsers(users))
                dispatch(recieveTweets(tweets))
                dispatch(setAuthedUser(AUTH_ID))
                dispatch(hideLoading())
            })
    }

}