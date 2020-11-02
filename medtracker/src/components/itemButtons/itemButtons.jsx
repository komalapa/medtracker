import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function ItemActionButtons(props) {
  const { classes } = props;
  return (
    <div>
        {props.actionType==="Add" &&
            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={props.onClick}>
                <AddIcon />
            </Fab>
        }
        {props.actionType==="Edit" &&
            <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={props.onClick}>
                <Icon>edit_icon</Icon>
            </Fab>
        }
        {props.actionType==="More" &&
            <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={props.onClick}>
                <NavigationIcon className={classes.extendedIcon} />
                Extended
            </Fab>
        }
        {props.actionType==="Delete" &&
            <Fab disabled aria-label="Delete" className={classes.fab} onClick={props.onClick}>
                <DeleteIcon />
            </Fab>
        }
    </div>
  );
}

ItemActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  actionType: PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired,
};

export default withStyles(styles)(ItemActionButtons);
