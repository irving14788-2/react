import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalMail } from './Modal';

//import Frame from 'react-frame-component';

export class MailDetail extends Component{

  static propTypes = {
    objMail: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
  }

  toggleModal = () =>{
    this.setState({
      isOpen:!this.state.isOpen
    })
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.toggleModal();
  }

  _renderResults(){
    const {objMail} = this.props;
    return (
      <div className="content">
          <p>Detalle</p>

          <p>Detalle</p>
          <table>
            <thead>
              <tr>
                <th>Grupo</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              <tr key="1">
                <td>Código grupo</td>
                <td>{objMail.codgrupo}</td>
              </tr>
              <tr key="2">
                <td>Grupo</td>
                <td>{JSON.stringify(objMail.datosgrupo)}</td>
              </tr>
              <tr key="3">
                <td>Asunto</td>
                <td>{objMail.asunto}</td>
              </tr>
              <tr key="4">
                <td>Estado final</td>
                <td>{objMail.estadofinal}</td>
              </tr>
              <tr key="5">
                <td>Asunto</td>
                <td>{objMail.asunto}</td>
              </tr>
              <tr key="6">
                <td>Id del mensaje</td>
                <td>{objMail.messageId}</td>
              </tr>
              <tr key="7">
                <td>Fecha creación</td>
                <td>{objMail.fechacreacion}</td>
              </tr>
              <tr key="8">
                <td>Fecha actualización</td>
                <td>{objMail.fechaact}</td>
              </tr>
              <tr key="9">
                  <td>Emisor</td>
                  <td>{objMail.fromaddress}</td>
                </tr>
              <tr key="10">
                  <td>Receptor</td>
                  <td>{objMail.toaddress}</td>
              </tr>
              <tr key="11">
                  <td>Copia</td>
                  <td>{objMail.ccaddress}</td>
              </tr>
              <tr key="12">
                  <td>Oculto</td>
                  <td>{objMail.bccaddress}</td>
              </tr>
            </tbody>
          </table>
          </div>
    )
  }

  render(){
    const {objMail} = this.props;
    return (
      <div>
        <div>
        <button onClick={this._handleSubmit}>Detalle</button>
        </div>
        <ModalMail
            onClose={this.toggleModal}
            show={this.state.isOpen}
            title={objMail.toaddress}
          >
          {
              this._renderResults()
          }
          </ModalMail>
      </div>
    )
  }

}
