import React, { Component } from 'react';
import { History } from './History'
import { MailDetail } from './MailDetail'
import PropTypes from 'prop-types';

export class Mail extends Component{
  static propTypes = {
    objMail: PropTypes.object
  }


  render (){
    const {objMail} = this.props;
    return (
      <tr>
        <td>{objMail.grupo}</td>
        <td>{objMail.toaddress}</td>
        <td>{objMail.asunto}</td>
        <td>{objMail.fechacreacion}</td>
        <td>{objMail.estadofinal}</td>
        <td><MailDetail objMail={objMail}/></td>
        <td><History idemail={objMail.idemail}/></td>
      </tr>
    )
  }
}
