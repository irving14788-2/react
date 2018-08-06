import React, { Component } from 'react';
import { SearchMail } from '../components/SearchMail';
import { MailList } from '../components/MailList';
import { Link } from 'react-router-dom';

export class Home extends Component {
  constructor(props) {
		super(props);

		this.state = {
      usedSearch:false,
      results: []
		};
	}

  _handleResults = (results) => {
    this.setState({ results,usedSearch:true })
  }

  _renderResults(){
    return this.state.results.length === 0
    ? <p>Sin Resultados</p>
    : <div><br /><MailList mails={this.state.results}/></div>

  }

  _renderNoAuth(){
    return (
			<div className="lander">
				<h1>No Autorizado</h1>
        <Link
         className="button is-primary"
         to='/login'>
            Login
        </Link>
			</div>
		);
  }

  _renderAuth(){
    return (
      <div className="full-screen">

        <br />
        <div className="SearchMail-wrapper">
          <SearchMail onResults={this._handleResults}/>
        </div>
        {
          this.state.usedSearch
          ?this._renderResults()
          :<small>Use el formulario para buscar evidencia de correos.</small>
        }
      </div>
    );
  }

  render() {
    return <div>{this.props.isAuthenticated ? this._renderAuth() : this._renderNoAuth()}</div>;

  }

}
