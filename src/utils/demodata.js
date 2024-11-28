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
import vector from "../assets/vector.svg";
import documentTwo from "../assets/documentTwo.svg";
import connectedTwo from "../assets/connectedTwo.svg";

export const engines = [
  {
    title: "OCR Engine",
    status: "Syncing",
    statusType: "Connected Datasources", // Indicates the orange color
    connected: true,
    datasources: sharepoint,
    // serviceIcon:
    icon: ocr, 
    url: "/ocr-engine",
  },
  {
    title: "Document Engine",
    status: "Syncing",
    statusType: "Connected",
    connected: true,
    datasources: googledrive,
    icon: document, // Replace with actual icon reference
    url: "/document-engine",
  },
  {
    title: "Image AI Engine",
    status: "Connected",
    statusType: "Connected", // Indicates the green color
    connected: true,
    datasources: s3,
    icon: aimage, // Replace with actual icon reference
    url: "/image-ai-engine",
  },
  {
    title: "Web Search Engine",
    status: "Not Set",
    statusType: "Not Connected", // Indicates the gray/black color
    connected: false,
    datasources: "",
    icon: web, // Replace with actual icon reference
    url: "/web-search-engine",
  },
  {
    title: "Excel/CSV Engine",
    status: "Connected",
    statusType: "Connected", // Indicates the
    connected: true,
    datasources: microsoftazure,
    icon: excel, 
    url: "/excel-engine",
  },
  {
    title: "Database Engine",
    status: "Connected",
    statusType: "Connected Database",
    connected: true,
    datasources: sql,
    icon: database, 
    url: "/database-engine",
  },
];

export const otherEngine = [

  {
    title: "Analytics Dashboard",
    icon: dashboard, 
    url: "/analytics-dashboard",
  
  },
  {
    title: "Document List",
    icon: document, 
    url: "/document-list",
  },
];

export const admin = 
 [
      {
        title: "Business Evaluation Insights",
        url: "/business-evaluation-insights",
      
      },
      {
        title: "Strategic Assessment Talks",
        url: "/strategic-assessment",
      },
];

export const moreEngines = [
{
  title: "Model Options",
  status: "Syncing",
  statusType: "warning",
  connected: true,
  datasources: ["Google Drive"],
  icon: model, 
  url: "/model-options",
},
{
  title: "Guardrails Management",
  status: "Connected",
  statusType: "success", 
  connected: true,
  datasources: ["Amazon S3"],
  icon: guardrails, 
  url: "/guardrails-management",
},
{
  title: "Billing Insights",
  status: "Not Set",
  statusType: "error", 
  connected: false,
  datasources: [],
  icon: billing, 
  url: "/billing-insights",
},
{
  title: "Role-Based Access Control",
  status: "Connected",
  statusType: "success",
  connected: true,
  datasources: ["Microsoft Azure Blob Storage"],
  icon: role, // Replace with actual icon reference
  url: "/Rolebased-Access-Control",
},
{
  title: "System Logs & User Management",
  status: "Connected",
  statusType: "success",
  connected: true,
  datasources: ["SQL Server"],
  icon: system, // Replace with actual icon reference
  url: "/system-logs-&-User-Management",
},
];

export const recentActivities = [
  {
    type: "Upload",
    icon: documentTwo, // Representing the icon, e.g., "upload"
    title: "Upload document: Device",
    time: "5 min ago",
  },
  {
    type: "Connected",
    icon: connectedTwo, // Representing the icon for connected sources
    title: "Sources Connected: Sales SharePoint, HR SQL, Finance.xls",
    time: "5 min ago",
  },
  {
    type: "Vectorization",
    icon: vector, // Representing vectorization in progress
    title: "Vectorization in progress for 'invoice.pdf'.",
    time: "36 min ago",
  },
  {
    type: "Upload",

    icon: documentTwo, // Representing the icon, e.g., "upload"
    title: "Document 'invoice.pdf' uploaded to OCR Engine",
    time: "5 min ago",
  },
  {
    type: "Connected",

    icon: connectedTwo, // Representing the icon for connected sources
    title: "Connected to Azure Blob storage",
    time: "5 min ago",
  },
  {
    type: "Vectorization",
    icon: vector, // Representing vectorization in progress
    title: "Vectorization in progress for 'invoice.pdf'.",
    time: "36 min ago",
  },
  {
    type: "Upload",

    icon: documentTwo, // Representing the icon, e.g., "upload"
    title: "Document 'invoice.pdf' uploaded to OCR Engine",
    time: "5 min ago",
  },
  {
    type: "Connected",

    icon: connectedTwo, // Representing the icon for connected sources
    title: "Connected to Azure Blob storage",
    time: "5 min ago",
  },
  {
    type: "Vectorization",
    icon: vector, // Representing vectorization in progress
    title: "Vectorization in progress for 'invoice.pdf'.",
    time: "36 min ago",
  },
];
