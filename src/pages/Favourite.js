import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import {updateUserProfile} from '../actions/auth';

const styles = () => ({

});

const mapStateToProps = (state) => ({
  advancedUser: state.getIn(['auth', 'userProfile', 'advanced'], false)
});

const mapDispatchToProps = (dispatch) => ({
  updateUserProfile: userProfile => dispatch(updateUserProfile(userProfile))
});

class FavouritePage extends Component {
  onAdvancedBtnChange = (event) => {
    this.props.setLoading(true);
    this.props.updateUserProfile({advanced: event.target.checked})
        .then(() => {
          this.props.setLoading(false);
        });
  };


  render() {
    const {advancedUser} = this.props;

    return (
      null
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FavouritePage));