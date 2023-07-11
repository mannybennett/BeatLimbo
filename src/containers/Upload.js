import { connect } from 'react-redux';
import Upload from '../components/Upload';

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    audioFiles: state.audioFiles
  };
};

export default connect(mapStateToProps, null)(Upload);