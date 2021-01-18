import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ItemActionButtons from "../itemButtons/itemButtons"
import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';

import TemperatureFields from './temperatureFields/temperatureFields'

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     justifyContent:'space-around',
//     flexWrap: 'wrap',
//     padding:'20px',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));
function DateAndTimePickers() {
  //const classes = useStyles();
  const currentDate = new Date();
  const currentLocalDate = new Date(currentDate - (currentDate.getTimezoneOffset() * 60000)).toISOString().slice(0, -8);
  // console.log(currentLocalDate);

  return (
      <TextField
        id="datetime-local"
        label="Дата и время"
        type="datetime-local"
        //defaultValue="2017-05-24T10:30"
        defaultValue={currentLocalDate}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    
  );
}



export default class AddItemForm extends React.Component {
  state = {
    open: false,
    //prevTemperature: 36.6,
    //curTemperature: 36.6,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleCurTemperature = (evt, newValue) => {
    this.setState({ curTemperature: Number(newValue) });
    // console.log(evt.target.ariaValueNow)
    console.log(newValue)
  };
  handleCurTemperatureText = (evt) => {
    this.setState({ curTemperature: evt.target.value });
    // console.log(evt.target.ariaValueNow)
    console.log(evt.target.value)
  };
  valuetext = (value) => {
    return `${value}°C`;
  };

  render() {
    return (
      <div>
        <ItemActionButtons actionType="Add" onClick={this.handleClickOpen}>
          Open form dialog
        </ItemActionButtons>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Новая запись</DialogTitle>
          <DialogContent>
            <DateAndTimePickers></DateAndTimePickers>
            <TemperatureFields prevTemperature={38.6}/>
            <TextField
              id="drugs"
              label="Лекарства"
              multiline
              rows={4}
              defaultValue=""
              fullWidth
            />
            <TextField
              id="comment"
              label="Комментарий"
              multiline
              rows={4}
              defaultValue=""
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Отмена
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Записать
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AddItemForm.propTypes = {
  dataType: PropTypes.string.isRequired,//то же значение, что у таблицы
};