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

function DateAndTimePickers(props) {
  const currentDate = new Date();
  const currentLocalDate = new Date(currentDate - (currentDate.getTimezoneOffset() * 60000)).toISOString().slice(0, -8);
  
  return (
      <TextField
        id="datetime-local"
        label="Дата и время"
        type="datetime-local"
        defaultValue={currentLocalDate}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        onChange={props.setDate}
      />
    
  );
}



export default class AddItemForm extends React.Component {
  state = {
    open: false,
    prevTemperature: this.props.prevTemperature,
    curTemperature: this.props.prevTemperature,
    drugs:'',
    comment:'',
    date: new Date(),
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleDone = () =>{
    let row = {"date":this.state.date.toLocaleDateString(),"time":this.state.date.toLocaleTimeString().slice(0,5),"temperature": this.state.curTemperature, "drugs":this.state.drugs, "comment":this.state.comment};
    // УБРАТЬ запись напрямую в LS
    // let lsData = localStorage.getItem('data');
    // lsData = lsData ? JSON.parse(lsData) : [];
    // lsData.temperature.push(row);
    // localStorage.setItem("data", JSON.stringify(lsData));
    console.log ("handleDone")
    this.props.writeData(row);
    
    this.setState({ open: false });
  }
  handleCurTemperature = (evt, newValue) => {
    this.setState({ curTemperature: Number(newValue) });
  };
  handleCurTemperatureText = (evt) => {
    this.setState({ curTemperature: evt.target.value });
  };
  handleDrugs = (evt) => {
    this.setState({ drugs: evt.target.value });
  };
  handleComment = (evt) => {
    this.setState({ comment: evt.target.value });
  };
  handleDate = (evt) => {
    this.setState({ date: new Date(evt.target.value)});
    console.log(new Date(evt.target.value))
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
            <DateAndTimePickers setDate={this.handleDate}></DateAndTimePickers>
            <TemperatureFields prevTemperature={this.state.prevTemperature} setTemperature={this.handleCurTemperature}/>
            <TextField
              id="drugs"
              label="Лекарства"
              multiline
              rows={4}
              defaultValue=""
              fullWidth
              onChange={this.handleDrugs}
            />
            <TextField
              id="comment"
              label="Комментарий"
              multiline
              rows={4}
              defaultValue=""
              fullWidth
              onChange={this.handleComment}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Отмена
            </Button>
            <Button onClick={this.handleDone} color="primary">
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
  prevTemperature: PropTypes.number,//температура из последней строки
};