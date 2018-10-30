import React, { Component } from 'react';
import { TextField, Button, FormControl } from '@material-ui/core';

class LoginStep1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickName: '',
            phoneNumber: null,
        }
        this.nickName = this.nickName.bind(this)
        this.phoneNumber = this.phoneNumber.bind(this)
    }

    componentWillUnmount() {
        const { nickName, phoneNumber } = this.state
        const { user } = this.props
    user(nickName, phoneNumber)
    }

    nickName(e) {
        const nickName = e.target.value
        // console.log(nickName)
        this.setState({nickName})
    }

    phoneNumber(e) {
        const phoneNumber = e.target.value
        // console.log(nickName)
        this.setState({phoneNumber})
    }

    render() {
        const { renderStep2 } = this.props
        const { phoneNumber, nickName} = this.state
        return (
            <div>
               
                <FormControl>
                    <TextField
                        id="outlined-full-width"
                        // id="outlined-name"
                        label="Nickname"
                        required
                        fullWidth
                        // className={classes.textField}
                        // value={this.state.name}
                        onChange={this.nickName}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-full-width"
                        fullWidth
                        style={{width:400}}
                        type="number"
                        // id="outlined-name"
                        label="Phone Number"
                        // className={classes.textField}
                        // value={this.state.name}
                        onChange={this.phoneNumber}
                        margin="normal"
                        variant="outlined"
                    />
                   {!phoneNumber && !nickName && <Button disabled>Next</Button>}
                   {phoneNumber && nickName && <Button  onClick={renderStep2}>Next</Button>}
                </FormControl>
            </div>
        );
    }
}

export default LoginStep1