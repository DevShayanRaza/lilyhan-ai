import React, { useEffect, useState } from "react";
import "../custom.css";
import InputField from "./InputField"; // Assuming InputField is in the same directory
import Loader from "./Loader"; // Import the loader component

function InvoiceFields({ result, loader }) {
  // console.log(result, "my result");
  // Prefilled data array
  const initialFields = [
    { label: "Invoice No", value: "12074", confidence: 99, editable: false },
    {
      label: "Invoice Date",
      value: "7-19-24",
      confidence: 55,
      editable: false,
    },
    {
      label: "Address",
      value: "123 Street Name",
      confidence: 69,
      editable: false,
    },
    { label: "Phone", value: "555-555-5555", confidence: 10, editable: false },
    { label: "Item 2", value: "$500", confidence: 55, editable: false },
    { label: "Item Price", value: "$1,500", confidence: 63, editable: false },
    { label: "Phone", value: "555-555-5555", confidence: 10, editable: false },
    { label: "Item 2", value: "$500", confidence: 55, editable: false },
    { label: "Item Price", value: "$1,500", confidence: 63, editable: false },
  ];
  const apiResponse = {
    NDossier: "IC 187739",
    client: "LECTRA MAROC SARL",
    importateur: "LECTRA MAROC SARL",
    exportateur: "Lectra",
    expediteur: "Lectra",
    destinataire: "LECTRA MAROC SARL",
    adresse_expediteur: "16, 18 rue Chalgrin, 75016 Paris, France",
    adresse_destinataire:
      "126 BOULEVARD ANFA, BUREAU 12 ET 13 ETAGE 1, ANFA CENTER 128, 20330 CASABLANCA, Maroc",
    nbr_ngp_dossier: 7,
    case_38: "FR000610/0204",
    bureau_dedouanement: "N/A",
    regime_declaration: "N/A",
    intitule_regime: "N/A",
    nombre_type_contenant: "N/A",
    marque: "N/A",
    conditions_livraison: "CIP - CA - BLANCA",
    devise: "EUR",
    cours_de_change: 1.0,
    montant_fret: 0.0,
    emballage_et_autres_frais: 0.0,
    poids_brut_total_pesee: 7.0,
    fret: 0.0,
    aconage_et_autres_frais: 0.0,
    total_facture: 1301.25,
    poids_net: 7.0,
    total_quantite: 15,
  };
  // const [fields, setFields] = useState(initialFields);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (result) {
      const response = result; // Simulating API call
      setFields(
        Object.keys(response).map((key) => ({
          label: key,
          value: response[key],
          editable: true,
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

  // const handleInputChange = (index, newValue) => {
  //   setFields((prevFields) =>
  //     prevFields.map((field, i) =>
  //       i === index ? { ...field, value: newValue } : field
  //     )
  //   );
  // };

  const handleInputChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);

    // Update formData to store the complete object
    const updatedFormData = { ...formData, [fields[index].label]: value };
    setFormData(updatedFormData);
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
              {field.confidence < 70 && (
                <button
                  className="text-blue-500 font-medium text-sm underline text-[16px]"
                  onClick={() => toggleEditable(index)} // Toggle edit mode
                >
                  {field.editable ? "Undo" : "Review Needed"}
                </button>
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
