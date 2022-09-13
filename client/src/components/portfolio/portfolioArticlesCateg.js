import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import ArticleId from "./articeId";

const PortfolioArticlesCateg = ({ category }) => {
  const [allArticles, setAllArticles] = useState([]);
  const [sortButton, setSortButton] = useState(true);
  const postLimit = 6;
  const totalPages = Math.ceil(allArticles.length / postLimit);
  const pagesArray = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPost, setLastPost] = useState(3);
  const [firstPost, setFirstPost] = useState(0);

  useEffect(() => {
    const getAllArticles = async () => {
      try {
        const response = await fetch(
          `/api/articles/portfolio/${category}/true`
        );
        const jsonData = await response.json();
        setAllArticles(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllArticles();
  }, [category]);

  useEffect(() => {
    setLastPost(currentPage * postLimit);
    setFirstPost(lastPost - postLimit);
  }, [currentPage, lastPost]);

  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  const pageChange = async (page) => {
    try {
      setCurrentPage(page);
    } catch (err) {
      console.error(err.message);
    }
  };

  const FilterByNew = async () => {
    try {
      setSortButton(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const FilterByOld = async () => {
    try {
      setSortButton(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  let showPage;
  if (currentPage) {
    if (sortButton === true) {
      showPage = (
        <div id="BlogHome">
          {allArticles
            .sort(
              ({ id: previousID }, { id: currentID }) => currentID - previousID
            )
            .slice(firstPost, lastPost)
            .map((article) => (
              <div className="blogFrame" key={article.id}>
                <Link
                  to={`/blog/${article.category}/${article.id}/${article.title}`}
                  id="Link"
                >
                  <div className="blogArticle">
                    <div
                      className="blogInfo"
                      style={{
                        background: `url("${
                          !article.image
                            ? article.category === "Snippets"
                              ? "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                              : "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80"
                            : article.image
                        }") center center no-repeat`,
                        backgroundSize: "contain",
                        backgroundColor: "white",
                      }}
                    >
                      <h1>{article.title}</h1>
                    </div>
                    <div className="blogDescription">
                      <p>
                        {article.description.length > 490
                          ? `${article.description.substring(0, 450)}...`
                          : article.description + "..."}
                      </p>
                      {/* <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      /> */}
                    </div>
                    {/* <div className="blogContent">
                      <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    </div> */}
                    <div className="blogDatum">
                      <p>
                        {new Intl.DateTimeFormat("nl-BE", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }).format(Date.parse(article.createdAt))}{" "}
                        - By{" "}
                        {article.author_avatar === "null" && (
                          <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                            style={{
                              width: "20px",
                              height: "20px",
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
                              width: "20px",
                              height: "20px",
                              display: "inline-block",
                              marginBottom: "0",
                              marginRight: "2px",
                            }}
                          ></img>
                        )}
                        {"  "}
                        {article.author}
                      </p>
                    </div>
                  </div>
                  <div className="blogFooter">
                    <h2>Read more...</h2>
                  </div>
                </Link>
                {article.category === "Projects" ? (
                  article.link ? (
                    <div className="projectLink">
                      <a href={article.link}>
                        <h2>Project Repository</h2>
                      </a>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {article.category === "Snippets" ? (
                  article.link ? (
                    <div className="projectLink">
                      <a href={article.link}>
                        <h2>Codepen Demo</h2>
                      </a>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
      );
    } else {
      showPage = (
        <div id="BlogHome">
          {allArticles
            .sort(
              ({ id: previousID }, { id: currentID }) => previousID - currentID
            )
            .slice(firstPost, lastPost)
            .map((article) => (
              <div className="blogFrame" key={article.id}>
                <Link
                  to={`/blog/${article.category}/${article.id}/${article.title}`}
                  id="Link"
                >
                  <div className="blogArticle">
                    <div
                      className="blogInfo"
                      style={{
                        background: `url("${
                          !article.image
                            ? article.category === "Snippets"
                              ? "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                              : "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80"
                            : article.image
                        }") center center no-repeat`,
                        backgroundSize: "contain",
                        backgroundColor: "white",
                      }}
                    >
                      <h1>{article.title}</h1>
                    </div>
                    <div className="blogDescription">
                      <p>
                        {article.description.length > 490
                          ? `${article.description.substring(0, 450)}...`
                          : article.description + "..."}
                      </p>
                      {/* <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      /> */}
                    </div>
                    {/* <div className="blogContent">
                      <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    </div> */}
                    <div className="blogDatum">
                      <p>
                        {new Intl.DateTimeFormat("nl-BE", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }).format(Date.parse(article.createdAt))}{" "}
                        - By{" "}
                        {article.author_avatar === "null" && (
                          <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                            style={{
                              width: "20px",
                              height: "20px",
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
                              width: "20px",
                              height: "20px",
                              display: "inline-block",
                              marginBottom: "0",
                              marginRight: "2px",
                            }}
                          ></img>
                        )}
                        {"  "}
                        {article.author}
                      </p>
                    </div>
                  </div>
                  <div className="blogFooter">
                    <h2>Read more...</h2>
                  </div>
                </Link>
                {article.category === "Projects" ? (
                  article.link ? (
                    <div className="projectLink">
                      <a href={article.link}>
                        <h2>Project Repository</h2>
                      </a>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {article.category === "Snippets" ? (
                  article.link ? (
                    <div className="projectLink">
                      <a href={article.link}>
                        <h2>Codepen Demo</h2>
                      </a>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
      );
    }
  }

  return (
    <Fragment>
      <div
        className="dataFilter"
        style={{
          width: "50%",
          minHeight: "50px",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-around",
          margin: "auto",
          marginTop: "2%",
        }}
      >
        <b>Sort by: </b>
        <div>
          {sortButton === true && (
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: "3px 6px" }}
              onClick={FilterByNew}
            >
              Newest <i className="fas fa-arrow-up"></i>
            </button>
          )}
          {sortButton !== true && (
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: "3px 6px" }}
              onClick={FilterByOld}
            >
              Oldest <i className="fas fa-arrow-down"></i>
            </button>
          )}
          {/*message*/}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        {pagesArray.map((page) => (
          <div key={page}>
            {(currentPage === page && (
              <button
                className="btn btn-warning"
                onClick={() => pageChange(page)}
                style={{ padding: "2px 5px", marginRight: "5px" }}
              >
                {page}
              </button>
            )) || (
              <button
                className="btn btn-hover"
                onClick={() => pageChange(page)}
                style={{ padding: "2px 5px", marginRight: "5px" }}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>
      {showPage}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        {pagesArray.map((page) => (
          <div key={page}>
            {(currentPage === page && (
              <button
                className="btn btn-warning"
                onClick={() => pageChange(page)}
                style={{ padding: "2px 5px", marginRight: "5px" }}
              >
                {page}
              </button>
            )) || (
              <button
                className="btn btn-hover"
                onClick={() => pageChange(page)}
                style={{ padding: "2px 5px", marginRight: "5px" }}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default PortfolioArticlesCateg;
