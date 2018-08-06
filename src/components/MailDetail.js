import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalMail } from './Modal';
import { Icon } from 'react-icons-kit'
import {documentIcon} from 'react-icons-kit/ikons/documentIcon'
var HtmlToReactParser = require('html-to-react').Parser;

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

    var datosGrupo = JSON.parse(objMail.datosgrupo).map((grupo) =>{
      return(
        <div key={grupo.campo}>
          <p>{grupo.descripcion} : {grupo.valor}</p>

        </div>
      )
    })

    var htmlInput = objMail.cuerpohtml;
    var htmlToReactParser = new HtmlToReactParser();
    var reactElement = htmlToReactParser.parse(htmlInput);
    var adjuntos = JSON.parse(objMail.adjunto).map((adj)=>{
        return (
          <div key={adj.filename}>
            <a href={adj.href} target="_blank">{adj.filename}</a>
            <br />
          </div>
        )
    })
    console.log("adjuntos procesados = ",adjuntos);

    return (
      <div>
          <p>Detalle</p>
          <div>
            {reactElement}
          </div>
          <br />
          <table>
            <thead>
              <tr>
                <th>Campo</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              <tr key="1">
                <td>Adjuntos</td>
                <td>
                    {adjuntos}
                </td>
              </tr>
              <tr key="2">
                <td>Grupo</td>
                <td>{datosGrupo}</td>
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
        <Icon icon={documentIcon} size={32} onClick={this._handleSubmit}/>
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
