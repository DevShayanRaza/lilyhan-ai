// import React, { useState, useRef } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function PDFWithHighlights() {
//   const [file] = useState("./1.pdf"); // Path to your PDF
//   const [numPages, setNumPages] = useState(null);
//   const [highlights, setHighlights] = useState([]); // Store highlights
//   const [currentPage, setCurrentPage] = useState(1);
//   const canvasRef = useRef(null);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const handleCanvasClick = (event) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     // Add highlight coordinates
//     const newHighlight = { page: currentPage, x, y, width: 100, height: 20 };
//     setHighlights((prev) => [...prev, newHighlight]);
//   };

//   const renderHighlights = (page) => {
//     return highlights
//       .filter((highlight) => highlight.page === page)
//       .map((highlight, index) => (
//         <div
//           key={index}
//           style={{
//             position: "absolute",
//             left: `${highlight.x}px`,
//             top: `${highlight.y}px`,
//             width: `${highlight.width}px`,
//             height: `${highlight.height}px`,
//             backgroundColor: "rgba(255, 255, 0, 0.5)",
//           }}
//         />
//       ));
//   };

//   return (
//     <div style={{ position: "relative", width: "800px", margin: "0 auto" }}>
//       <h1>PDF with Canvas Highlights</h1>
//       <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page
//           pageNumber={currentPage}
//           onClick={handleCanvasClick}
//           canvasRef={canvasRef}
//         />
//       </Document>

//       {/* Render highlights */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           pointerEvents: "none",
//         }}
//       >
//         {renderHighlights(currentPage)}
//       </div>

//       {/* Pagination */}
//       <div style={{ marginTop: "20px" }}>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span style={{ margin: "0 10px" }}>
//           Page {currentPage} of {numPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numPages))}
//           disabled={currentPage === numPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import "../Sample.css";

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

export default function Sample() {
  const [file, setFile] = useState("./1.pdf");
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

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

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__document" ref={setContainerRef}>
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
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
