import React from "react";
import { Fragment } from "react";
import UserService from "../services/user.service";

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
      <div className="homeFrameOne">
        <a id="INTRO" href="./"> </a>
        <div id="TitleLink"></div>
        <div className="BrowserNavbar">
          <p>"A Web Developer's journey"</p>
        </div>
        <div className="anchorLink">
        <div className="anchorFrameTwo">
            <a href="#INTRO"><h2>.Intro</h2></a>
          </div>
          <div className="anchorFrameTwo">
            <a href="#ABOUT"><h2>.About Me</h2></a>
          </div>
          <div className="anchorFrameThree">
            <a href="#SKILLS"><h2>.My Skills</h2></a>
          </div>
          <div className="anchorFrameFour">
            <a href="#AboutDoanStack"><h2>.DoanStack</h2></a>
          </div>
        </div>
        
        </div>

        <div className="homeFrameTwo">
          <a id="ABOUT" href="./"> </a>
        </div>

        <div className="homeFrameThree">
        <a id="SKILLS" href="./"> </a>
        </div>

        <div className="homeFrameFour">
        <a id="AboutDoanStack" href="./"> </a>
        </div>
      </Fragment>
    );
  }
}
