import { connect } from 'react-redux';
import Upload from '../components/Upload';

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps, null)(Upload);