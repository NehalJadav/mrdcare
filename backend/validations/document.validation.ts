import { yup } from "../deps.ts";
import { Role, ROLES_RANK } from "../config/roles.ts";

export const createDocumentValidation = {
  body: yup.object({
    documentName: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Document Name is required`),
    documentType: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Document Type is required`),
    documentBarcode: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Document Barcode is required`),
    documentFile: yup
      .mixed(),
    hospitalName: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Hospital Name is required`),
    hospitalIPDNumber: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Hospital ipdNumber is required`),
    patientName: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Patient Name is required`),
    patientContactNumber: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Patient Contact Number is required`),
    patientDiagnosis: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Patient Diagnosis is required`),
    patientHistory: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Patient History is required`),
    patientSpeciality: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Patient Speciality is required`),
    patientDateOfAdmission: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Patient Date Of Admission is required`),
    patientDateOfDischarge: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Patient Date Of Discharge is required`),
    patientAddress: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Patient Address is required`),
    godownName: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Godown Name is required`),
    godownRackNumber: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`Godown Rack Number is required`),
    godownLocation: yup
      .mixed()
      .required(`Godown Location is required`),
    role: yup
      .string()
      .default(Role.USER)
      .oneOf(ROLES_RANK),
    isDisabled: yup
      .bool()
      .default(false),
  }),
};

export const meValidation = {};

export const getDocumentValidation = {
  params: yup.object({
    id: yup
      .string()
      .required()
      .trim(),
  }),
};

/* Strict Validation
* This will validate any invalid query params
* e.g. /users?some-invalid-query=shouldnt_allow
* */
export const getDocumentsValidation = {
  queries: yup.object({
    page: yup.string().required().trim(),
    pageSize: yup.string().required().trim(),
  }),
};

export const updateDocumentValidation = {
  params: yup.object({
    id: yup
      .string()
      .required()
      .trim(),
  }),
  body: yup.object({
    documentName: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    documentType: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    documentBarcode: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    documentFile: yup.mixed().test(
      "pdfFile",
      "Invalid PDF file",
      (file: File | undefined) =>
        (file && /(\.pdf)$/i.test(file.name) &&
          file.size <= 100 * 1024 * 1024) ||
        new yup.ValidationError("Document File is required"),
    ),
    hospitalName: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    hospitalIPDNumber: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    patientName: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    patientContactNumber: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    patientDiagnosis: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    patientHistory: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    patientSpeciality: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    patientDateOfAdmission: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    patientDateOfDischarge: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    patientAddress: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    godownName: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    godownRackNumber: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    godownLocation: yup
      .string()
      .min(1)
      .max(255)
      .trim(),
    role: yup
      .string()
      .default(Role.USER)
      .oneOf(ROLES_RANK),
    isDisabled: yup
      .bool(),
  }),
};

export const deleteDocumentValidation = {
  params: yup.object({
    id: yup
      .string()
      .required()
      .trim(),
  }),
};
