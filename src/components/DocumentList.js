
// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx"; // For Excel and CSV files
// import { PDFDocument } from "pdf-lib"; // For PDF files
// import mammoth from "mammoth"; // For Word files
// import UploadFile from "../svg/UploadFile";

// function DocumentList() {
//   const [documentData, setDocumentData] = useState([]);

//   // Load data from localStorage on mount
//   useEffect(() => {
//     const savedData = JSON.parse(localStorage.getItem("documentData"));
//     if (savedData) {
//       setDocumentData(savedData);
//     }
//   }, []);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     let newFileData = {
//       fileName: file.name,
//       dataSource: "",
//       status: "Not Vectorized",
//     };

//     try {
//       if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
//         // Handle Excel files
//         const data = await file.arrayBuffer();
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const content = XLSX.utils.sheet_to_json(sheet);
//         if (content.length > 0) {
//           newFileData.dataSource = "Excel Engine";
//           newFileData.status = "Vectorized";
//         }
//       } else if (file.name.endsWith(".csv")) {
//         // Handle CSV files
//         const data = await file.text();
//         const parsedCSV = XLSX.read(data, { type: "string" });
//         const content = XLSX.utils.sheet_to_json(parsedCSV.Sheets[parsedCSV.SheetNames[0]]);
//         if (content.length > 0) {
//           newFileData.dataSource = "CSV Engine";
//           newFileData.status = "Vectorized";
//         }
//       } else if (file.name.endsWith(".pdf")) {
//         // Handle PDF files
//         const data = await file.arrayBuffer();
//         const pdfDoc = await PDFDocument.load(data, { ignoreEncryption: true });
//         const pages = pdfDoc.getPages();
//         if (pages.length > 0) {
//           newFileData.dataSource = "PDF Processor";
//           newFileData.status = "Vectorized";
//         }
//       } else if (file.name.endsWith(".docx")) {
//         // Handle Word files
//         const reader = new FileReader();
//         reader.onload = async (e) => {
//           const content = await mammoth.extractRawText({ arrayBuffer: e.target.result });
//           if (content.value.trim().length > 0) {
//             newFileData.dataSource = "Word Processor";
//             newFileData.status = "Vectorized";
//           }
//           setDocumentData((prevData) => {
//             const updatedData = [...prevData, newFileData];
//             localStorage.setItem("documentData", JSON.stringify(updatedData)); // Save to localStorage
//             return updatedData;
//           });
//         };
//         reader.readAsArrayBuffer(file);
//         return; // Avoid duplicate updates for Word files
//       } else {
//         console.error("Unsupported file format.");
//         return;
//       }

//       // Update state and localStorage
//       setDocumentData((prevData) => {
//         const updatedData = [...prevData, newFileData];
//         localStorage.setItem("documentData", JSON.stringify(updatedData)); // Save to localStorage
//         return updatedData;
//       });
//     } catch (error) {
//       console.error("Error processing file:", error);
//     }
//   };

//   return (
//     <>
//       {/* Heading */}
//       <div className="flex justify-between">
//         <div className="ml-6 flex flex-col justify-center mb-14">
//           <h2 className="font-bold text-[32px]">Document / Data List</h2>
//           <p>Lorem ipsum dolor sit amet Maecenas rutru.</p>
//         </div>
//         <div>
//           {/* File Input */}
//           <label className="flex items-center cursor-pointer">
//             <input
//               type="file"
//               onChange={handleFileUpload}
//               className="hidden"
//               accept=".xlsx,.xls,.pdf,.docx,.csv"
//             />
//             <div>
//               <UploadFile />
//             </div>
//           </label>
//         </div>
//       </div>

//       {/* Document List */}
//       <div className="bg-[#F3F3F3] border-[1px] border-[#D8D6D6] rounded w-[80%] h-[650px] p-2 pt-10 ml-5">
//         <div className="h-[600px] overflow-y-scroll customsb">
//           <div className="w-full">
//             <div className="flex justify-start font-bold mb-12 ml-10 mr-10">
//               <h3 className="w-1/3">File Name</h3>
//               <h3 className="w-1/3">Data Source</h3>
//               <h3 className="w-1/3">Status</h3>
//             </div>
//           </div>
//           <div className="w-full">
//             {/* Render Items Dynamically */}
//             {documentData.map((item, index) => (
//               <div
//                 key={index}
//                 className={`flex justify-start font-bold mb-12 gap-x-4 ml-8 mr-10 py-[2px] rounded border-b-[1px] border-[#D8D6D6] pb-10 ${
//                   index === documentData.length - 1 ? "last:border-0 mb-0" : ""
//                 }`}
//               >
//                 <p className="w-1/3">{item.fileName}</p>
//                 <p className="w-1/3 font-semibold">{item.dataSource}</p>
//                 <div className="w-1/3">
//                   <p
//                     className={`w-[70%] text-center font-normal py-[2px] rounded ${
//                       item.status === "Vectorized"
//                         ? "bg-[#D0F9EE] text-[#19BA92]"
//                         : "bg-[#0056B3] text-white"
//                     }`}
//                   >
//                     {item.status}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default DocumentList;

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx"; // For Excel and CSV files
import { PDFDocument } from "pdf-lib"; // For PDF files
import mammoth from "mammoth"; // For Word files
import UploadFile from "../svg/UploadFile";

