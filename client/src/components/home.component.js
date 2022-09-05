import React from "react";
import { Fragment } from "react";
import UserService from "../services/user.service";
import StartHome from "./home/startHome";

export default class Home extends React.Component {
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
        <StartHome></StartHome>
      </Fragment>
    );
  }
}
