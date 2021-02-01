import { Component, Fragment } from "react";
import UserService from "../services/user.service";
import authService from "../services/auth.service";
import ListUsers from "./users/listUsers";
import MailBox from "./mails/mailbox";


export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: authService.getCurrentUser(),
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
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
    //console.log(currentUser.roles[2]);
    if (currentUser == null) {
      return (
        <Fragment>
          <div className="BrowserNavbar">
            <p>No access</p>
          </div>
          <div></div>
        </Fragment>
      );
    } else if (currentUser.roles[2] === "Role: ADMIN") {
      return (
        <Fragment>
          <div className="BrowserNavbar">
          <div id="TitleLink">
            <h2>ADMIN PANEL</h2>
          </div>
            <p>"Manage registered users" - DoanStack.be</p>
          </div>
          <ListUsers />
          <MailBox currentUser={currentUser} />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="BrowserNavbar">
            <p>No role permission</p>
          </div>
        </Fragment>
      );
    }
  }
}
