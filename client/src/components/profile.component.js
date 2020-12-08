import React, { Component, Fragment } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EditUser from "./users/editUser";
import UserProfile from "./users/userProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }
  componentDidMount() {
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    const { currentUser } = this.state;

    if (currentUser == null) {
      return (
        <Fragment>
          <div className="BrowserNavbar">
            <p>No access</p>
          </div>
          <div></div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="BrowserNavbar">
            <p>{currentUser.username} is connected.</p>
          </div>
          <div id="TitleLink">
            <h1>YOUR PROFILE</h1>
          </div>
          <div id="ProfileFrame">
            <UserProfile currentUser={currentUser} />
            <EditUser currentUser={currentUser} />
          </div>
        </Fragment>
      );
    }
  }
}
