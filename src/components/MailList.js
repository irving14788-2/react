import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mail } from './Mail';

export class MailList extends Component{

  static propTypes = {
    mails : PropTypes.array
  }
  render(){
    const { mails } = this.props;

    return (
        <div>
            <table className="table is-responsive">
            <thead>
              <tr>
                <th scope="col">Cod. Grupo</th>
                <th scope="col">Destinatario</th>
                <th scope="col">Asunto</th>
                <th scope="col">Creación</th>
                <th scope="col">Estado Final</th>
                <th scope="col">Detalle</th>
                <th scope="col">Historial</th>
              </tr>
            </thead>
            <tbody>
            {
              mails.map((mail) => {
                return (
                    <Mail key={mail.idemail}
                    objMail={mail}
                    />
                )
              })
            }
            </tbody>
            </table>
        </div>
    );
  }

}
