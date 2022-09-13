import { Fragment, Component } from "react";
import PortfolioIdArticle from "./portfolioIdArticle";
import authService from "../../services/auth.service";

class PortfolioId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: authService.getCurrentUser(),
    };
  }

  render() {
    const user = this.state.currentUser;
    if (user == null) {
      const user = "Visitor";
      return (
        <Fragment>
          <PortfolioIdArticle
            articleId={this.props.match.params.id}
            currentUser={user}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <PortfolioIdArticle
            articleId={this.props.match.params.id}
            currentUser={user}
          />
        </Fragment>
      );
    }
  }
}

export default PortfolioId;
