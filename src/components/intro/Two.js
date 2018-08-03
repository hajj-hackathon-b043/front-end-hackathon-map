import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

const rowsStatic = genCharArray('A', 'P');

class Two extends Component {
    state = {
        row: '',
        tableNoTemp: ''
    }
    handleChangeRow = event => {
        this.props.dispatch({
            type: 'CHANGE_ROW',
            payload: {
                tableRow: event.target.value
            }
        })
      };
    render() {
        const { currentStep, tableRow, tableNo } = this.props;
        const { row, tableNoTemp } = this.state;

        if (currentStep !== 2) {
            return null;
        }
        return (
        <div className="wizard-welcome">
            <p>Please start with entering table information</p>
            <FormControl>
            <InputLabel htmlFor="age-simple">Row</InputLabel>
            <Select
                value={tableRow || ''}
                onChange={this.handleChangeRow}
                inputProps={{
                name: 'row',
                id: 'age-simple',
                }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {rowsStatic.map((row) => {
                    return <MenuItem key={row} value={row}>{row}</MenuItem>;
                })}

            </Select>
                <TextField
                    className="form-input"
                    id="name"
                    label="Table No"
                    margin="normal"
                    onChange={(e) => this.props.dispatch({ type: 'CHANGE_TABLE_NO', payload: {tableNo: e.target.value} })}
                    value={tableNo || ''}
                />
            </FormControl>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.introWizard
    }
};

export default connect(mapStateToProps)(Two);