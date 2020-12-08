import React, { Fragment, Component } from "react";
import HomeSVG from "./homeSVG";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <Fragment>
        <div className="BrowserNavbar">
          <p>"Follow me on Facebook, Twitter and Instagram" - DoanStack.be</p>
        </div>
        <div id="TitleLink">
          <h1>HomePage</h1>
        </div>
        <div className="homeBody">
          <HomeSVG />
        </div>
      </Fragment>
    );
  }
}
