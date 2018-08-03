import React from 'react';
import { Link } from 'react-router-dom';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
const Four = props => {
    if (props.currentStep !== 4) {
        return null;
    }
    let {gender, dispatch} = props
    return (
    <div className="wizard-welcome">
        <p>Gender</p>
        <FormGroup>
            <Select
            value={gender || ''}
            onChange={(e)=>{
                dispatch({
                    type: 'CHANGE_GENDER',
                    payload: e.target.value
                })
            }}
            >
                <MenuItem value="0">
                    <em> Male</em>
                </MenuItem>
                <MenuItem value="1">
                    <em>Female</em>
                </MenuItem>

            </Select>
        </FormGroup>
    </div>
    )
}
const mapStateToProps = state => {
    return {
        ...state.introWizard
    }
};

export default connect(mapStateToProps)(Four);