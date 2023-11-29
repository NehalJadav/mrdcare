import db from "../db/db.ts";

export interface DocumentHistorySchema {
  _id?: string;
  document?: string;
  documentName?: string;
  documentType?: string;
  documentBarcode?: string;
  documentFile?: string;
  hospitalName?: string;
  hospitalIPDNumber?: string;
  patientName?: string;
  patientContactNumber?: string;
  patientDiagnosis?: string;
  patientHistory?: string;
  patientSpeciality?: string;
  patientDateOfAdmission?: Date;
  patientDateOfDischarge?: Date;
  patientAddress?: string;
  godownName?: string;
  godownRackNumber?: string;
  godownLocation?: string;
  docVersion?: number;
  isDisabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const DocumentHistory = db.getDatabase.collection<DocumentHistorySchema>(
  "documents_history",
);
