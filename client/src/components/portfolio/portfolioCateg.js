import { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import PortfolioArticleCateg from "./portfolioArticlesCateg";
// import authService from "../../services/auth.service";

class portfolioCateg extends Component {
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
                <Link to="/portfolio">
                  <b>All</b>
                </Link>
              </li>
              <li>
                {(this.props.match.params.category === "Projects" && (
                  <Link
                    to="/portfolio/Projects"
                    style={{ fontSize: "18px", color: "rgb(0, 162, 255)" }}
                  >
                    <b>Projects</b>
                  </Link>
                )) || (
                  <Link to="/portfolio/Projects">
                    <b>Projects</b>
                  </Link>
                )}
              </li>
              <li>
                {(this.props.match.params.category === "Snippets" && (
                  <Link
                    to="/portfolio/Snippets"
                    style={{ fontSize: "18px", color: "rgb(0, 162, 255)" }}
                  >
                    <b>Snippets</b>
                  </Link>
                )) || (
                  <Link to="/portfolio/Snippets">
                    <b>Snippets</b>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <PortfolioArticleCateg category={this.props.match.params.category} />
        </div>
      </Fragment>
    );
  }
}

export default portfolioCateg;
