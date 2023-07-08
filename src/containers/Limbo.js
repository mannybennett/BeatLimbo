import { connect } from 'react-redux';
import Limbo from '../components/Limbo';
import { updateUser } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Limbo);