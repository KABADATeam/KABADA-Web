import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './appStore/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'antd/dist/antd.css';
import Cookies from 'js-cookie'


const user_access_token_from_storage = Cookies.get('access_token') ? Cookies.get('access_token') : null;
// localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const user_email_from_storage = Cookies.get('email') ? Cookies.get('email') : null;
const user_name_from_storage = Cookies.get('name') ? Cookies.get('name') : null;

const initialState = {
    user: {access_token: user_access_token_from_storage,email: user_email_from_storage,name: user_name_from_storage}
}
export const store = createStore(reducers,initialState, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
