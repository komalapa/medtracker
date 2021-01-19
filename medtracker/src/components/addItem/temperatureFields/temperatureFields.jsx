import React from 'react';
import TextField from '@material-ui/core/TextField';
import  PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';



const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
    marginTop:25,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default class TemperatureFields extends React.Component {
  state = {
    prevTemperature:this.props.prevTemperature,
    curTemperature:this.props.prevTemperature,
  };

  handleCurTemperature = (evt, newValue) => {
    this.setState({ curTemperature: Number(newValue) });
    this.props.setTemperature(evt,newValue)
    //console.log(newValue)
  };
  handleCurTemperatureText = (evt) => {
    this.setState({ curTemperature: evt.target.value });
    this.props.setTemperature(evt,evt.target.value)
    //console.log(evt.target.value)
  };
  valuetext = (value) =>{
    return `${value}°C`;
  };
  
  render() {
    return (
      <div>
        
           
            <TextField
                id="temperature-tf"
                label="Температура"
                type="number"
                value = {this.state.curTemperature}
                onChange={this.handleCurTemperatureText}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{ 
                    inputProps: { 
                        min: 34, 
                        max: 42.2,
                        step: 0.1,
                     } 
                }}

            />
            <PrettoSlider
                defaultValue={this.state.prevTemperature}
                aria-labelledby="discrete-slider-small-steps"
                step={0.1}
                marks
                min={34.0}
                max={42.2}
                valueLabelDisplay="on"
                onChange={this.handleCurTemperature}
                value = {this.state.curTemperature}
                marginTop={'20px'}
            />
      </div>
    );
  }
}
TemperatureFields.propTypes = {
  prevTemperature: PropTypes.number.isRequired,//Последнее значение из таблицы
  setTemperature: PropTypes.func.isRequired,//для передачи значения родителю
};