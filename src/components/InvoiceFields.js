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
      console.log(response, "response");

      setFields(
        Object.keys(response).map((key) => {
          const fieldData = response[key];
          let value;

          // Handle array, scalar, or empty value
          if (Array.isArray(fieldData?.value)) {
            console.log(fieldData?.value, "fieldData?.value");
            console.log(fieldData?.value.length, "fieldData?.value");

            value =
              fieldData.value.length > 0
                ? fieldData.value.join(", ") // Join array elements with a comma
                : " "; // Empty string if array is empty
            console.log(value, "value");
          } else {
            value = fieldData?.value ?? ""; // Use empty string if value is null or undefined
          }

          return {
            label: key,
            value,
            originalValue: value, // Store original value for undo
            confidence: fieldData?.confidence || 0,
            editable: false, // Start with non-editable
            reviewNeeded: fieldData?.confidence <= 70, // Show "Review Needed" if confidence ≤ 70
            reviewed: false, // Track if review is complete
          };
        })
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
    const updatedFormData = { ...formData };
    const fieldKey = fields[index].label;

    // Handle updating scalar or array values dynamically
    if (Array.isArray(formData[fieldKey]?.value)) {
      updatedFormData[fieldKey] = {
        ...formData[fieldKey],
        value: value ? value.split(",").map((item) => item.trim()) : [], // Convert to array or empty array
      };
    } else {
      updatedFormData[fieldKey] = {
        ...formData[fieldKey],
        value,
      };
    }

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
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default InvoiceFields;
