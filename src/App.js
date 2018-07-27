import React, { Component } from 'react';
import Routes from './Routes';
import { Auth } from 'aws-amplify';

import './App.css';
import 'bulma/css/bulma.css'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
		};
	}

  async componentDidMount() {
		try {
			if (await Auth.currentSession()) {
				this.userHasAuthenticated(true);
			}
		} catch (e) {
			if (e !== 'No current user') {
				alert(e);
			}
		}

		this.setState({ isAuthenticating: false });
	}

  userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	};

  handleLogout = async event => {
		await Auth.signOut();

		this.userHasAuthenticated(false);
		this.props.history.push('/login');
	};


  render() {
    const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};
    return (
      <div className='App'>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
