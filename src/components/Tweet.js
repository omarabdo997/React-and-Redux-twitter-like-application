import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatTweet, formatDate} from '../utils/helpers'
import { TiArrowBackOutline } from 'react-icons/ti/index'
import { TiHeartOutline } from 'react-icons/ti/index'
import { TiHeartFullOutline } from 'react-icons/ti/index'
import { handleToggleTweet } from '../actions/tweets'
import {Link, withRouter} from 'react-router-dom'

class Tweet extends Component {
    toParent = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/tweet/${id}`)
    }
    handleLike = (e) => {
        const {dispatch, authedUser, tweet} = this.props
        e.preventDefault()
        dispatch(handleToggleTweet({
            id: tweet.id,
            authedUser,
            hasLiked: tweet.hasLiked,
        }))
    }
    render () {
        const {tweet} = this.props
        console.log(this.props)
        if (tweet === null){
            return <p>This Tweet doesn't exist</p>
        }
        const {name, avatar, timestamp, text, hasLiked, likes, replies, id, parent} = tweet
        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img
                    src={avatar}
                    alt={`avatar of ${name}`}
                    className='avatar'
                />
                <div className = 'tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !==0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {
                                hasLiked === true ?
                                <TiHeartFullOutline color='#e0245e' className='tweet-icon'/> :
                                <TiHeartOutline className='tweet-icon'/>
                            }
                        </button>
                        <span>{likes !==0 && likes}</span>
                    </div>      
                </div>
            </Link>
            
        )
    }
}


export default withRouter(connect (({authedUser, tweets, users}, {id}) => {
    const tweet = tweets[id]
    const parentTweet = tweet? tweets[tweet.replyingTo] : null
    return {
        authedUser,
        tweet: tweet? 
            formatTweet(tweet, users[tweet.author], authedUser, parentTweet):null
    }
})(Tweet))