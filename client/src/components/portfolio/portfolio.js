import { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import PortfolioAll from "./portfolioAll";

class Portfolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      //   currentUser: authService.getCurrentUser(),
    };
  }

  render() {
    return (
      <Fragment>
        <div id="TitleLink">
          <h2>Portfolio</h2>
        </div>
        <div className="BrowserNavbar">
          <p>All my projects & snippets - DoanStack.com</p>
        </div>
        <div id="BlogBody">
          <div id="BlogNav">
            <ul>
              <li>
                <Link to="/portfolio" style={{ color: "rgb(0, 162, 255)" }}>
                  <b style={{ fontSize: "18px", color: "rgb(0, 162, 255)" }}>
                    All
                  </b>
                </Link>
              </li>
              <li>
                <Link to="/portfolio/projects">
                  <b>Projects</b>
                </Link>
              </li>
              <li>
                <Link to="/portfolio/snippets">
                  <b>Snippets</b>
                </Link>
              </li>
            </ul>
          </div>

          <PortfolioAll />
        </div>
      </Fragment>
    );
  }
}

export default Portfolio;
