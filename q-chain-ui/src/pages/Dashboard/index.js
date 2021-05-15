import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/* import {
} from '@actions'; */
import fromState from '@selectors';
import Component from './Component';


const mapStateToProps = state => {
};

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Component);
