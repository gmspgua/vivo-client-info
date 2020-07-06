import React, { Component, Alert } from 'react';
import '@firebase/auth';
import Template from '../../componentes/template/template';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import "./Contato.css";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { StickyHeadTable } from '../../componentes/table/StickyHeadTable';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SimpleModal from '../../componentes/modal/modalContato'



export default class Contato extends Component {



    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            rowsFiltered: [],
            search: '',
            modalEnable: false
        }
    }






    componentDidMount() {

        const lista = [
            this.createData('India', 'IN', 1324171354, 3287263),
            this.createData('China', 'CN', 1403500365, 9596961),
            this.createData('Italy', 'IT', 60483973, 301340),
            this.createData('United States', 'US', 327167434, 9833520),
            this.createData('Canada', 'CA', 37602103, 9984670),
            this.createData('Australia', 'AU', 25475400, 7692024),
            this.createData('Germany', 'DE', 83019200, 357578),
            this.createData('Ireland', 'IE', 4857000, 70273),
            this.createData('Mexico', 'MX', 126577691, 1972550),
            this.createData('Japan', 'JP', 126317000, 377973),
            this.createData('France', 'FR', 67022000, 640679),
            this.createData('United Kingdom', 'GB', 67545757, 242495),
            this.createData('Russia', 'RU', 146793744, 17098246),
            this.createData('Nigeria', 'NG', 200962417, 923768),
            this.createData('Brazil', 'BR', 210147125, 8515767),
        ];

        console.trace({ lista });
        this.setState({ ...this.state, rows: lista, rowsFiltered: lista })

    }


    createData(nome, telefone, population, size) {
        const density = population / size;
        return { nome, telefone, population, size, density };
    }

    getFieldsFiltered(value) {
        const { rows } = this.state
        const filtered = rows.filter((e) => {
            return e.nome.toUpperCase().includes(value.toUpperCase());
        })
        if (value) {
            this.setState({ ...this.state, rowsFiltered: (filtered) ? filtered : [] });
            console.log(this.state.rowsFiltered);
        } else {
            this.setState({ ...this.state, rowsFiltered: this.state.rows });
        }
    }

    _handleFilteredFields = (e) => {
        this.getFieldsFiltered(e.target.value);
    }

    _registerContact() {
        this.setState({ modalEnable: true })
    }

    render() {
        return (
            <Template title={'Contatos'}>
                <Toolbar
                    className="toolbar"
                    style={{ minHeight: "30px" }}>
                    < SimpleModal />
                    <TextField
                        id="standard-size-small"
                        size="small"
                        onChange={e => this._handleFilteredFields(e)}
                        className="textfield"
                        autoComplete="off"
                        style={{ marginLeft: "10px", paddingTop: "15px", paddingLeft: "1px", height: "15px" }}
                        InputProps={Object.assign({ disableUnderline: true },
                            {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon color="primary" fontSize="small" />
                                    </InputAdornment>
                                )
                            },
                            {
                                style: {
                                    paddingLeft: "5px",
                                }
                            }
                        )}
                    />
                </Toolbar>

                {this.state.rowsFiltered.length > 0 ?
                    <StickyHeadTable rows={this.state.rowsFiltered} />
                    :
                    <div>informação não encontradas</div>
                }
            </Template >
        );
    }
}