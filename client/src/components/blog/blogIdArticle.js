import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCreateCom from "./articleComs/articleCreateCom";
import ArticleReadComs from "./articleComs/articleReadComs";

const BlogIdArticle = ({ articleId, currentUser }) => {
  //const id =
  const [user] = useState(currentUser);
  const [article, setArticle] = useState([]);
  const [listArticles, setListArticles] = useState([]);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetch(
          `/api/articles/${articleId}`
        );
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
        const response = await fetch(
          `/api/articles/post/${article.category}`
        );
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

  return (
    <Fragment>
      <div className="BrowserNavbar">
        {user === "Visitor" && (
          <p>
            "This post is writed with love by{" "}
            {article.author_avatar === "null" && (
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
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
                className="profile-img-card"
                alt={article.author}
                style={{
                  width: "40px",
                  height: "40px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}
              ></img>
            )}{" "}
            {article.author}. To comment, please log in" - DoanStack.be
          </p>
        )}
        {user.username && (
          <p>
            "This post is writed with love by{" "}
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
            {article.author}. You are connected as {user.username}." -
            DoanStack.be
          </p>
        )}
      </div>
      <div id="TitleLink">
        <h1>{article.title}</h1>
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
              {(article.category === "BackEnd" && (
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
              {(article.category === "FrontEnd" && (
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
              {(article.category === "Life" && (
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
              {(article.category === "Others" && (
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
          <div className="backbutton" style={{ marginBottom: "10px" }}>
            <Link
              to={`/${article.category}`}
              className="btn btn-warning"
              style={{ color: "white", textDecoration: "none" }}
            >
              Back
            </Link>
          </div>
          <div id="MoreArticles">
            <div className="header">
              <span className="empty"> </span>
              <p>
                <b>Related Posts</b>
              </p>
            </div>
            <div className="body">
              {listArticles.map((listarticle) => (
                <Link
                  to={`/${listarticle.category}/${listarticle.id}/${listarticle.title}`}
                  key={listarticle.id}
                >
                  <div className="list">
                    {(listarticle.title !== article.title && (
                      <div className="articleImg">
                        <span className="profile-img-card">
                          <img
                            className="profile-img-card"
                            src={listarticle.image}
                            alt={listarticle.title}
                          ></img>
                        </span>
                      </div>
                    )) || (
                      <div className="articleImg">
                        <span
                          className="profile-img-card"
                          style={{ height: "75px" }}
                        >
                          <img
                            className="profile-img-card"
                            src={listarticle.image}
                            alt={listarticle.title}
                          ></img>
                        </span>
                      </div>
                    )}
                    <div className="articleTitle">
                      {(listarticle.title !== article.title && (
                        <b>{listarticle.title}</b>
                      )) || (
                        <b style={{ color: "rgb(38, 253, 38)" }}>
                          {listarticle.title}
                        </b>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div id="BlogHomeArticle">
            <div className="articleSoloHeader">
              <div id="ImageFrame">
                <img
                  src={article.image}
                  style={{ height: "500px" }}
                  alt={article.title}
                ></img>
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
                          className="profile-img-card"
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
                          className="profile-img-card"
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
            <div className="articleSoloContent">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            <div className="commentArticle">
              <div className="ComponentTitle">
                <div>
                  <h1>Write a comment</h1>
                </div>
              </div>
              {user === "Visitor" && <p>Please sign in to write a review</p>}
              {user.username && (
                <ArticleCreateCom articleId={articleId} user={user} />
              )}
            </div>
            <div className="readComments">
              <ArticleReadComs
                articleId={articleId}
                articleName={article.name}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogIdArticle;
