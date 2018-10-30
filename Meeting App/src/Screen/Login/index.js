import React, { Component } from 'react'; 
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import firebase from '../../Config/Firebase'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            step1: true,
            step2: false,
            step3: false,
            step4: false,
            nickName: '',
            phoneNumber: null,
            images: [],
            beverages: [],
            timeOfMeeting: [],
            userLocation: {},
        }
        this.renderStep2 = this.renderStep2.bind(this)
        this.renderStep3 = this.renderStep3.bind(this)
        this.nickName_phoneNumber = this.nickName_phoneNumber.bind(this)
        this.imagesUrl = this.imagesUrl.bind(this)
        this.renderStep4 = this.renderStep4.bind(this)
        this.userLocation = this.userLocation.bind(this)
        this.createUserProfile = this.createUserProfile.bind(this)
        this.beverages = this.beverages.bind(this)
        this.durations = this.durations.bind(this)
    }

    renderStep2() {
        this.setState({
            step1: false,
            step2: true,
            step3: false,
            step4: false,
        })
    }

    renderStep3() {
        this.setState({
            step1: false,
            step2: false,
            step4: false,
            step3: true,
        })
    }

    renderStep4() {
        this.setState({
            step1: false,
            step2: false,
            step4: true,
            step3: false,
        })
    }

    nickName_phoneNumber(nickName, phoneNumber) {
        this.setState({ nickName, phoneNumber })
    }

    imagesUrl(url1, url2, url3) {
        const images = [url1, url2, url3]
        // console.log(images)
        this.setState({ images })
    }

    beverages(beverages) {
        // console.log(beverages)
        this.setState({ beverages })

    }

    durations(timeOfMeeting) {
        // console.log(timeOfMeeting)
        this.setState({ timeOfMeeting })
    }

    userLocation(coords) {
    //    console.log(coords)
    this.setState({ userLocation: coords })
    }

    createUserProfile() {
        const { userLocation, images, nickName, phoneNumber, beverages, timeOfMeeting } = this.state;
        const userObj = {
            fullName: firebase.auth().currentUser.displayName,
            profilePic: firebase.auth().currentUser.displayName.photoUrl,
            nickName: nickName,
            images: images,
            phoneNumber: phoneNumber,
            userLocation: userLocation,
            beverages: beverages,
            meetingDuration: timeOfMeeting
        }
        console.log(userObj)
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/`).push(userObj)
    }

    render() {
        const { step1, step2, step3, step4 } = this.state
        // console.log(images)
        return (
            <div>
                {step1 && !step2 && !step3 && !step4 && <Step1 renderStep2={this.renderStep2} user={this.nickName_phoneNumber} />}
                {!step1 && step2 && !step3 && !step4 && <Step2 imagesUrl={this.imagesUrl} renderStep3={this.renderStep3} />}
                {!step1 && !step2 && step3 && !step4 && <Step3 renderStep4={this.renderStep4} beverage={this.beverages} durations={this.durations} />}
                {!step1 && !step2 && !step3 && step4 && <Step4 userLocation={this.userLocation} createUserProfile={this.createUserProfile} />}
            </div>
        );
    }
}

export default Login