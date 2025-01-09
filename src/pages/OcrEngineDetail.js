import React, { useCallback, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ChatField from "../components/ChatField";
import InvoiceFields from "../components/InvoiceFields";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../Sample.css";
import axios from "axios";
import RenderHighlightArea from "../components/RenderingHighlightArea";
import "../Sample.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const resizeObserverOptions = {};
function OcrEngineDetail() {
  const location = useLocation();
  const { file } = location.state || {}; // Add a fallback to prevent errors if state is undefined

  //   const { file } = route.params;
  console.log(file, "detail file");

  const [loader, setLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [responeData, setResponseData] = useState();

  const pageRef = useRef(null); // Reference to the PDF page canvas
  const [highlightAreas, setHighlightAreas] = useState([
    // Example highlight areas
    {
      pageIndex: 0,
      top: 0.1,
      left: 0.1,
      height: 0.1,
      width: 0.1,
    },
    {
      pageIndex: 0,
      top: 21,
      left: 21,
      height: 10,
      width: 10,
    },
    {
      pageIndex: 1,
      top: 0.2,
      left: 0.3,
      height: 0.1,
      width: 0.2,
    },
  ]);

  useEffect(() => {
    handleSubmit();
  }, []);

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
    setLoader(true);
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
        "https://20.49.52.200:8000/api/v1/extract_pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Extract fields dynamically from the response
      if (data) {
        console.log(data, "complete Data");

        setLoader(false);
        setResponseData(data);
      }
    } catch (error) {
      setLoader(false);

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
          className={`flex justify-center items-center ${
            selectedFile?.type === "application/pdf"
              ? "w-1/2 h-[750px] customsb mr-[10px]"
              : "w-2/5 xl:w-[65%] 2xl:w-[42%] xl:max-h-[850px] max-h-[full] mx-0 xl:mx-[30px] overflow-auto"
          }`}
        >
          <div className="w-[100%] h-full">
            <RenderHighlightArea
              areas={highlightAreas}
              fileUrl={URL.createObjectURL(file)}
            />
          </div>
        </div>

        <div
          className={`xl:w-[65%] 2xl:w-[50%] h-[750px] customsb bg-[#F3F3F3] rounded-[10px]`}
        >
          <div className="flex justify-start p-4 px-10">
            <p className="text-[22px] font-[700]">{file?.name}</p>
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
