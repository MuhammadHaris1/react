import React from 'react';
import '../../App.css';
import Avatar from '@material-ui/core/Avatar/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import firebase from 'firebase';
import { ListItemText } from '@material-ui/core';
import { Button, Icon } from 'semantic-ui-react';
import FacebookEmoji from 'react-facebook-emoji'
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade/Fade';


export default class RenderPost extends React.Component {
    constructor() {
        super()
        this.state = {
            isLike: false,
            anchorEl: null,
            open: false,
            placement: null,
        }
    }

    handleClick = placement => event => {
        // console.log(event.target)
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement,
        }));
    };

    render() {
        const { isSignedIn, userName, avatar, description, images, createdAt } = this.props
        const { anchorEl, open, placement, isLike } = this.state;

        return (
            <div>
                {isSignedIn && (<div style={{ padding: 10, margin: 10, marginLeft: 10, marginRight: 10, backgroundColor: 'white', boxShadow: '2px 2px 15px 1px' }}>

                    <List>
                        <ListItem>
                            <Avatar style={{ margin: '10px', height: 60, width: 60 }} src={firebase.auth().currentUser.photoURL} />
                            <ListItemText primary={userName} secondary={'Jan 9, 2014'} />
                            <Icon name="ellipsis vertical" size='big' />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={description} />
                        </ListItem>
                        <img width={'100%'} src="https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg" />
                        <ListItem>
                            <Button
                                onClick={() => {this.setState({isLike: !isLike})}}
                                onMouseOver={this.handleClick('top-middle')}
                                onMouseOut={() => { this.setState({ anchorEl: null, open: false, placement: null }) }} >
                                <Icon name='thumbs up' color={isLike && 'blue'} />
                                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            <Paper>
                                                <Typography style={{ width: 450, padding: 10, borderRadius: '100%' }}>
                                                    <FacebookEmoji type="like" size="md" />
                                                    <FacebookEmoji type="love" size="md" />
                                                    <FacebookEmoji type="wow" size="md" />
                                                    <FacebookEmoji type="yay" size="md" />
                                                    <FacebookEmoji type="angry" size="md" />
                                                    <FacebookEmoji type="haha" size="md" />
                                                    <FacebookEmoji type="sad" size="md" />
                                                </Typography>
                                            </Paper>
                                        </Fade>
                                    )}
                                </Popper>
                                {isLike ? "You" : "Like" }
                            </Button>
                            <Button ><Icon name="comment" />Comment</Button>
                            <Button><Icon name="share" />Share</Button>
                        </ListItem>
                    </List>
                </div>
                )}


            </div>
        );
    }
}
