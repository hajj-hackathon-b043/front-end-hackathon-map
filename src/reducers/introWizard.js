import * as actionTypes from '../actions/actionTypes';
import axiso from 'axios';
const initialState = {
    isFirstTimeLoading: true
};

export default function introWizard(state = initialState, action) {
    switch(action.type) {
        case actionTypes.LAUNCH_APP: {
            const launched = localStorage.getItem('appLaunched');
            const basicInformation = JSON.parse(localStorage.getItem('basicInformation'));
            let isFirstTimeLoading = true;
            if(launched) isFirstTimeLoading = false;

            return {
                ...state,
                ...basicInformation,
                isFirstTimeLoading
            }
        }

        case 'HANDLE_FINAL_STEP': {
            console.log({fuck:state})
            let currentState = {
                ...state,
                isFirstTimeLoading: false
            };
            axiso.post('http://desolate-caverns-43961.herokuapp.com/user',{
                id: state.id,
                team: `${state.tableRow}-${state.tableNo}`,
                food: state.food,
                gender: Boolean(Number(state.gender))
            })
            localStorage.setItem('appLaunched', true);
            localStorage.setItem('basicInformation', JSON.stringify(state));
            return currentState;
        }

        case 'CHANGE_ID': {
            return {
                ...state,
                id: action.payload.id
            }
        }

        case 'CHANGE_ROW': {
            return {
                ...state,
                tableRow: action.payload.tableRow
            }
        }
        
        case 'CHANGE_FOOD_PREF': {
            let foodPref = state.foodPref;
            return {
                ...state,
                foodPref: {
                    ...foodPref,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        
        case 'CHANGE_TABLE_NO': {
            return {
                ...state,
                tableNo: action.payload.tableNo
            }
        }
        case 'CHANGE_FOOD':{
            return {
                ...state,
                food:action.payload
            }
        } 
        case 'CHANGE_GENDER':{
            return {
                ...state,
                gender:action.payload
            }
        }

        default: 
            return state;
    }
}