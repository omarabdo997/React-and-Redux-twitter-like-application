import React, {Component} from 'react'
import {connect} from 'react-redux'
import ConnectedTweet from './Tweet'

class DashBoared extends Component{

    render() {
        console.log(this.props)
        console.log(this.props.tweetsIDs)
        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
                <ul className='dashboard-list'>
                    {this.props.tweetsIDs.map(id => (
                        <li key={id}>
                            <ConnectedTweet id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default connect(({tweets}) => ({
    tweetsIDs: Object.keys(tweets).sort((a,b) => (
        tweets[b].timestamp - tweets[a].timestamp
    ))
}))(DashBoared)