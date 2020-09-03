import React, {Component} from 'react'
import {connect} from 'react-redux'
import ConnectedTweet from './Tweet'
import ConnectedNewTweet from './NewTweet'

class TweetPage extends Component {
    render() {
        const {id, replies} = this.props
        return (
            <div>
                <ConnectedTweet id={id} />
                <ConnectedNewTweet id={id}/>
                {replies.length !==0 && <h3 className='center'>Replies</h3>}
                <ul>
                    {replies.map((replyId) => (
                        <li key={replyId}>
                            <ConnectedTweet id={replyId} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({authedUser, tweets, users}, props) => {
    const {id} = props.match.params
    return {
        id,
        replies: !tweets[id] ? []:tweets[id].replies.sort((a,b) => 
            tweets[b].timestamp - tweets[a].timestamp)
    }

}
export default connect(mapStateToProps)(TweetPage)