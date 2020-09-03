import React, { Component, Fragment } from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import ConnectedDashBoared from './DashBoared'
import LoadingBar from 'react-redux-loading'
import ConnectedNewTweet from './NewTweet'
import ConnectedTweetPage from './TweetPage'
import Nav from './Nav'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Fragment>
      <LoadingBar />
        <div className='container'>
          
          <Nav />
          {
            this.props.loading === null? 
            null: <div>
              
              <Route path="/" exact>
                <ConnectedDashBoared />
              </Route>
              <Route path="/new" >
                <ConnectedNewTweet />
              </Route>
              <Route path="/tweet/:id" component={ConnectedTweetPage}/>
            </div>
          }
        </div>  
      </Fragment>
    )
  }
}
export default connect (({authedUser}) => ({
  loading: authedUser
}))(App)

