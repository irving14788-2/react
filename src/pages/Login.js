import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import imgLogin from '../images/logo.png';
import '../style/css/Login.css';
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
			<div id="wrapper">
					<section className="login">
						<div className="content-header">
									<img src={imgLogin} alt="logo" />
									<span className="subtitle">{LOGIN_TITLE_MESSAGE.SUBTITLE}</span>
						</div>
						<div className="c-form-login">
						<h2>{LOGIN_TITLE_MESSAGE.TITLE}</h2>
							<form onSubmit={this.handleSubmit}>

								<FormGroup controlId="email" bsSize="large">
									<ControlLabel>Email</ControlLabel>
									<FormControl autoFocus type="text"
									value={this.state.email}
									onChange={this.handleChange}
									/>
								</FormGroup>
								<FormGroup controlId="password" bsSize="large">
									<ControlLabel>Password</ControlLabel>
									<FormControl value={this.state.password} onChange={this.handleChange} type="password" />
								</FormGroup>

								<div className="btn-content">
										<div className="btn-continuar">
											<LoaderButton
												block
												bsSize="large"
												disabled={!this.validateForm()}
												type="submit"
												isLoading={this.state.isLoading}
												text="Login"
												loadingText="Logging in…"/>
										</div>
									</div>

							</form>
						</div>
					</section>
			</div>


		);
	}
}
