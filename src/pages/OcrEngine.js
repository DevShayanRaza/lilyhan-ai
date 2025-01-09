import React, { useCallback, useRef, useState, useEffect } from "react";
import DragNDrop from "../svg/DragNDrop";
import UploadFile from "../svg/UploadFile";
import ViewDetails from "../svg/ViewDetails";
import ChatField from "../components/ChatField";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../Sample.css";
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
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  // console.log(pageRef, "pageRef");
  const [scale, setScale] = useState(1.0); // For scaling support

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
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  // console.log(selectedFile, "selectedFile");

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
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedFile(null);
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
        <ChatField />
      </div>
    </>
  );
}

export default OcrEngine;
