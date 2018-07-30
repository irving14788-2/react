import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalMail } from './Modal'
import { Panel, PanelGroup } from 'react-bootstrap';
import '../style/css/bulma-accordion.min.css';
import '../style/bulma-accordion.js';

export class History extends Component{

  static propTypes = {
    idemail: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = { results: [], isOpen: false};
  }

  toggleModal = () =>{
    this.setState({
      isOpen:!this.state.isOpen
    })
    console.log("estado open = ",this.state.isOpen);
  }

  _renderResults(){
    return this.state.results.length === 0
    ? <p>Sin Resultados</p>
    :
    this.state.results.map((result) => {
      return (
        <article className="accordion" key={result.idemailtrack}>
          <div className="accordion-header">
            <p>{result.estado + "--" +result.fechanotif}</p>
            <button className="toggle" aria-label="toggle"></button>
          </div>
          <div className="accordion-body">
            <div className="accordion-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
            </div>
          </div>
        </article>

      )
    })

  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const {idemail} = this.props;
    fetch('https://fr7cftmyal.execute-api.us-east-1.amazonaws.com/Dev/obtdetallecorreo',{
           method: 'post',
           mode: 'cors',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
            "idemail": "1" //{idemail}
          })
          })
      .then((response) => {
        if (response.status !== 200) {
           console.log("status: ", response.status);
         }
         else {
           return response.json();
         }
      })
      .then((response) => {
      console.log("response: ", response);
      const{ search=[] } = response;
      console.log("data encontrada = ",{search});
      this.setState({ results:search});
      this.toggleModal();
      })
      .catch(function (err) {
       console.log("error: ", err);
      })
  }

  render(){
    return (
      <div>
        <div>
        <button onClick={this._handleSubmit}>Historial</button>
        </div>
        <ModalMail
            onClose={this.toggleModal}
            show={this.state.isOpen}
            title="Historial"
          >

          <section className="accordions">

          {
              this._renderResults()
          }

          </section>
          </ModalMail>
      </div>
    )
  }

}
