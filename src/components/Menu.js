import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
class Menu extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let {gender} = this.props
    }
    render() {
        console.log({props:this.props})
        let {gender,tableRow, tableNo} = this.props
        return (
            <div className="menu">

                <Link to='/menu/exit'>
                    <h2>Nearst Exit</h2>
                </Link>                
                <Link to={`/menu/team/${tableRow}`}>
                    <h2>Team Table</h2>
                </Link>
                <Link to={gender ? '/menu/wc_' + gender: '/menu/wc' }>
                    <h2>Find WC</h2>
                </Link>
                <Link to='/menu/food'>
                    <h2>Find Food</h2>
                </Link>

                
                
            </div>
        )
    }
}


const mapStateToProps =(state)=>{
    return {
        ...state.introWizard
    }
}

export default connect(mapStateToProps)(Menu)