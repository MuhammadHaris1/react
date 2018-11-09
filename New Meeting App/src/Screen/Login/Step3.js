import React, { Component } from 'react';
import { Button, InputLabel, FormControl, MenuItem, Select, Input, Chip, withStyles } from '@material-ui/core'

class LoginStep3 extends Component {
  constructor() {
    super()
    this.state = {
      beverages: [],
      timeOfMeeting: [],
    }

  }

  beverages = event => {
    // const { beverages } = this.state
    const { beverage } = this.props
    this.setState({ beverages: event.target.value });
    beverage(event.target.value)
  };

  durations = event => {
    // const { timeOfMeeting } = this.state
    const { durations } = this.props
    this.setState({ timeOfMeeting: event.target.value });
    durations(event.target.value)
  };

  render() {
  const { renderStep4 } = this.props
    const names = [
      'Coffee',
      'Juice',
      'Cocktial',
    ];
    const durations = [
      '20 min',
      '60 min',
      '120 min',
    ];
 
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="select-multiple-chip">Select Beverages</InputLabel>
          <Select
            multiple
            fullWidth
            style={{width: 500}}
            value={this.state.beverages}
            onChange={this.beverages}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div>
                {selected.map(value => (
                  <Chip key={value} label={value}/>
                ))}
              </div>
            )}
          >
            {names.map(name => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="select-multiple-chip">Duration Of Meeting</InputLabel>
          <Select
            multiple
            fullWidth
            style={{width: 500}}
            value={this.state.timeOfMeeting}
            onChange={this.durations}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div>
                {selected.map(value => (
                  <Chip key={value} label={value}/>
                ))}
              </div>
            )}
          >
            {durations.map(name => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl><br/>
        <Button onClick={renderStep4}>Next</Button>
      </div>
    );
  }
}

export default LoginStep3