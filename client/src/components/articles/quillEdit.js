import { Fragment, useState, useRef } from "react";
import axios from "axios";
import QuillEditor from "../editor/QuillEditor";
//import CKEditor from '@ckeditor/ckeditor5-react';
//import InlineEditor from '@ckeditor/ckeditor5-build-inline';
//import CustomUpload from '../../js/CustomUploader';

//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//const sanitizeHtml = require('sanitize-html');

const QuillEdit = ({ article }) => {
  const [article_id] = useState(article.id);
  const [title, setTitle] = useState(article.title);
  const [author, setAuthor] = useState(article.author);
  const [author_id] = useState(article.author_id);
  const [author_avatar] = useState(article.author_avatar);
  const [content, setContent] = useState(article.content);
  const [category, setCategory] = useState(article.category);
  const [published, setPublished] = useState(article.published);
  // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accessing input element
  const [file, setFile] = useState(""); // storing the uploaded file
  const [preview, setPreview] = useState("");

  // QUILL EDITOR CHANGE HANDLER
  const onEditorChange = (value) => {
    setContent(value);
    //console.log(content);
  };

  const handleChange = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accesing file
    console.log(file);
    setFile(e.target.files[0]); // storing file

    if (!e.target.files) {
      setPreview({
        file: null,
      });
    } else {
      //console.log(previews);

      setPreview({
        file: URL.createObjectURL(e.target.files[0]),
      });
      //console.log(image);
    }
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
    for (var value of formData.values()) {
      console.log(value);
    }
    axios
      .post("/upload", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res);
        getFile({
          name: res.data.name,
          path: res.data.path,
        });

        //const path = res.data.path;
      })
      .catch((err) => console.log(err));
  };

  // Update article function
  const UpdateArticle = async (e) => {
    console.log(data.path);
    if (data.path === "") {
      const image = article.image;
      console.log(image);
      e.preventDefault();
      try {
        const body = {
          title,
          author,
          author_id,
          image,
          content,
          category,
          published,
          author_avatar,
        };
        const response = await fetch(
          `/api/articles/${article.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        window.location = "";
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      const image = data.path;
      console.log(image);
      e.preventDefault();
      try {
        const body = {
          title,
          author,
          author_id,
          image,
          content,
          category,
          published,
          author_avatar,
        };
        const response = await fetch(
          `/api/articles/${article.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        window.location = "";
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  /*
   
    */
  let imgPreview;
  if (preview) {
    imgPreview = (
      <img
        src={preview.file}
        alt="preview"
        className="imgPreview"
        style={{ width: "100%" }}
      />
    );
  }

  return (
    <Fragment>
      <button
        type="button"
        id="miniEditButton"
        data-toggle="modal"
        data-target={`#EditQuill-id${article.id}`}
      >
        <i className="far fa-edit"></i> <p>QuillEdit</p>
      </button>

      <div className="modal" id={`EditQuill-id${article.id}`}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-name">Edit Article</h4>
              <button
                type="button"
                id="closeButton"
                data-dismiss="modal"
                onClick={() => {
                  setContent(article.content);
                  setTitle(article.title);
                  setPublished(article.published);
                  setAuthor(article.author);
                }}
              >
                <i className="far fa-times-circle"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="uploadContainer">
                {/*
                        <div className="form-group preview">
                            {imgPreview}
                        </div>

                        <div className="form-group">
                            <input type="file" className="form-control" onChange={uploadSingleFile} />
                        </div>
                        
                        */}

                <div className="file-upload">
                  <input
                    type="file"
                    name="file"
                    ref={el}
                    multiple
                    onChange={handleChange}
                    className="inputImage"
                  />
                  <p
                    style={{ width: `${progress}%` }}
                    data-value={progress}
                  ></p>

                  {/* displaying received image*/}
                  <progress
                    max="100"
                    value={progress}
                    className="imageProgressBar"
                  >
                    <div className="progress-bar">
                      <span style={{ width: `${progress}%` }}>{progress}</span>
                    </div>
                  </progress>
                  <div className="form-group preview">
                    {imgPreview}

                    {/*
                                            previews &&
                                            previews.map((file, index) => (
                                                <li className="list-group-item" key={index}>
                                                {file.name}
                                                </li>
                                            ))
                                        */}
                    {/*data.path && <img src={data.path} alt={data.name} />*/}
                  </div>
                </div>

                <button id="uploadButton" onClick={uploadFile}>
                  <i className="fas fa-upload"></i>
                  <p>Upload</p>
                </button>
              </div>

              <form className="mt-5">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Title:</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group col-md-6">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Author:</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="form-row mt-3">
                  <div className="form-group col-md-6">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Publish:</span>
                      </div>
                      <select
                        className="form-control"
                        onChange={(e) => setPublished(e.target.value)}
                      >
                        {published === true && (
                          <option value="true">Online</option>
                        )}
                        {published !== false && (
                          <option value="false">Waiting</option>
                        )}

                        {published === false && (
                          <option value="false">Waiting</option>
                        )}
                        {published !== true && (
                          <option value="true">Online</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="form-group col-md-6">
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Category:</span>
                      </div>
                      <select
                        className="form-control"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value={category} >{category}</option>
                        {category !== "News" && <option>News</option>}
                        {category !== "BackEnd" && <option>BackEnd</option>}
                        {category !== "FrontEnd" && <option>FrontEnd</option>}
                        {category !== "Life" && <option>Life</option>}
                        {category !== "Others" && <option>Others</option>}
                      </select>
                    </div>
                  </div>
                </div>
                {/*<label className="mt-2">Article Description</label>        
                            <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            */}
                <QuillEditor
                  toolbarId={`toolbar${article_id}`}
                  value={content}
                  onEditorChange={onEditorChange}
                />
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                id="editButton"
                data-dismiss="modal"
                onClick={(e) => {
                  UpdateArticle(e);
                }}
              >
                <i className="far fa-edit"></i>
                <p>Edit</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default QuillEdit;
