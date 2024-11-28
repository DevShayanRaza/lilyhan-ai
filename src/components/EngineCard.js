// import React from "react";
// import tickmark from "../assets/tickmark.svg";
// import cross from "../assets/cross.svg";
// import connected from "../assets/connected.svg";
// import "../custom.css";

// import sync from "../assets/sync.svg";

// const EngineCard = ({ title, status, datasources, icon, statusType }) => {
//   console.log(icon, "icon");
//   return (
//     <div className="p-4 border rounded-lg shadow bg-white">
//       <div className="flex">
//         <div className="bg-[#0056B3] p-2 rounded-[5px] flex items-center justify-center">
//           <img src={icon} className="bg-cover" />
//         </div>
//         <div className="flex items-start flex-col mx-2">
//           <p className="font-[700] text-[18px] ">{title}</p>
//           <span
//             className={`text-sm px-2 py-1 rounded flex  ${
//               status === "Connected"
//                 ? "bg-[#D0F9EE] text-[#19BA92] "
//                 : status === "Syncing"
//                 ? "bg-[#FFE2CC] text-[#FF6E01]"
//                 : status === "Not Set"
//                 ? "bg-[#E8E8EA] text-[#34303E]"
//                 : ""
//             }`}
//           >
//             {status}

//             <img
//               src={
//                 status === "Connected"
//                   ? tickmark
//                   : status === "Syncing"
//                   ? sync
//                   : status === "Not Set"
//                   ? cross
//                   : ""
//               }
//               className="px-2"
//             />
//           </span>
//         </div>
//       </div>

//       <div className="my-4 bg-[#EDEDED] flex p-2 rounded-[10px] fit">
//         <img src={connected} />
//         <p className="text-sm text-gray-500 px-2">{statusType}</p>
//       </div>

//       <img src={datasources} className="py-3" />

//       <button
//         className={`w-full mt-4 text-blue-600 border border-blue-600 py-1 rounded-[10px] font-[600] text-[18px] ${
//           datasources ? "mt-22" : "mt-0"
//         }`}
//       >
//         View Engine
//       </button>
//     </div>
//   );
// };

// export default EngineCard;

import React from "react";
import tickmark from "../assets/tickmark.svg";
import cross from "../assets/cross.svg";
import connected from "../assets/connected.svg";
import "../custom.css";

import sync from "../assets/sync.svg";

const EngineCard = ({ title, status, datasources, icon, statusType }) => {
  return (
    <div className="p-4 border bg-white flex flex-col justify-around h-[50%] w-[30%] md:w-[90%] lg:w-[30%] md:h-auto rounded-[20px] ">
      <div className="flex h-[33%]">
        <div className="bg-[#0056B3] p-2 rounded-[5px] flex items-center justify-center">
          <img src={icon} className="bg-cover" />
        </div>
        <div className="flex items-start flex-col mx-2">
          <p className="font-[700] lg:text-[14px] xl:text-[18px] ">{title}</p>
          <span
            className={`text-sm px-2 py-1 rounded flex  ${
              status === "Connected"
                ? "bg-[#D0F9EE] text-[#19BA92] "
                : status === "Syncing"
                ? "bg-[#FFE2CC] text-[#FF6E01]"
                : status === "Not Set"
                ? "bg-[#E8E8EA] text-[#34303E]"
                : ""
            }`}
          >
            {status}

            <img
              src={
                status === "Connected"
                  ? tickmark
                  : status === "Syncing"
                  ? sync
                  : status === "Not Set"
                  ? cross
                  : ""
              }
              className="px-2"
            />
          </span>
        </div>
      </div>

      <div className="my-6 bg-[#EDEDED] flex p-2  rounded-[10px] fit">
        <img src={connected} />
        <p className="xl:text-[12px] 2xl:text-[14px] font-[600] text-[#323030] px-2">
          {statusType}
        </p>
      </div>
    <div className="">

  <img src={datasources} className="py-3 w-[30%]" />

  <button className="w-full mt-auto text-blue-600 border border-blue-600 py-1 rounded-[10px] font-[600] text-[18px]">
  View Engine
  </button>
  </div>

    </div>
  );
};

export default EngineCard;
