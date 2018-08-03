import { connect } from 'react-redux';
import IntroWizard from '../components/IntroWizard';

const mapStateToProps = state => {
    return {
        ...state.IntroWizard
    }
}

export default connect(mapStateToProps)(IntroWizard);