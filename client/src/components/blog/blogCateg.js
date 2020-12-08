import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import BlogArticlesCateg from "./blogArticlesCateg";

class blogCateg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  render() {
    return (
      <Fragment>
        <div className="BrowserNavbar">
          <p>
            Read all {this.props.match.params.category}'s topics - DoanStack.be
          </p>
        </div>
        <div id="TitleLink">
          <h1>{this.props.match.params.category}</h1>
        </div>
        <div id="BlogBody">
          <div id="BlogNav">
            <ul>
              <li>
                <Link to="/">
                  <b>All</b>
                </Link>
              </li>
              <li>
                {(this.props.match.params.category === "News" && (
                  <Link to="/News" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>News</b>
                  </Link>
                )) || (
                  <Link to="/News">
                    <b>News</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "BackEnd" && (
                  <Link to="/BackEnd" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>BackEnd</b>
                  </Link>
                )) || (
                  <Link to="/BackEnd">
                    <b>BackEnd</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "FrontEnd" && (
                  <Link to="/FrontEnd" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>FrontEnd</b>
                  </Link>
                )) || (
                  <Link to="/FrontEnd">
                    <b>FrontEnd</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Life" && (
                  <Link to="/Life" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Life</b>
                  </Link>
                )) || (
                  <Link to="/Life">
                    <b>Life</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Others" && (
                  <Link to="/Others" style={{ color: "rgb(0, 162, 255)" }}>
                    <b>Others</b>
                  </Link>
                )) || (
                  <Link to="/Others">
                    <b>Others</b>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div id="BlogHome">
            <BlogArticlesCateg category={this.props.match.params.category} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default blogCateg;
