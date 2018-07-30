import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import Amplify from "aws-amplify";
import config from "./commons/config/AWSConfig";
import { CONSTANTES } from './commons/config/Util.js';
import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID
	},
	API: {
		endpoints: [
			{
				name: CONSTANTES.API_NAME,
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION
			}
		]
	}
});

ReactDOM.render(
<BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
