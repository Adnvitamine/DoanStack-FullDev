import { Fragment, useEffect, useState } from "react";
import {
  Link
} from "react-router-dom";
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

  const back = () =>{
    history.goBack();
  }

  const activeClick1 = () =>{
    setClick1("true");
  }

  let clickStatus1;
  if(click1==="true"){
    clickStatus1 = <Fragment>
    <div className="BrowserNavbar">
        <p>Sign in to comment this post</p>
    </div><BlogLogin></BlogLogin></Fragment>;
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
            {article.author}. Logged as 
            {!user.avatar && (
              <img
                src= "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt= "guest"
                className="profile-img-card"
                style={{
                  width: "25px",
                  height: "25px",
                  display: "inline-block",
                  marginBottom: "0",
                  marginRight: "2px",
                }}></img>
            )}
            {user.avatar && (
              <img
              src={user.avatar}
              alt= {user.username}
              className="profile-img-card"
              style={{
                width: "25px",
                height: "25px",
                display: "inline-block",
                marginBottom: "0",
                marginRight: "2px",
              }}>
              </img>
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
                <Link to="/blog/News" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
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
                <Link to="/blog/FrontEnd" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
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
                <Link to="/blog/BackEnd" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
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
                <Link to="/blog/Life" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
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
                <Link to="/blog/Others" style={{ fontSize: "18px",color: "rgb(0, 162, 255)" }}>
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
        <div id="BlogHome">
          <div className="backbutton" style={{ marginBottom: "25px" }}>
            <button type="button" className="btn btn-warning" onClick={back} style={{ color: "white", textDecoration: "none"}}>
              Back
            </button>
          </div>
          <div id="BlogHomeArticle">
            <div className="articleSoloHeader">
              <div id="ImageFrame">
                <img
                  src={article.image}
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
            <div className="articleSoloContent">
              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            <div className="relatedArticles">
            <div className="ComponentTitle">
                <div>
                  <h1>Related posts</h1>
                </div>
              </div>
              <ul>
                  {listArticles.map((listarticle)=>(
                    <Link to={`/blog/${listarticle.category}/${listarticle.id}/${listarticle.title}`} key={listarticle.id} style={{ textDecoration: "none"}}>
                        { listarticle.id !== article.id && (
                          <li><p>{listarticle.title}</p></li>
                        )}
                    </Link>
                  ))}
                </ul>
            </div>
            <div className="commentArticle">
              <div className="ComponentTitle">
                <div>
                  <h1>Write a comment</h1>
                </div>
              </div>
              {user === "Visitor" && (<p>
                To comment, please: &nbsp;
                <button type="button" className="btn btn-warning" onClick={activeClick1}>Sign in</button> 
              </p>)}
              {user.username && (
                <ArticleCreateCom articleId={articleId} user={user} />
              )}
              {clickStatus1}
            </div>
              <ArticleReadComs
                articleId={articleId}
                articleName={article.name}
              />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogIdArticle;
