import React, { useEffect, useState } from "react";
import "../custom.css";
import InputField from "./InputField"; // Assuming InputField is in the same directory
import Loader from "./Loader"; // Import the loader component

function InvoiceFields({ result, loader }) {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (result) {
      const response = result; // Simulating API call
      setFields(
        Object.keys(response).map((key) => ({
          label: key,
          value: response[key]?.value
            ? response[key]?.value
            : response[key]?.value == 0
            ? 0
            : "",
          originalValue: response[key]?.value || "", // Store original value for undo
          confidence: response[key]?.confidence || 0,
          editable: false, // Start with non-editable
          reviewNeeded: response[key]?.confidence <= 70, // Show "Review Needed" if confidence ≤ 70
          reviewed: false, // Track if review is complete
        }))
      );
      setFormData(response);
    }
  }, [result]);

  const toggleEditable = (index) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, editable: !field.editable } : field
      )
    );
  };

  const handleInputChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);

    // Update formData to store the complete object
    const updatedFormData = { ...formData, [fields[index].label]: value };
    setFormData(updatedFormData);
  };

  const handleReviewNeeded = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].editable = true; // Enable the field
    updatedFields[index].reviewNeeded = false; // Hide "Review Needed" button
    setFields(updatedFields);
  };

  const handleDone = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].editable = false; // Disable the field
    updatedFields[index].reviewed = true; // Mark as reviewed
    setFields(updatedFields);
  };

  const handleUndo = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].value = updatedFields[index].originalValue; // Revert to original value
    updatedFields[index].editable = false; // Disable the field
    updatedFields[index].reviewNeeded = true; // Show "Review Needed" button again
    setFields(updatedFields);
  };
  return (
    <div className="p-4 bg-[#F3F3F3] flex flex-wrap">
      {!loader ? (
        fields.map((field, index) => (
          <>
            {console.log(field, "field")}
            <div key={index} className="flex flex-col p-4 w-[50%] bg-[#F3F3F3]">
              {/* Floating Input Field */}
              <InputField
                label={field.label}
                type="text"
                value={field.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={`Enter ${field.label}`}
                disabled={!field.editable} // Disable input field initially
                labelColor
              />

              {/* Confidence Display and Action Button */}
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${
                    field.confidence > 70 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  Confidence: {field.confidence}%
                </span>

                {field.confidence <= 70 && field.reviewNeeded && (
                  <button
                    className="text-sm font-medium text-yellow-500 underline"
                    onClick={() => handleReviewNeeded(index)}
                  >
                    Review Needed
                  </button>
                )}

                {field.confidence <= 70 &&
                  !field.reviewNeeded &&
                  !field.reviewed && (
                    <div className="flex space-x-2">
                      <button
                        className="text-sm font-medium text-green-500 underline"
                        onClick={() => handleDone(index)}
                      >
                        Done
                      </button>
                      <button
                        className="text-sm font-medium text-red-500 underline"
                        onClick={() => handleUndo(index)}
                      >
                        Undo
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default InvoiceFields;
