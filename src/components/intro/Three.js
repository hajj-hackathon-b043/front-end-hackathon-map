import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
const Three = props => {
    const updatePref = (name, event) => {
        props.dispatch({
            type: 'CHANGE_FOOD_PREF',
            payload: {
                name, 
                value: event.target.checked
            }
        })
    }
    const foodPref = props.foodPref || {};
    const { vegetable, meat, desserts, beverages } = foodPref;
    if (props.currentStep !== 3) {
        return null;
    }
    let {food, dispatch} = props
    return (
    <div className="wizard-welcome">
        <p>Your food preferences</p>
        <FormGroup>
            <Select
            value={food || ''}
            onChange={(e)=>{
                dispatch({
                    type: 'CHANGE_FOOD',
                    payload: e.target.value    
                })
            }}
            >
                <MenuItem value="0">
                    <em>Vegan 👎</em>
                </MenuItem>
                <MenuItem value="1">
                    <em>Normie</em>
                </MenuItem>

            </Select>
        </FormGroup>
    </div>
    );
}
const mapStateToProps = state => {
    return {
        ...state.introWizard
    }
};

export default connect(mapStateToProps)(Three);