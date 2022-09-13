import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import ArticleCreateCom from "./articleComs/articleCreateCom";
import ArticleReadComs from "./articleComs/articleReadComs";
import BlogLogin from "./blogLogin";

const BlogIdArticle = ({ articleId, currentUser }) => {
  //const id =
  const history = useHistory();
  const [user] = useState(currentUser);
  const [article, setArticle] = useState([]);
  const [listArticles, setListArticles] = useState([]);
  const [click1, setClick1] = useState();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}`);
        const jsonData = await response.json();
        setArticle(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getArticle();
  }, [articleId]);

  useEffect(() => {
    const getListArticles = async () => {
      try {
        const response = await fetch(`/api/articles/post/${article.category}`);
        const jsonData = await response.json();
        setListArticles(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getListArticles();
  }, [article.category]);

  let test = new Date();
  let dateformat = Date.parse(test.toString(article.createdAt));

  const back = () => {
    history.goBack();
  };

  const activeClick1 = () => {
    setClick1("true");
  };

  let clickStatus1;
  if (click1 === "true") {
    clickStatus1 = (
      <Fragment>
        <div className="BrowserNavbar">
          <p>Sign in to comment this post</p>
        </div>
        <BlogLogin></BlogLogin>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div id="TitleLink">
        <h2>{article.title}</h2>
      </div>
      <div className="BrowserNavbar">
        {user === "Visitor" && (
          <p>
            "Writed by{" "}
            {article.author_avatar === "null" && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}
            {article.author_avatar !== "null" && (
              <img
                src={article.author_avatar}
                className="profile-img-card"
                alt={article.author}
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}{" "}
            {article.author}. Sign in to comment"
          </p>
        )}
        {user.username && (
          <p>
            "Writed by{" "}
            {article.author_avatar === "null" && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}
            {article.author_avatar !== "null" && (
              <img
                src={article.author_avatar}
                className="profile-img-card"
                alt={article.author}
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}{" "}
            {article.author}. Logged as{" "}
            {!user.avatar && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="guest"
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.username}
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}
            {user.username}."
          </p>
        )}
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
              {(article.category === "News" && (
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
              {(article.category === "FrontEnd" && (
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
              {(article.category === "BackEnd" && (
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
              {(article.category === "Life" && (
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
              {(article.category === "Others" && (
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
        <div
          className="backbutton"
          style={{
            position: "relative",
            marginBottom: "25px",
            zIndex: "5",
            marginTop: "2%",
          }}
        >
          {/*<Link
              to={`/blog/${article.category}`}
              className="btn btn-warning"
              style={{ color: "white", textDecoration: "none" }}
            >
              Back
            </Link>*/}
          <button
            type="button"
            className="btn btn-warning"
            onClick={back}
            style={{ color: "white", textDecoration: "none" }}
          >
            Back
          </button>
        </div>
        <div id="BlogHomeArticle">
          <div className="articleSoloHeader">
            <div className="articleDescription">
              <div className="description-bg">
                <div
                  className="description-bubble"
                  style={{ backgroundColor: article.color }}
                ></div>
              </div>
              <div className="description-content">
                <h2 style={{ color: article.color }}>{article.description}</h2>
              </div>
            </div>
            <div id="ArticleImageFrame">
              <img
                src={
                  !article.link && !article.image
                    ? "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    : article.image
                    ? article.image
                    : article.link
                }
                alt={article.title}
              ></img>
            </div>
            <div className="articleSoloContent">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            <div className="articleSoloInfo">
              <ul>
                <li>
                  <strong>Writed by: </strong>
                  <p>
                    {article.author_avatar === "null" && (
                      <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="user-img-card"
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "inline-block",
                          marginBottom: "0",
                          marginRight: "2px",
                        }}
                      ></img>
                    )}
                    {article.author_avatar !== "null" && (
                      <img
                        src={article.author_avatar}
                        className="user-img-card"
                        alt={article.author}
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "inline-block",
                          marginBottom: "0",
                          marginRight: "2px",
                        }}
                      ></img>
                    )}
                    {article.author}
                  </p>
                </li>
                <li>
                  <strong>Date: </strong>
                  <p>
                    {new Intl.DateTimeFormat("nl-BE", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(dateformat)}
                  </p>
                </li>
                <li>
                  <strong>Tag: </strong>
                  <p>#{article.category}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="relatedArticles">
            <div className="ComponentTitle">
              <div>
                <h1>Related posts</h1>
              </div>
            </div>
            <ul>
              {listArticles.map((listarticle) => (
                <Link
                  to={`/blog/${listarticle.category}/${listarticle.id}/${listarticle.title}`}
                  style={{ textDecoration: "none" }}
                  key={listarticle.id}
                >
                  {listarticle.id !== article.id && (
                    <li>
                      <p>{listarticle.title}</p>
                    </li>
                  )}
                </Link>
              ))}
            </ul>
          </div>
          <div className="commentArticle">
            <div className="ComponentTitle" id="componentTitle">
              <div>
                <h1>Write a comment</h1>
              </div>
            </div>
            {user === "Visitor" && (
              <p>
                To comment, please: &nbsp;
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={activeClick1}
                >
                  Sign in
                </button>
              </p>
            )}
            {user.username && (
              <ArticleCreateCom articleId={articleId} user={user} />
            )}
            {clickStatus1}
          </div>
          <ArticleReadComs articleId={articleId} articleName={article.title} />
        </div>
      </div>
    </Fragment>
  );
};

export default BlogIdArticle;
