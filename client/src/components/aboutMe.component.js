import React, { Fragment, Component } from "react";

import UserService from "../services/user.service";

export default class About extends Component {
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
          <p>About Me</p>
        </div>
        <div className="container text-center">
          <iframe
            title="doan-cv"
            src="http://localhost:8080/doanResume.pdf"
            frameBorder="0"
          ></iframe>
        </div>
      </Fragment>
    );
  }
}