function DocumentList() {
  const [documentData, setDocumentData] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("documentData"));
    if (savedData) {
      setDocumentData(savedData);
    }
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    let newFileData = {
      fileName: file.name,
      dataSource: "",
      status: "Not Vectorized",
    };

    try {
      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        // Handle Excel files
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const content = XLSX.utils.sheet_to_json(sheet);
        if (content.length > 0) {
          newFileData.dataSource = "Excel Engine";
          newFileData.status = "Vectorized";
        }
      } else if (file.name.endsWith(".csv")) {
        // Handle CSV files
        const data = await file.text();
        const parsedCSV = XLSX.read(data, { type: "string" });
        const content = XLSX.utils.sheet_to_json(parsedCSV.Sheets[parsedCSV.SheetNames[0]]);
        if (content.length > 0) {
          newFileData.dataSource = "CSV Engine";
          newFileData.status = "Vectorized";
        }
      } else if (file.name.endsWith(".pdf")) {
        // Handle PDF files
        const data = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(data, { ignoreEncryption: true });
        const pages = pdfDoc.getPages();
        if (pages.length > 0) {
          newFileData.dataSource = "PDF Processor";
          newFileData.status = "Vectorized";
        }
      } else if (file.name.endsWith(".docx")) {
        // Handle Word files
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = await mammoth.extractRawText({ arrayBuffer: e.target.result });
          if (content.value.trim().length > 0) {
            newFileData.dataSource = "Word Processor";
            newFileData.status = "Vectorized";
          }

          // Update state and localStorage here (inside the reader.onload)
          setDocumentData((prevData) => {
            const updatedData = [...prevData, newFileData];
            localStorage.setItem("documentData", JSON.stringify(updatedData)); // Save to localStorage
            return updatedData;
          });
        };
        reader.readAsArrayBuffer(file);
        return; // Avoid duplicate updates for Word files
      } else {
        console.error("Unsupported file format.");
        return;
      }

      // Update state and localStorage for other file types
      setDocumentData((prevData) => {
        const updatedData = [...prevData, newFileData];
        localStorage.setItem("documentData", JSON.stringify(updatedData)); // Save to localStorage
        return updatedData;
      });
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  return (
    <>
      {/* Heading */}
      <div className="flex justify-between">
        <div className="ml-6 flex flex-col justify-center mb-14">
          <h2 className="font-bold text-[32px]">Document / Data List</h2>
          <p>Lorem ipsum dolor sit amet Maecenas rutru.</p>
        </div>
        <div>
          {/* File Input */}
          <label className="flex items-center cursor-pointer">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".xlsx,.xls,.pdf,.docx,.csv"
            />
            <div>
              <UploadFile />
            </div>
          </label>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-[#F3F3F3] border-[1px] border-[#D8D6D6] rounded w-[80%] h-[650px] p-2 pt-10 ml-5">
        <div className="h-[600px] overflow-y-scroll customsb">
          <div className="w-full">
            <div className="flex justify-start font-bold mb-12 ml-10 mr-10">
              <h3 className="w-1/3">File Name</h3>
              <h3 className="w-1/3">Data Source</h3>
              <h3 className="w-1/3">Status</h3>
            </div>
          </div>
          <div className="w-full">
            {/* Render Items Dynamically */}
            {documentData.map((item, index) => (
              <div
                key={index}
                className={`flex justify-start font-bold mb-12 gap-x-4 ml-8 mr-10 py-[2px] rounded border-b-[1px] border-[#D8D6D6] pb-10 ${
                  index === documentData.length - 1 ? "last:border-0 mb-0" : ""
                }`}
              >
                <p className="w-1/3">{item.fileName}</p>
                <p className="w-1/3 font-semibold">{item.dataSource}</p>
                <div className="w-1/3">
                  <p
                    className={`w-[70%] text-center font-normal py-[2px] rounded ${
                      item.status === "Vectorized"
                        ? "bg-[#D0F9EE] text-[#19BA92]"
                        : "bg-[#0056B3] text-white"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DocumentList;
