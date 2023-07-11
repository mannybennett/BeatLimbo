import { connect } from 'react-redux';
import ProfileCreation from '../components/ProfileCreation';
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreation);