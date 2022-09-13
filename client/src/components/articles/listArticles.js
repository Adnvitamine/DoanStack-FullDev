import { Fragment, useEffect, useState } from "react";
import ViewArticle from "./viewArticle";
import EditArticle from "./editArticle";
import QuillEdit from "./quillEdit";

const ListArticles = ({ currentUser }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);
  // Delete Article function
  const deleteArticle = async (id) => {
    try {
      const deleteArticle = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });
      // window.location="/";
      setArticles(articles.filter((article) => article.id !== id));
      console.log(deleteArticle);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(
          `/api/articles/author_id/${currentUser.id}`
        );
        const jsonData = await response.json();
        setArticles(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };
    getArticles();
  }, [currentUser.id]);

  return (
    <Fragment>
      <div className="container text-center" id="articlesList">
        <div className="ComponentTitle">
          <div>
            <h1>
              {currentUser.username}'s posts ({articles.length})
            </h1>
          </div>
        </div>

        {!articles.length && (
          <div className="ComponentEmpty">
            <div>Empty</div>
          </div>
        )}

        {articles
          .sort(
            ({ id: previousID }, { id: currentID }) => currentID - previousID
          )
          .map((article) => (
            <div className="articleCard" key={article.id}>
              <div className="articleCardName">
                <p>
                  {article.published === false && (
                    <i className="fas fa-circle" id="miniStatusFalse"></i>
                  )}
                  {article.published === true && (
                    <i className="fas fa-circle" id="miniStatusTrue"></i>
                  )}
                  {article.title}
                </p>
              </div>
              <div className="articleCardImage">
                {/* {article.image ? (
                <img
                  id="articleCardImage"
                  src={article.image}
                  alt={article.title}
                  style={{ width: "100%" }}
                />
              ) : (
                ""
              )}
              {!article.image && article.link ? (
                <img
                  id="articleCardImage"
                  src={article.link}
                  alt={article.title}
                  style={{ width: "100%" }}
                />
              ) : (
                ""
              )} */}
                {article.category !== "Projects" &&
                article.category !== "Snippets" ? (
                  !article.image && !article.link ? (
                    <img
                      id="articleCardImage"
                      src="https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt={article.title}
                      style={{ width: "100%" }}
                    />
                  ) : !article.image ? (
                    <img
                      id="articleCardImage"
                      src={article.link}
                      alt={article.title}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <img
                      id="articleCardImage"
                      src={article.image}
                      alt={article.title}
                      style={{ width: "100%" }}
                    />
                  )
                ) : article.category === "Projects" ? (
                  !article.image ? (
                    <img
                      id="articleCardImage"
                      src="https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80"
                      alt={article.title}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <img
                      id="articleCardImage"
                      src={article.image}
                      alt={article.title}
                      style={{ width: "100%" }}
                    />
                  )
                ) : article.category === "Snippets" ? (
                  !article.image ? (
                    <img
                      id="articleCardImage"
                      src="https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt={article.title}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <img
                      id="articleCardImage"
                      src={article.image}
                      alt={article.title}
                      style={{ width: "100%" }}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="articleCardContent">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              <div className="articleCardInfo">
                <div className="infoAuthor">
                  Author: <b>{article.author}</b>
                </div>
              </div>
              <div className="articleCardInfo">
                <div className="infoDate">
                  Date:{" "}
                  <b>
                    {new Intl.DateTimeFormat("nl-BE", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(Date.parse(article.createdAt))}
                  </b>
                </div>
              </div>
              <div className="articleCardAction">
                <ViewArticle article={article} />
                <EditArticle article={article} currentUser={currentUser} />
                <QuillEdit article={article} currentUser={currentUser} />
                {/*
                        <EditArticle article={article} />*/}
                <button
                  className="miniDeleteButton"
                  onClick={() => deleteArticle(article.id)}
                >
                  <i className="far fa-trash-alt"></i>
                  <p>Delete</p>
                </button>
              </div>
            </div>

            /*
                        
                        
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.image}</td>
                            <td>{product.category}</td>
                            <td>{product.price}$</td>
                            <td>{product.vendor}</td>
                            {product.status === false &&
                            <td>Waiting</td>
                            }
                            {product.status === true &&
                            <td>On Sale</td>
                            }
                            <td><ViewProduct product={product} /></td>                      
                            <td><EditProduct product={product} /></td>
                            <td><button id="miniDeleteButton" onClick={()=> deleteProduct(product.id)} ><i className="las la-trash-alt"><p>Delete</p></i></button></td>
                         
                        </tr>
                        
                        
                        
                        
                        
                        
                        */
          ))}
      </div>
    </Fragment>
  );
};

export default ListArticles;
