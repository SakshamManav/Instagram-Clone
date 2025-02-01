import React, { useContext, useState } from "react";
import { UserContext } from "../Context/Usercontext";

export default function Upload() {
  const content = useContext(UserContext);
  const { uploadContent, showspinner, setShowSpinner,uploaded } = content;
  const [showUploadBtn, setshowUploadBtn] = useState(false);
  const [filesState, setFiles] = useState();
  
  function handleFileUpload(event) {
    const fileInput = event.target;
    const files = fileInput.files;
    setFiles(files);
    if (files !== null) {
      setshowUploadBtn(true);
    }
    
  }
 
  async function handleUploadBtn() {
   setShowSpinner(true);
    if (filesState.length > 0) {
      uploadContent("post", filesState[0]); // Pass the files array
    } else {
      console.error("No files selected");
    }
  }
 
  return (
    <div
      className="modal fade"
      style={{ color: "black", marginTop: "70px" }}
      id="staticBackdrop"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div
          className="modal-content"
        >
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              
            ></button>
          </div>
            {!uploaded && <div className="modal-body d-flex justify-content-center align-items-center flex-column">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc3Vjc_mkbP08RNqLPH6llyrhmNrI30iEFTQ&s"
              alt="img"
              height="100"
              width="100"
            />

            <div className="d-flex justify-content-center align-items-center flex-column">
              <h1 style={{ fontWeight: "700", fontSize: "25px" }}>
                Upload images here
              </h1>
              <input
                type="file"
                className=""
                onChange={handleFileUpload}
                style={{ marginLeft: "60px" }}
                
              />
            </div>
            {showUploadBtn && (
              <button
                className="btn btn-primary mt-2 w-50"
                onClick={handleUploadBtn}
              >
                Upload
              </button>
            )}
            {showspinner && <div className="spinner-border text-danger " style={{fontSize:"25px", color:"pink"}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>}
          </div> 
          }
          { 
          uploaded && <div>
          <h1>
            Uploaded successfully !!
          </h1>
         </div>
         }
          
        </div>
      </div>
    </div>
  );
}
