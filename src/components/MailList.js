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
            <table className="table">
            <thead>
              <tr>
                <th>Cod. Grupo</th>
                <th>Destinatario</th>
                <th>Asunto</th>
                <th>Creación</th>
                <th>Estado Final</th>
                <th></th>
                <th></th>
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
