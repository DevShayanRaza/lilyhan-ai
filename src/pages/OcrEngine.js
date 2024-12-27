import React, { useCallback, useRef, useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import DragNDrop from "../svg/DragNDrop";
import UploadFile from "../svg/UploadFile";
import ViewDetails from "../svg/ViewDetails";
import ChatField from "../components/ChatField";
import InvoiceFields from "../components/InvoiceFields";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../Sample.css";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const pdfPath = `${process.env.PUBLIC_URL}/Race.pdf`; // PDF path in public folder
  // console.log(pdfPath, "pdfPath");

  const modalContainerRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(true);
  const [fileTypes, setFileTypes] = useState([]);
  const [fileStatuses, setFileStatuses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState("./1_page.pdf");
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [fields, setFields] = useState([]);
  const [responeData, setResponseData] = useState();

  const [response, setResponse] = useState(null);
  const pageRef = useRef(null); // Reference to the PDF page canvas
  const [pageRefVisible, setPageRefVisible] = useState(false); // For scaling support

  // console.log(pageRef, "pageRef");
  const [scale, setScale] = useState(1.0); // For scaling support
  useEffect(() => {
    if (!pageRefVisible) {
      return;
    }
    // console.log(pageRef.current, "my pageref");
  }, [pageRefVisible]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFileStatuses((prevStatuses) => prevStatuses.map(() => "Complete"));
    }, 5000);

    return () => clearTimeout(timer);
  }, [files]);
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [files, fileStatuses]);

  const onResize = useCallback((entries) => {
    const [entry] = entries;
    // console.log(entry.contentRect.width, "entry.contentRect.width");
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

  // console.log(selectedFile, "selectedFile");
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handlePageRenderSuccess = () => {
    if (pageRef.current) {
      console.log(pageRef.current.offsetWidth, "only page ref");

      const canvas = pageRef.current.querySelector("canvas");
      console.log(canvas, "canvascanvascanvas");
      if (canvas) {
        const containerWidth = pageRef.current.offsetWidth; // Container width
        console.log(containerWidth, "containerWidth");
        const naturalWidth = canvas.width; // Natural canvas width
        const newScale = containerWidth / naturalWidth; // Calculate scale
        setScale(newScale); // Update scale
      }
    }
  };
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
    // const file = event.target.files[0]; // Get the first selected file
  };

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = async () => {
  //     const pdfDoc = await PDFDocument.load(reader.result);
  //     const modifiedPdfBytes = await pdfDoc.save();

  //     const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  //     setPdfUrl(URL.createObjectURL(blob));
  //     console.log(pdfUrl, "==============pdfurl=========");
  //   };
  //   reader.readAsArrayBuffer(file);
  // };
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
    console.log(file, "handleViewDetails file");
    navigate("/ocr-engine-detail", { state: { file } });

    // setSelectedFile(file);
    // setIsModalVisible(true);
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = async () => {
    //   const pdfDoc = await PDFDocument.load(reader.result);
    //   const modifiedPdfBytes = await pdfDoc.save();

    //   const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
    //   setPdfUrl(URL.createObjectURL(blob));
    //   console.log(pdfUrl, "==============pdfurl=========");
    // };
    // reader.readAsArrayBuffer(file);
    // handleSubmit(file);
  };

  // Handle form submission
  const handleSubmit = async (file) => {
    console.log(file, "uploaded file------------------");
    // e.preventDefault();
    console.log("here");
    if (!file) {
      alert("Please upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      console.log("in respone api");
      const { data } = await axios.post(
        "http://20.49.52.200:8000/api/v1/extract_pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("api hit response data", data);
      setResponse(data);

      // Extract fields dynamically from the response
      if (data.length > 0 && data[0].result) {
        setLoader(false);
        const result = data[0].result;
        setResponseData(result);
        console.log(result, "result result result");
        setFields(
          Object.keys(result).map((key) => ({
            label: key,
            value: result[key],
            editable: true,
          }))
        );
      }
    } catch (error) {
      setLoader(false);

      // setIsModalVisible(true);
      console.log(error, "error");
      console.error("Error uploading the file:", error);
      alert("File upload failed. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedFile(null);
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
  const data = {
    highlights: [
      {
        field: "NDossier",
        coordinates: { x: 200, y: 100, width: 200, height: 10 },
      },
      {
        field: "client",
        coordinates: { x: 50, y: 200, width: 300, height: 50 },
      },
    ],
  };

  const renderHighlights = () => {
    console.log("here=======");
    // console.log(pageRef, "pageRef");
    if (!pageRef.current) return null;
    // console.log(pageRef, "pageRefpageRef");
    const pageCanvas = pageRef.current;
    // console.log(pageCanvas, "pageCanvas");
    const { offsetHeight, offsetWidth } = pageCanvas;
    console.log(pageCanvas, "pageCanvaspageCanvas");
    const pdfScale = offsetWidth / pageCanvas.naturalWidth || 1;
    console.log(pdfScale, "pdfScalepdfScalepdfScale");

    return data.highlights.map((highlight, index) => {
      const { x, y, width, height } = highlight.coordinates;
      return (
        <div
          key={index}
          style={{
            position: "absolute",
            top: y * pdfScale, // Adjust for scaling
            left: x * pdfScale,
            width: width * pdfScale,
            height: height * pdfScale,
            backgroundColor: "rgba(255, 255, 0, 0.5)", // Yellow highlight
            pointerEvents: "none",
          }}
        ></div>
      );
    });
  };

  return (
    <>
      <div className="relative  ml-2">
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
            // onClick={handleCloseModal}
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
              <div className="flex justify-between mb-5">
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
                  <div
                    className="flex justify-center items-center bg-[#EDEDED] w-[176px] h-[43px] rounded-[10px] cursor-pointer"
                    onClick={handleCloseModal}
                  >
                    <p className="font-bold">Close</p>
                  </div>
                  {/* <Edit /> */}
                </div>
              </div>

              <div className="w-[95%] mx-auto">
                <div className="flex gap-7 mb-5">
                  <div
                    ref={modalContainerRef}
                    className={`rounded flex justify-center ${
                      selectedFile.type === "application/pdf"
                        ? "w-[73%] md:w-[50%] h-[750px] customsb md:mr-[40px] mr-[10px]"
                        : "w-[43%] h-[750px]"
                    }`}
                  >
                    <div className="Example">
                      <div className="Example__container">
                        <div className="Example__container__document">
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              // width: "100%",
                            }}
                          >
                            <Document
                              file={selectedFile}
                              onLoadSuccess={onDocumentLoadSuccess}
                              options={options}
                            >
                              {Array.from(new Array(numPages), (_el, index) => (
                                <Page
                                  key={`page_${index + 1}`}
                                  pageNumber={index + 1}
                                  renderAnnotationLayer={false}
                                  scale={scale}
                                  onRenderSuccess={handlePageRenderSuccess}
                                  width={containerWidth}
                                />
                              ))}
                              {renderHighlights()}
                            </Document>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      selectedFile.type === "application/pdf"
                        ? "w-[55%] h-[750px] customsb"
                        : "w-[55%] h-[750px] customsb"
                    } bg-[#F3F3F3] rounded-[10px]`}
                  >
                    <div className="flex justify-start p-4 px-10">
                      <p className="text-[32px] font-[700]">
                        {selectedFile.name}
                      </p>
                    </div>
                    <div className="w-[95%] h-[85%] mx-auto overflow-y-scroll customsb p-2 bg-[#F3F3F3]">
                      <InvoiceFields result={responeData} loader={loader} />
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
