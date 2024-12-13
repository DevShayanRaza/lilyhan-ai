import React, { useCallback, useRef, useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js";
import DragNDrop from "../svg/DragNDrop";
import UploadFile from "../svg/UploadFile";
import ViewDetails from "../svg/ViewDetails";
import ViewDetailsGradient from "../svg/ViewDetailsGradient";
import Edit from "../svg/Edit";
import ChatField from "../components/ChatField";
import InvoiceFields from "../components/InvoiceFields";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page, pdfjs } from "react-pdf";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import pdf from "./1.pdf";
// import pdff from "../assets/Race.pdf";
import "../Sample.css";
import axios from "axios";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};
const resizeObserverOptions = {};

const maxWidth = 800;
function OcrEngine() {
  const fileInputRef = useRef(null);
  const [fileUrl] = useState("./1.pdf"); // Path to your PDF
  const pdfPath = `${process.env.PUBLIC_URL}/Race.pdf`; // PDF path in public folder
  console.log(pdfPath, "pdfPath");

  const modalContainerRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [fileStatuses, setFileStatuses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState("./1_page.pdf");
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [fields, setFields] = useState([]);
  const [response, setResponse] = useState(null);

  const onResize = useCallback((entries) => {
    const [entry] = entries;
    console.log(entry.contentRect.width, "entry.contentRect.width");
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event) {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = (numPages) =>
    setCurrentPage((prev) => Math.min(prev + 1, numPages));

  console.log(selectedFile, "selectedFile");
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  // Save data to local storage
  const saveToLocalStorage = async () => {
    const filesWithContent = await Promise.all(
      files.map(async (file) => {
        const content = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });

        return { name: file.name, type: file.type, content };
      })
    );

    const data = {
      files: filesWithContent,
      fileStatuses,
    };

    localStorage.setItem("ocrData", JSON.stringify(data));
  };

  // Load data from local storage
  const loadFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("ocrData"));
    if (data) {
      const loadedFiles = data.files.map(
        (file) =>
          new File([dataURLToBlob(file.content)], file.name, {
            type: file.type,
          })
      );
      console.log(loadedFiles, "loadedFiles");
      setFiles(loadedFiles);
      setFileTypes(data.files.map((file) => file.type));
      setFileStatuses(data.fileStatuses);
    }
  };

  // Helper Function to Convert Base64 to Blob
  const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(",");
    const mime = parts[0].match(/:(.*?);/)[1];
    const binary = atob(parts[1]);
    const array = [];

    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: mime });
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [files, fileStatuses]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    console.log("event here");
    const newFiles = Array.from(event.target.files);
    const newFileTypes = newFiles.map((file) => file.type);
    const newFileStatuses = newFiles.map(() => "Processing");

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setFileTypes((prevFileTypes) => [...prevFileTypes, ...newFileTypes]);
    setFileStatuses((prevStatuses) => [...prevStatuses, ...newFileStatuses]);
    // handleSubmit();
  };

  // const afterUpload = ()=>{

  // }

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const droppedFileTypes = droppedFiles.map((file) => file.type);
    const droppedFileStatuses = droppedFiles.map(() => "Processing");

    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    setFileTypes((prevFileTypes) => [...prevFileTypes, ...droppedFileTypes]);
    setFileStatuses((prevStatuses) => [
      ...prevStatuses,
      ...droppedFileStatuses,
    ]);
  };

  const handleViewDetails = (file) => {
    setSelectedFile(file);
    setIsModalVisible(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log("here");
    if (!file) {
      alert("Please upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        "http://20.49.52.200:8000/api/v1/extract_pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("data", data);
      setResponse(data);

      // Extract fields dynamically from the response
      if (data.length > 0 && data[0].result) {
        const result = data[0].result;
        setFields(
          Object.keys(result).map((key) => ({
            label: key,
            value: result[key],
            editable: true,
          }))
        );
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      alert("File upload failed. Please try again.");
    }
  };

  const handleCloseModal = () => {
    // setIsModalVisible(false);
    // setSelectedFile(null);
  };

  const renderPDF = (file) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const pdfData = new Uint8Array(event.target.result);
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

      modalContainerRef.current.innerHTML = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        await page.render(renderContext).promise;
        modalContainerRef.current.appendChild(canvas);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // useEffect(() => {
  //   if (selectedFile && selectedFile.type === "application/pdf") {
  //     renderPDF(selectedFile);
  //   }
  // }, [selectedFile]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setFileStatuses((prevStatuses) => prevStatuses.map(() => "Complete"));
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [files]);

  return (
    <>
      <div className="relative  ml-5">
        {" "}
        {/* Added relative class */}
        <div className="ocrengine">
          {/* Heading */}
          <div className="flex justify-between">
            <div className="ml-6 flex flex-col justify-center mb-14">
              <h2 className="font-bold text-[32px]">OCR Engine</h2>
              <p>Lorem ipsum dolor sit amet Maecenas rutru.</p>
            </div>
            <div onClick={handleBrowseClick}>
              <UploadFile />
            </div>
          </div>

          {/* Drag and drop area */}
          <div
            className="w-[98%] border-[1px] border-[#0056B399] rounded h-[238px] custom-dotted-border flex gap-2 items-center justify-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <DragNDrop />
            <p className="font-bold">
              Drag and drop files here or{" "}
              <span
                onClick={handleBrowseClick}
                className="cursor-pointer text-[#0056B3] ml-2 underline font-bold"
              >
                Browse File
              </span>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
          </div>

          <h3 className="mt-4 font-bold text-[32px]">Recent Documents:</h3>

          {/* File List */}
          <div className="bg-[#F3F3F3] w-[97%] h-[350px] overflow-y-scroll customsb border-[1px] border-[#D8D6D6] rounded mt-5 px-20">
            {/* Headings */}
            <div className="flex mt-10 ml-5">
              <h4 className="font-bold text-[16px] w-1/4">File Name</h4>
              <h4 className="font-bold text-[16px] w-1/4">Type</h4>
              <h4 className="font-bold text-[16px] w-1/4">Status</h4>
              <h4 className="font-bold text-[16px] w-1/4">Action</h4>
            </div>

            {/* File Items */}
            <div className="w-full">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center font-bold mb-12 ml-8 mr-10 py-[2px] pt-10 rounded border-b-[1px] border-[#D8D6D6] pb-10 last:border-b-0 last:border-pb-0 "
                >
                  <p className="w-1/4">{file.name}</p>
                  <p className="w-1/4 font-semibold">{fileTypes[index]}</p>
                  <div className="w-1/4">
                    <p
                      className={`w-[40%] text-center -ml-5 rounded text-[14px] py-1 ${
                        fileStatuses[index] === "Complete"
                          ? "bg-[#D0F9EE] text-[#19BA92] -ml-0"
                          : "bg-[#0056B3] text-white"
                      }`}
                    >
                      {fileStatuses[index]}
                    </p>
                  </div>
                  <div
                    onClick={() => handleViewDetails(file)}
                    className="w-1/4 cursor-pointer"
                  >
                    <ViewDetails />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Modal */}
        {isModalVisible && selectedFile && (
          <div
            onClick={handleCloseModal}
            className={`absolute top-0 left-0 w-full bg-white customsb flex items-center justify-center z-50 ${
              selectedFile.type === "application/pdf"
                ? "bg-gray-200"
                : "bg-white"
            }`}
          >
            {/* Child Container */}
            <div
              // Prevent click event from bubbling up
              className={`overflow-auto ${
                selectedFile.type === "application/pdf"
                  ? "w-[100%] h-[100%]"
                  : "w-[100%] h-[100%]"
              } bg-white`}
            >
              {/* Close Button */}
              {/* <button
        onClick={handleCloseModal}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Close
      </button> */}

              {/* <div className="flex justify-between mb-5">
                <div className="flex flex-col">
                  <h3
                    className="text-3xl font-bold mb-4"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Document Processing
                  </h3>
                  <p>Lorem ipsum dolor sit amet Maecenas rutru.</p>
                </div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex gap-5"
                >
                  <div>
                    <ViewDetailsGradient />
                  </div>
                  <div className="flex justify-center items-center bg-[#EDEDED] w-[176px] h-[43px] rounded-[10px] cursor-pointer">
                    <p className="font-bold">Download</p>
                  </div>
                  <Edit />
                </div>
              </div> */}

              <div className="w-[95%] mx-auto">
                <div className="flex gap-7 mb-5">
                  <div
                    ref={modalContainerRef}
                    className={`rounded flex justify-center ${
                      selectedFile.type === "application/pdf"
                        ? "w-[43%] h-[750px] customsb"
                        : "w-[43%] h-[750px]"
                    }`}
                  >
                    {/* {selectedFile.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt={selectedFile.name}
                        className="w-[100%] max-h-full rounded shadow"
                      />
                    ) : selectedFile.type === "application/pdf" ? (
                      <div className="text-center w-[43%] max-h-full rounded shadow">
                        Rendering PDF...
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        Preview not available for this file type.
                      </p>
                    )} */}
                    {/* 
                    <div className="pdf-div">
                   
                      <Document
                        file={pdf}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        {Array.apply(null, Array(numPages))
                          .map((x, i) => i + 1)
                          .map((page) => {
                            return (
                              <Page
                                size="A4"
                                style={{ height: 50 }}
                                pageNumber={1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                              />
                            );
                          })}
                      </Document>
                    </div> */}

                    <div className="Example">
                      <div className="Example__container">
                        <div
                          className="Example__container__document"
                          ref={setContainerRef}
                        >
                          <Document
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                            options={options}
                          >
                            {Array.from(new Array(numPages), (_el, index) => (
                              <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={
                                  containerWidth
                                    ? Math.min(containerWidth, maxWidth)
                                    : maxWidth
                                }
                              />
                            ))}
                          </Document>
                        </div>
                      </div>
                    </div>

                    {/* <div className="h-full w-[40%]">
                      <button onClick={handlePreviousPage}>Previous</button>
                      <button onClick={handleNextPage}>Next</button>
                      <Worker
                        workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}
                      >
                        <Viewer
                          fileUrl={pdfPath}
                          initialPage={currentPage - 1}
                        />
                      </Worker>
                    </div> */}
                  </div>

                  <div
                    className={`${
                      selectedFile.type === "application/pdf"
                        ? "w-[55%] h-[750px] customsb"
                        : "w-[55%] h-[750px] customsb"
                    } bg-[#F3F3F3] rounded-[10px]`}
                  >
                    <div className="flex justify-start p-4">
                      <p className="text-[32px] font-[700]">Title</p>
                    </div>
                    <div className="w-[95%] h-[85%] mx-auto overflow-y-scroll customsb p-2 bg-[#F3F3F3]">
                      <InvoiceFields />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <ChatField />
      </div>
    </>
  );
}

export default OcrEngine;
