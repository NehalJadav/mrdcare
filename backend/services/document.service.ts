import { Bson, Status } from "../deps.ts";
import HashHelper from "../helpers/hash.helper.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import log from "../middlewares/logger.middleware.ts";
import { Document, DocumentSchema } from "../models/document.model.ts";
import {
  DocumentHistory,
  DocumentHistorySchema,
} from "../models/document_history.model.ts";
import type {
  CreateDocumentStructure,
  DocumentStructure,
  UpdateDocumentStructure,
  UpdatedStructure,
} from "../types/types.interface.ts";
import {
  PermissionList,
  Role,
  ROLE_RIGHTS,
  ROLES_RANK,
} from "../config/roles.ts";

class DocumentService {
  /**
   * Create document Service
   * @param options
   * @returns Promise<string | Bson.ObjectId | Error> Returns Mongo Document of "document" or error
   */
  public static async createDocument(
    options: CreateDocumentStructure,
  ): Promise<string | Bson.ObjectId | Error> {
    const {
      documentName,
      documentType,
      documentBarcode,
      documentFile,
      hospitalName,
      hospitalIPDNumber,
      patientName,
      patientContactNumber,
      patientDiagnosis,
      patientHistory,
      patientSpeciality,
      patientDateOfAdmission,
      patientDateOfDischarge,
      patientAddress,
      godownName,
      godownRackNumber,
      godownLocation,
      isDisabled,
    } = options;

    const createdAt = new Date();

    const document: string | Bson.ObjectId = await Document.insertOne(
      {
        documentName,
        documentType,
        documentBarcode,
        documentFile,
        hospitalName,
        hospitalIPDNumber,
        patientName,
        patientContactNumber,
        patientDiagnosis,
        patientHistory,
        patientSpeciality,
        patientDateOfAdmission,
        patientDateOfDischarge,
        patientAddress,
        godownName,
        godownRackNumber,
        godownLocation,
        isDisabled,
        createdAt,
        docVersion: 1,
      },
    );

    if (document) {
      await DocumentHistory.insertOne(
        {
          document: document as string,
          documentName,
          documentType,
          documentBarcode,
          documentFile,
          hospitalName,
          hospitalIPDNumber,
          patientName,
          patientContactNumber,
          patientDiagnosis,
          patientHistory,
          patientSpeciality,
          patientDateOfAdmission,
          patientDateOfDischarge,
          patientAddress,
          godownName,
          godownRackNumber,
          godownLocation,
          isDisabled,
          createdAt,
          docVersion: 1,
        },
      );
    } else {
      log.error("Could not create document");
      return throwError({
        status: Status.BadRequest,
        name: "BadRequest",
        path: "document",
        param: "document",
        message: `Could not create document`,
        type: "BadRequest",
      });
    }
    return document;
  }

