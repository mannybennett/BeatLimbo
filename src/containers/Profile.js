import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { deleteFile, getFiles } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    audioFiles: state.audioFiles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFile: (id) => dispatch(deleteFile(id)),
    getFiles: (file) => dispatch(getFiles(file))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);