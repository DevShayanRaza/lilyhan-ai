import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";

import ChatField from "../components/ChatField";
import InvoiceFields from "../components/InvoiceFields";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../Sample.css";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};
const resizeObserverOptions = {};
function OcrEngineDetail() {
  const location = useLocation();
  const { file } = location.state || {}; // Add a fallback to prevent errors if state is undefined

  //   const { file } = route.params;
  console.log(file, "detail file");

  const modalContainerRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [fileTypes, setFileTypes] = useState([]);
  const [fileStatuses, setFileStatuses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  //   const [file, setFile] = useState("./1_page.pdf");
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

  const fileSlice = useMemo(() => file.slice(0), [file]);

  useEffect(() => {
    handleSubmit();
  }, []);

  const onResize = useCallback((entries) => {
    const [entry] = entries;
    // console.log(entry.contentRect.width, "entry.contentRect.width");
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

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

  const handleSubmit = async () => {
    console.log(file, "uploaded file------------------");
    setLoader(true);
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
    <div className="w-full h-full flex flex-col">
      {/* Heading Section */}
      <div className="mb-4 mx-6">
        <h3
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Document Processing
        </h3>
        <p>Lorem ipsum dolor sit amet Maecenas rutru.</p>
      </div>

      {/* Main Content (PDF and Invoice Fields) */}
      <div className="flex flex-grow gap-4">
        {/* PDF Viewer Section */}
        <div
          ref={modalContainerRef}
          className={`flex justify-center items-center ${
            selectedFile?.type === "application/pdf"
              ? "w-1/2 h-[750px] customsb mr-[10px]"
              : "w-2/5 xl:w-[87%] 2xl:w-[42%] xl:max-h-[850px] max-h-[full] mx-0 xl:mx-[30px] overflow-auto"
          }`}
        >
          <div className="Example__container__document">
            <Document
              file={file}
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

        {/* {pdfUrl && (
                      <iframe src={pdfUrl} width="100%" height="500px" />
                    )} */}
        {/* Invoice Fields Section */}
        <div
          className={`xl:w-[65%] 2xl:w-[50%] h-[750px] customsb bg-[#F3F3F3] rounded-[10px]`}
        >
          <div className="flex justify-start p-4 px-10">
            <p className="text-[32px] font-[700]">{file?.name}</p>
          </div>
          <div className="w-[95%] h-[80%] mx-auto overflow-y-scroll customsb p-2 bg-[#F3F3F3] rounded-[10px]">
            <InvoiceFields result={responeData} loader={loader} />
          </div>
        </div>
      </div>
      <ChatField />
    </div>
  );
}

export default OcrEngineDetail;
