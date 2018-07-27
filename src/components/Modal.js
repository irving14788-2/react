import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ModalMail extends Component{

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    children: PropTypes.node
  }

  render(){
    const {onClose,show,title,children} = this.props;
    console.log("entro con el show = ", {show} );
    if(!show) {
      return null;
    }

    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={onClose} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={onClose} />
          </header>
          <section className="modal-card-body">
            <div className="content">
              {children}
            </div>
          </section>
          <footer className="modal-card-foot">
            <a className="button" onClick={onClose}>Cancel</a>
          </footer>
        </div>
      </div>

    )
  }
}
