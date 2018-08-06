import React, { Component } from 'react';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import imgLogin from '../images/logo.png';
import { LOGIN_VALIDATION_MESSAGE,LOGIN_TITLE_MESSAGE } from '../commons/config/Util.js';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			email: '',
			password: ''
		};
	}

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();
		this.setState({ isLoading: true });

		try {
			await Auth.signIn(this.state.email, this.state.password);
			this.props.userHasAuthenticated(true);
			this.props.history.push('/home');
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
	};

	render() {
		return (


			<section className="hero is-light is-fullheight">
        <div className="hero-body">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title has-text-grey">Login</h3>
                    <p className="subtitle has-text-grey">{LOGIN_TITLE_MESSAGE.SUBTITLE}</p>
                    <div className="box">
                        <figure className="avatar">
                            <img src={imgLogin} alt="logo" />
                        </figure>
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <div className="control">
                                    <input className="input is-large" type="text" id="email"
																		placeholder="tu usuario" autoFocus=""
																		onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <input className="input is-large" id="password"
																		onChange={this.handleChange}
																		type="password"
																		placeholder="Tu Contraseña" />
                                </div>
                            </div>

														<LoaderButton
														  className="button is-block is-info is-large is-fullwidth"
															block
															bsSize="large"
															disabled={!this.validateForm()}
															type="submit"
															isLoading={this.state.isLoading}
															text="Login"
															loadingText="Logging in…"/>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </section>


		);
	}
}
