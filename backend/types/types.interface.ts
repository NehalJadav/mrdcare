import { Bson } from "../deps.ts";
import { Role } from "../config/roles.ts";

export interface TokenStructure {
  access: { expires: Date; token: string };
  refresh: { expires: Date; token: string };
}

export interface UserStructure {
  id: string;
  name: string;
  email: string;
  role: string;
  isDisabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RefreshTokenStructure {
  tokens: TokenStructure | Error;
}
export interface LoginStructure {
  tokens: TokenStructure | Error;
  user: UserStructure;
}

export interface CreateUserStructure {
  name: string;
  email: string;
  password: string;
  role: Role;
  isDisabled: boolean;
}

export interface UpdateUserStructure {
  name?: string;
  email?: string;
  role?: Role;
  isDisabled?: boolean;
}

export interface UpdatedStructure {
  matchedCount: number;
  modifiedCount: number;
  upsertedId: typeof Bson.ObjectId | null;
}

export interface Err {
  status: number;
  name: string;
  path: string;
  param: string;
  message: string;
  type: string;
}

export interface ICustomError extends Error {
  status?: number;
  statusCode?: number;
  path?: string;
  type?: string;
}

export interface DocumentStructure {
  id: string;
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
  isDisabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateDocumentStructure {
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
  isDisabled: boolean;
}

export interface UpdateDocumentStructure {
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
  isDisabled?: boolean;
}
