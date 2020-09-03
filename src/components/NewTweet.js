import React, {Component} from 'react'
import {handleAddTweet} from '../actions/tweets'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class NewTweet extends Component {
    state = {
        text: '',
        home: false
    }
    handleChange = (e) => {
        const text = e.target.value
        this.setState((currentState) => ({
            text
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {text} = this.state
        const {dispatch, id} = this.props
        console.log('new tweet', text)
        dispatch (handleAddTweet(text, id))
        this.setState(() => ({
            text: '',
            home: id ? false:true,
        }))
    }
    render() {
        if(this.state.home){
            return <Redirect to='/'/>
        }
        const {text} = this.state
        const tweetleft = 280 - text.length
        return (
            <div>
                <h3 className='center'>Compose new Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea 
                        value={text} 
                        placeholder="What's happening?"
                        onChange={this.handleChange}
                        className='textarea'
                        maxLength={280}

                    />
                    {tweetleft <= 100 && (
                        <div className='tweet-length'>
                            {tweetleft}
                        </div>
                    )}
                    <button
                        className='btn'
                        type='submit'
                        disabled={text === ''}
                    >Submit</button>
                </form>
            </div>
        )
    }
}
export default connect ()(NewTweet)