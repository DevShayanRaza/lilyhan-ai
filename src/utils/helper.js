import ocr from "../assets/ocr.svg";
import document from "../assets/document.svg";
import aimage from "../assets/aimage.svg";
import web from "../assets/web.svg";
import excel from "../assets/excel.svg";
import database from "../assets/database.svg";
import dashboard from "../assets/dashboard.svg";
import datasource from "../assets/datasource.svg";
import guardrails from "../assets/guardrails.svg";
import model from "../assets/model.svg";
import system from "../assets/system.svg";
import role from "../assets/role.svg";
import billing from "../assets/billing.svg";
import googledrive from "../assets/googledrive.svg";
import microsoftazure from "../assets/microsoft-azure.svg";
import sql from "../assets/sql.svg";
import sharepoint from "../assets/sharepoint.svg";
import s3 from "../assets/s3.svg";

export const engines = [
  {
    title: "OCR Engine",
    status: "Syncing",
    statusType: "Connected Datasources", // Indicates the orange color
    connected: true,
    datasources: ["SharePoint"],
    icon: ocr, // For illustrative purposes, replace with your icon reference
  },
  {
    title: "Document Engine",
    status: "Syncing",
    statusType: "Connected",
    connected: true,
    datasources: ["Google Drive"],
    icon: document, // Replace with actual icon reference
  },
  {
    title: "Image AI Engine",
    status: "Connected",
    statusType: "Connected", // Indicates the green color
    connected: true,
    datasources: [],
    icon: aimage, // Replace with actual icon reference
  },
  {
    title: "Web Search Engine",
    status: "Not Set",
    statusType: "Not Connected", // Indicates the gray/black color
    connected: false,
    datasources: [],
    icon: web, // Replace with actual icon reference
  },
  {
    title: "Excel/CSV Engine",
    status: "Connected",
    statusType: "Connected", // Indicates the
    connected: true,
    datasources: ["Microsoft Azure Blob Storage"],
    icon: excel, // Replace with actual icon reference
  },
  {
    title: "Database Engine",
    status: "Connected",
    statusType: "Connected Database",
    connected: true,
    datasources: ["SQL Server"],
    icon: database, // Replace with actual icon reference
  },
];

export const otherEngine = [
  {
    title: "Analytics Dashboard",

    icon: dashboard, // For illustrative purposes, replace with your icon reference
  },
  {
    title: "Document List",

    icon: document, // Replace with actual icon reference
  },
];

export const admin = [
  {
    title: "Data Source Management",
    subItems: [
      {
        title: "Business Evaluation Insights",
      },
      {
        title: "Strategic Assessment Talks",
      },
    ],
    status: "Syncing",
    statusType: "warning", // Indicates the orange color
    connected: true,
    datasources: ["SharePoint"],
    icon: datasource, // For illustrative purposes, replace with your icon reference
  },
  {
    title: "Model Options",
    status: "Syncing",
    statusType: "warning",
    connected: true,
    datasources: ["Google Drive"],
    icon: model, // Replace with actual icon reference
  },
  {
    title: "Guardrails Management",
    status: "Connected",
    statusType: "success", // Indicates the green color
    connected: true,
    datasources: ["Amazon S3"],
    icon: guardrails, // Replace with actual icon reference
  },
  {
    title: "Billing Insights",
    status: "Not Set",
    statusType: "error", // Indicates the gray/black color
    connected: false,
    datasources: [],
    icon: billing, // Replace with actual icon reference
  },
  {
    title: "Role-Based Access Control",
    status: "Connected",
    statusType: "success",
    connected: true,
    datasources: ["Microsoft Azure Blob Storage"],
    icon: role, // Replace with actual icon reference
  },
  {
    title: "System Logs & User Management",
    status: "Connected",
    statusType: "success",
    connected: true,
    datasources: ["SQL Server"],
    icon: system, // Replace with actual icon reference
  },
];
