import React, { Component } from 'react';
import { CONSTANTES } from './../commons/config/Util.js';
import Pagination from "react-js-pagination";
import { API } from 'aws-amplify';
import {CSVLink,CSVDownload} from 'react-csv';

export class SearchMail extends Component{


  constructor(props) {
    super(props);
    this.state = {
      grupos: [], estados: [],tamanio: CONSTANTES.TAMANIO_PAGINACION,
      indice: 1, activePage: 1,search: [], size: 0,
      searchExport: [],
      opcGrupo:CONSTANTES.OPC_IGUAL,
      nomGrupo:CONSTANTES.COD_GRUPO_FE,
      opcDestinatario: CONSTANTES.OPC_IGUAL,
      nomDestinatario: '',
      opcEstado: CONSTANTES.OPC_IGUAL,
      nomEstado:CONSTANTES.ESTADO_DELIVERY,
      fechaCreacionDesde: '',
      fechaCreacionHasta: ''
    };
  }

  componentDidMount(){
    this.obtenerParametros(CONSTANTES.GRUPO);
    this.obtenerParametros(CONSTANTES.ESTADO);
  }

  obtenerParametros(idTipoParam){
    fetch('https://fr7cftmyal.execute-api.us-east-1.amazonaws.com/Dev/obtparms',{
           method: 'post',
           mode: 'cors',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
            "idetippar": idTipoParam
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
      const{ search=[] } = response;
      console.log({search});

      if(idTipoParam===CONSTANTES.GRUPO){
        this.setState({ grupos:search});
      }
      else if(idTipoParam===CONSTANTES.ESTADO){
        this.setState({ estados:search});
      }

      })
      .catch(function (err) {
       console.log("error: ", err);
      })
  }

  _cleanSearch = () => {
     document.getElementById("searchForm").reset();
     this.setState({
       opcGrupo:CONSTANTES.OPC_IGUAL,
       nomGrupo:CONSTANTES.COD_GRUPO_FE,
       opcDestinatario: CONSTANTES.OPC_IGUAL,
       nomDestinatario: '',
       opcEstado: CONSTANTES.OPC_IGUAL,
       nomEstado:CONSTANTES.ESTADO_DELIVERY,
       fechaCreacionDesde: '',
       fechaCreacionHasta: ''
      });
  }

  _handleChange = (e) => {
     this.setState({ [e.target.name]: e.target.value });
  }

  _handleSubmit = (e) => {
    console.log('_handleSubmit');
    e.preventDefault();
    this.obtenerCorreos(1);
    this.obtenerCorreos(0);
  }

  handlePageChange = (pageNumber) => {
   console.log('handlePageChange active page is', {pageNumber});
   this.obtenerCorreos(pageNumber);
  }

  obtenerCorreos(pageNumber){
    console.log('indice = ', pageNumber);
    console.log('CONSTANTES.API_NAME = ', CONSTANTES.API_NAME);
    let apiName = CONSTANTES.API_NAME;
    let path = '/obtcorreos';
    let myInit = {
        body: {
         "codgrupo": {
           "opcion":this.state.opcGrupo,
           "nombre":this.state.nomGrupo
         },
         "estFinal": {
           "opcion":this.state.opcEstado,
           "nombre":this.state.nomEstado
         },
         "destinatario": {
           "opcion":this.state.opcDestinatario,
           "nombre":this.state.nomDestinatario
         },
         "fechaCreacionDesde": this.state.fechaCreacionDesde,
         "fechaCreacionHasta": this.state.fechaCreacionHasta,
         "tamanio": this.state.tamanio,
         "indice": pageNumber
       }//,
      //  headers: {'Content-Type':'application/json'}
    }

    API.post(apiName, path, myInit)
    .then((response) => {
      console.log("response: ", JSON.stringify(response));
      const{ search=[], size=0 } = response;
      //console.log("search = ",{search});
      console.log("size = ",{size});
      if(pageNumber == 0){
          console.log("searchExport " + {search});
          this.setState({ searchExport : search });

      }
      else{
        this.setState({ indice: pageNumber, activePage: pageNumber, search : search, size : size });
        this.props.onResults(search);
      }
    }).catch(error => {
        console.log(JSON.stringify(error))
    });
  }

