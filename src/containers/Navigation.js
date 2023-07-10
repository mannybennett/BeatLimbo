import { connect } from 'react-redux';
import Navigation from '../components/Navigation';

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps, null)(Navigation);