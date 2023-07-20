import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { updateUser } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    audioFiles: state.audioFiles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);