  render(){

    return (
      <div>
      <form id="searchForm" onSubmit={this._handleSubmit} >

        <div className="field is-horizontal">
            <div className="field-label is-small">
              <label className="label">Grupo</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control is-expanded has-icons-left">
                  <div className="select is-small">
                    <select name="opcGrupo" value={this.state.opcGrupo} onChange={this._handleChange}>
                      <option value="igual">igual</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control is-expanded has-icons-left has-icons-right">
                  <div className="select is-small">
                  <select name="nomGrupo" required="required" value={this.state.nomGrupo} onChange={this._handleChange}>
                    {
                      this.state.grupos.map((grupo) => {
                        return(
                          <option key={grupo.codigo} value={grupo.codigo} >{grupo.descripcion}</option>
                        )
                      })
                    }
                  </select>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="field is-horizontal">
            <div className="field-label is-small">
              <label className="label">Destinatario</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control is-expanded has-icons-left">
                  <div className="select is-small">
                    <select name="opcDestinatario" value={this.state.opcDestinatario} onChange={this._handleChange}>
                      <option value="igual">igual</option>
                      <option value="noIgual">no igual a</option>
                      <option value="contiene">contiene</option>
                      <option value="noContiene">no contiene</option>
                      <option value="comienceCon">comience con</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control is-expanded has-icons-left has-icons-right">
                  <input onChange={this._handleChange} className="input is-small" type="email" placeholder="Destinatario" name="nomDestinatario" />
                  <span className="icon is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-small">
              <label className="label">Estado</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control is-expanded has-icons-left">
                  <div className="select is-small">
                    <select name="opcEstado" value={this.state.opcEstado} onChange={this._handleChange}>
                      <option value="igual">igual</option>
                      <option value="noIgual">no igual a</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control is-expanded has-icons-left has-icons-right">
                <div className="select is-small">
                  <select name="nomEstado" value={this.state.nomEstado} onChange={this._handleChange}>
                    {
                      this.state.estados.map((estado) => {
                        return(
                          <option key={estado.codigo}  value={estado.codigo} >{estado.descripcion}</option>
                        )
                      })
                    }
                  </select>
                </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-small">
              <label className="label">Creación</label>
            </div>
            <div className="field-body">


              <div className="field">
                <div className="control is-expanded has-icons-left has-icons-right">
                <div className="select is-small">
                  <input onChange={this._handleChange} className="input is-small" type="date" placeholder="Fecha Desde" name="fechaCreacionDesde" />
                </div>
                </div>
              </div>

              <div className="field">
                <div className="control is-expanded has-icons-left has-icons-right">
                <div className="select is-small">
                  <input onChange={this._handleChange} className="input is-small" type="date" placeholder="Fecha Hasta" name="fechaCreacionHasta" />
                </div>
                </div>
              </div>

            </div>
          </div>

          <div>
            <div className="field is-horizontal">
              <div className="field-label">
                <div className="control">
                  <button type="submit" className="button is-primary">Buscar</button>
                </div>
              </div>
              <div className="field-body">
                <div className="control">
                  <button type="button" onClick={this._cleanSearch} className="button is-primary is-inverted">Limpiar</button>
                </div>
              </div>
            </div>
          </div>
      </form>

      {
        this.state.search.length > 0
        ?
        <div>

          <CSVLink filename="correos.csv" data={this.state.searchExport}>
            <button type="button" className="button is-primary"> CSV ⬇</button>
          </CSVLink>
          
          <Pagination size="sm" aria-label="Page navigation example"
            activePage={this.state.activePage}
            itemsCountPerPage={CONSTANTES.TAMANIO_PAGINACION}
            totalItemsCount={this.state.size}
            onChange={this.handlePageChange}
          />
        </div>
        :''
      }


      </div>
    )
  }
}
