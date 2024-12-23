import React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "../Sample.css";

const RenderHighlightArea = ({ areas, fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Render highlighted areas
  //   const renderHighlights = (props) => (
  //     <div>
  //       {areas
  //         .filter((area) => area.pageIndex === props.pageIndex)
  //         .map((area, idx) => (
  //           <div
  //             key={idx}
  //             className="highlight-area"
  //             style={{
  //               background: "yellow",
  //               opacity: 0.4,
  //               ...props.getCssProperties(area, props.rotation),
  //             }}
  //           />
  //         ))}
  //     </div>
  //   );

  const highlightPluginInstance = highlightPlugin({
    // renderHighlights,
    trigger: Trigger.None, // Highlights are rendered without user interaction
  });

  return (
    <div
    //   className="pdf-container"
    //   style={{ height: "750px", overflow: "auto" }}
    >
      <Viewer
        fileUrl={fileUrl}
        plugins={[highlightPluginInstance]}
        className="rpv-core__inner-pages"
      />
    </div>
  );
};

export default RenderHighlightArea;
