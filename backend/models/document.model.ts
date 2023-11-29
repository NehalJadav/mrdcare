import db from "../db/db.ts";
import type { CreateIndexOptions } from "../deps";

export interface DocumentSchema {
  _id: string;
  documentName: string;
  documentType: string;
  documentBarcode: string;
  documentFile: File;
  hospitalName: string;
  hospitalIPDNumber: string;
  patientName: string;
  patientContactNumber: string;
  patientDiagnosis: string;
  patientHistory: string;
  patientSpeciality: string;
  patientDateOfAdmission: Date;
  patientDateOfDischarge: Date;
  patientAddress: string;
  godownName: string;
  godownRackNumber: string;
  godownLocation: string;
  docVersion: number;
  isDisabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Document = db.getDatabase.collection<DocumentSchema>("documents");

/* const indexOptions: CreateIndexOptions = {
  indexes: [{
    key: {
      email: 'text',
    },
    name: 'emailUniqueKey',
    unique: true,
  }],
};

await User.createIndexes(indexOptions); */
