import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ConnectedApp from './components/App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducers from './reducers'
import middleWare from './middleware'
import {BrowserRouter} from 'react-router-dom'

const store = createStore(reducers, middleWare)

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ConnectedApp />
        </Provider>
    </BrowserRouter>,   
    document.getElementById('root')
)