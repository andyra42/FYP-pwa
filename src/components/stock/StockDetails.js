import React, {Component} from 'react';
import immutableToJsComponent from '../immutableToJsComponent';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const ExpansionPanel = withStyles({
  root: {
    border: '0px',
    boxShadow: 'none',
    backgroundColor:'transparent', 
    marginTop:'0',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'transparent',
    // borderBottom: '1px solid rgba(0,0,0,.125)',
    // marginBottom: -1,
    padding: '0',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    marginTop:'0',
    '&$expanded': {
      marginTop: '0',
      marginBottom: '12px'
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);


const styles = theme => ({
  // industryText:{
  //   textAlign
  // }
  industryTag:{
    color:'grey', 
    marginBottom:'0'
  },
  stockSector:{
    marginTop:'0'
  },
  expansionSummary:{
    padding:'0',
    marginTop: '0'
  },
  expansionPanel:{
    border:'0px', 
    boxShadow:'none', 
    backgroundColor:'transparent', 
    marginTop:'0'
  }
});

class StockDetails extends Component {

  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };


  render() {
    const {stock, classes} = this.props;
    const {expanded} = this.state;
    return (
      <div>

        <Grid
          justify="space-between" // Add it here :)
          container 
          spacing={12}
        >
          <Grid item xs={9}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h2>{stock.name} ({stock.code})</h2>
                {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{padding:'0'}}>
                <body2 style={{paddingBottom:'10px'}}>{stock.description}</body2>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <div>
              
            </div>
          </Grid>

          <Grid item xs={3}>
            <div style={{textAlign:'right'}}>
              <h5 className={classes.industryTag}>Industry   </h5>
              <h4 className={classes.stockSector}> {stock.sector} </h4>
              
              {/* <h3 style={{align:'right'}}>Industry <br/> {stock.sector}</h3> */}
            </div>
          </Grid>
        </Grid>

        {/* <div>
          <body2>{stock.description}</body2>
        </div> */}
      </div>
    );
  }
}

StockDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(immutableToJsComponent(StockDetails));