  /**
   * Get documents service
   * @returns Promise<DocumentSchema[]> Returns Array of "documents" documents
   */
  public static async getDocuments(
    state: any,
  ): Promise<{ data: DocumentSchema[]; pagination: object }> {
    const { page, pageSize } = state.pagination;
    const skip = (page - 1) * pageSize;

    const data = await Document.find().skip(skip).limit(pageSize).toArray();
    const totalItems = await Document.countDocuments();

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data,
      pagination: {
        page,
        pageSize,
        totalPages,
        totalItems,
      },
    };
  }

  /**
   * Get single document service
   * @param id
   * @returns Promise<DocumentSchema | Error> Returns "document" document
   */
  public static async getDocument(
    id: string,
  ): Promise<DocumentStructure | Error> {
    const document: DocumentSchema | undefined = await Document.findOne(
      { _id: new Bson.ObjectId(id) },
    );
    if (!document) {
      log.error("Document not found");
      return throwError({
        status: Status.NotFound,
        name: "NotFound",
        path: "document",
        param: "document",
        message: `Document not found`,
        type: "NotFound",
      });
    }
    const {
      documentName,
      documentType,
      documentBarcode,
      documentFile,
      hospitalName,
      hospitalIPDNumber,
      patientName,
      patientContactNumber,
      patientDiagnosis,
      patientHistory,
      patientSpeciality,
      patientDateOfAdmission,
      patientDateOfDischarge,
      patientAddress,
      godownName,
      godownRackNumber,
      godownLocation,
      isDisabled,
      createdAt,
      updatedAt,
    } = document;
    return {
      id,
      documentName,
      documentType,
      documentBarcode,
      documentFile,
      hospitalName,
      hospitalIPDNumber,
      patientName,
      patientContactNumber,
      patientDiagnosis,
      patientHistory,
      patientSpeciality,
      patientDateOfAdmission,
      patientDateOfDischarge,
      patientAddress,
      godownName,
      godownRackNumber,
      godownLocation,
      isDisabled,
      createdAt,
      updatedAt,
    };
  }

  /**
   * Update document service
   * @param id
   * @param state
   * @param options
   * @returns Promise<UpdatedStructure | Error> Returns Updated acknowledgement
   */
  public static async updateDocument(
    id: string,
    state: Record<string, string>,
    options: UpdateDocumentStructure,
  ): Promise<UpdatedStructure | Error> {
    const document: DocumentSchema | undefined = await Document.findOne(
      { _id: new Bson.ObjectId(id) },
    );
    if (!document) {
      log.error("Document not found");
      return throwError({
        status: Status.NotFound,
        name: "NotFound",
        path: "document",
        param: "document",
        message: `Document not found`,
        type: "NotFound",
      });
    }
    const {
      isDisabled,
      documentName,
      documentType,
      documentBarcode,
      documentFile,
      hospitalName,
      hospitalIPDNumber,
      patientName,
      patientContactNumber,
      patientDiagnosis,
      patientHistory,
      patientSpeciality,
      patientDateOfAdmission,
      patientDateOfDischarge,
      patientAddress,
      godownName,
      godownRackNumber,
      godownLocation,
    } = options;
    const documentRights: string[] = ROLE_RIGHTS.get(state.role);
    if (
      state.id !== id && !documentRights.includes(PermissionList.MANAGE_USERS)
    ) {
      return throwError({
        status: Status.Forbidden,
        name: "Forbidden",
        path: `access_token`,
        param: `access_token`,
        message: `Insufficient rightssssssssssssss`,
        type: "Forbidden",
      });
    }
    const { docVersion } = document;
    const newDocVersion = docVersion + 1;
    const updatedAt = new Date();
    const result: {
      // deno-lint-ignore no-explicit-any
      upsertedId: any;
      upsertedCount: number;
      matchedCount: number;
      modifiedCount: number;
    } = await Document.updateOne({ _id: new Bson.ObjectId(id) }, {
      $set: {
        documentName,
        documentType,
        documentBarcode,
        documentFile,
        hospitalName,
        hospitalIPDNumber,
        patientName,
        patientContactNumber,
        patientDiagnosis,
        patientHistory,
        patientSpeciality,
        patientDateOfAdmission,
        patientDateOfDischarge,
        patientAddress,
        godownName,
        godownRackNumber,
        godownLocation,
        isDisabled,
        updatedAt,
        docVersion: newDocVersion,
      },
    });
    if (result) {
      const document: DocumentHistorySchema = {
        document: id,
        isDisabled: isDisabled === true,
        docVersion: newDocVersion,
      };
      if (documentName) {
        document.documentName = documentName;
      }
      if (documentType) {
        document.documentType = documentType;
      }
      if (documentBarcode) {
        document.documentBarcode = documentBarcode;
      }
      if (documentFile) {
        document.documentFile = documentFile;
      }
      if (hospitalName) {
        document.hospitalName = hospitalName;
      }
      if (hospitalIPDNumber) {
        document.hospitalIPDNumber = hospitalIPDNumber;
      }
      if (patientName) {
        document.patientName = patientName;
      }
      if (patientContactNumber) {
        document.patientContactNumber = patientContactNumber;
      }
      if (patientDiagnosis) {
        document.patientDiagnosis = patientDiagnosis;
      }
      if (patientHistory) {
        document.patientHistory = patientHistory;
      }
      if (patientSpeciality) {
        document.patientSpeciality = patientSpeciality;
      }
      if (patientDateOfAdmission) {
        document.patientDateOfAdmission = patientDateOfAdmission;
      }
      if (patientDateOfDischarge) {
        document.patientDateOfDischarge = patientDateOfDischarge;
      }
      if (patientAddress) {
        document.patientAddress = patientAddress;
      }
      if (godownName) {
        document.godownName = godownName;
      }
      if (godownRackNumber) {
        document.godownRackNumber = godownRackNumber;
      }
      if (godownLocation) {
        document.godownLocation = godownLocation;
      }
      await DocumentHistory.insertOne(document);
    } else {
      return throwError({
        status: Status.BadRequest,
        name: "BadRequest",
        path: "document",
        param: "document",
        message: `Could not update document`,
        type: "BadRequest",
      });
    }

    return result;
  }

  /**
   * Remove document service
   * @param id
   * @returns Promise<number | Error Returns deleted count
   */
  public static async removeDocument(id: string): Promise<number | Error> {
    let document: DocumentSchema | undefined;
    try {
      document = await Document.findOne(
        { _id: new Bson.ObjectId(id) },
      );
    } catch (e) {
      log.error(e);
      return throwError({
        status: Status.BadRequest,
        name: "BadRequest",
        path: "id",
        param: "id",
        message:
          "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer",
        type: "BadRequest",
      });
    }

    if (!document) {
      log.error("Document not found");
      return throwError({
        status: Status.NotFound,
        name: "NotFound",
        path: "document",
        param: "document",
        message: `Document not found`,
        type: "NotFound",
      });
    }
    const deleteCount: number = await Document.deleteOne({
      _id: new Bson.ObjectId(id),
    });
    if (deleteCount) {
      const {
        documentName,
        documentType,
        documentBarcode,
        documentFile,
        hospitalName,
        hospitalIPDNumber,
        patientName,
        patientContactNumber,
        patientDiagnosis,
        patientHistory,
        patientSpeciality,
        patientDateOfAdmission,
        patientDateOfDischarge,
        patientAddress,
        godownName,
        godownRackNumber,
        godownLocation,
        isDisabled,
        createdAt,
        docVersion,
      } = document;
      const newDocVersion = docVersion + 1;
      const updatedAt = new Date();
      await DocumentHistory.insertOne(
        {
          document: id,
          documentName,
          documentType,
          documentBarcode,
          documentFile,
          hospitalName,
          hospitalIPDNumber,
          patientName,
          patientContactNumber,
          patientDiagnosis,
          patientHistory,
          patientSpeciality,
          patientDateOfAdmission,
          patientDateOfDischarge,
          patientAddress,
          godownName,
          godownRackNumber,
          godownLocation,
          isDisabled,
          createdAt,
          updatedAt,
          docVersion: newDocVersion,
        },
      );
    } else {
      return throwError({
        status: Status.BadRequest,
        name: "BadRequest",
        path: "document",
        param: "document",
        message: `Could not delete Document`,
        type: "BadRequest",
      });
    }
    return deleteCount;
  }
}

export default DocumentService;
