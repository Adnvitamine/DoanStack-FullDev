import { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import BlogArticlesCateg from "./blogArticlesCateg";
// import authService from "../../services/auth.service";

class blogCateg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      // currentUser: authService.getCurrentUser(),
    };
  }

  render() {
    return (
      <Fragment>
        <div id="TitleLink">
          <h2>{this.props.match.params.category}</h2>
        </div>
        <div className="BrowserNavbar">
          <p>
            Read all {this.props.match.params.category}'s topics - DoanStack.com
          </p>
        </div>
        <div id="BlogBody">
          <div id="BlogNav">
            <ul>
              <li>
                <Link to="/blog">
                  <b>All</b>
                </Link>
              </li>
              <li>
                {(this.props.match.params.category === "News" && (
                  <Link
                    to="/blog/News"
                    style={{ fontSize: "18px", color: "rgb(0, 162, 255)" }}
                  >
                    <b>News</b>
                  </Link>
                )) || (
                  <Link to="/blog/News">
                    <b>News</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "FrontEnd" && (
                  <Link
                    to="/blog/FrontEnd"
                    style={{ fontSize: "18px", color: "rgb(0, 162, 255)" }}
                  >
                    <b>FrontEnd</b>
                  </Link>
                )) || (
                  <Link to="/blog/FrontEnd">
                    <b>FrontEnd</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "BackEnd" && (
                  <Link
                    to="/blog/BackEnd"
                    style={{ fontSize: "18px", color: "rgb(0, 162, 255)" }}
                  >
                    <b>BackEnd</b>
                  </Link>
                )) || (
                  <Link to="/blog/BackEnd">
                    <b>BackEnd</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Life" && (
                  <Link
                    to="/blog/Life"
                    style={{ fontSize: "18px", color: "rgb(0, 162, 255)" }}
                  >
                    <b>Life</b>
                  </Link>
                )) || (
                  <Link to="/blog/Life">
                    <b>Life</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Others" && (
                  <Link
                    to="/blog/Others"
                    style={{ fontSize: "18px", color: "rgb(0, 162, 255)" }}
                  >
                    <b>Others</b>
                  </Link>
                )) || (
                  <Link to="/blog/Others">
                    <b>Others</b>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <BlogArticlesCateg category={this.props.match.params.category} />
        </div>
      </Fragment>
    );
  }
}

export default blogCateg;
