import { connect } from 'react-redux';
import Limbo from '../components/Limbo';
import { updateUser, getFiles } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    audioFiles: state.audioFiles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    getFiles: (file) => dispatch(getFiles(file))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Limbo);