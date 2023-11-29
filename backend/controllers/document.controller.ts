/**
 * Class DocumentController
 *
 * This class handles user-related tasks. It uses the UserService class to perform
 * tasks such as creating, retrieving, updating and deleting users. This class acts as a controller layer between the
 * HTTP server and the service layer, thereby reducing the coupling between these layers.
 *
 * @import roles - Roles configuration imported from `roles.ts`
 * @import { RouterContext } - A type from `deps.ts` that denotes the context in which the router operates.
 * @import log - A logger middleware imported from `logger.middleware.ts` used to log debug information.
 * @import UserService - A service class imported from `user.service.ts` used to perform user-related operations.
 * @import { Status } - A enum imported from `deps.ts` which represents the HTTP status codes.
 *
 * @method create() - An asynchronous method that extracts user details from the request body, logs the user creation attempt,
 * calls the DocumentService.createUser() method to create a new user and sets the HTTP status code to `Created`.
 *
 * @method fetch() - An asynchronous method that logs the user retrieval attempt and calls the DocumentService.getUsers() method to
 * retrieve a list of all users.
 *
 * @method me() - A synchronous method that logs the data retrieval attempt and sets the response body to the state received from the RouterContext.
 *
 * @method show() - An asynchronous method that extracts the user id from the parameters, logs the single user retrieval attempt,
 * and calls the DocumentService.getUser() method to retrieve the details of a single user.
 *
 * @method update() - An asynchronous method that extracts the user id and new user details from the request, logs the user update attempt,
 * calls the DocumentService.updateUser() method to update the user details and finally calls DocumentService.getUser() to retrieve the updated user details.
 *
 * @method remove() - An asynchronous method that extracts the user id from the parameters, logs the user deletion attempt,
 * and calls the DocumentService.removeUser() method to delete a user, then sets the response body to the count of deleted records.
 *
 * @exports DocumentController - This class is exported for use in other parts of the application.
 */
import { Role } from "../config/roles.ts";
import type { RouterContext } from "../deps.ts";
import { Status } from "../deps.ts";
import log from "../middlewares/logger.middleware.ts";
import DocumentService from "../services/document.service.ts";
import { encode } from "https://deno.land/std/encoding/base64.ts";

class DocumentController {
  /**
   * Create Document function
   * @param request
   * @param response
   * @returns Promise<void>
   */
  public static async create(
    { request, response }: RouterContext<string>,
  ): Promise<void> {
    const body = request.body({ type: "form-data" });
    const formData = await body.value.read({ maxSize: 10000000 });
    const formFields: Record<string, any> = {};
    const documentFile = formData.files;
    // Convert the Binary data to a Uint8Array
    const fileData = documentFile[0].content.buffer;
    const base64Data = encode(fileData);
    // Prepare the API response
    const responseData = {
      name: documentFile[0].originalName,
      contentType: documentFile[0].contentType,
      data: base64Data,
    };
    Object.entries(formData.fields).forEach(([key, value]) => {
      formFields[key] = value;
    });
    const {
      documentName,
      documentType,
      documentBarcode,
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
    } = formFields;
    log.debug("Creating Document");
    response.body = await DocumentService.createDocument({
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
      isDisabled: typeof isDisabled === "boolean" ? isDisabled : false,
    });
    response.status = Status.Created;
    response.body = responseData;
  }

  /**
   * Get single document function
   * @param response
   * @returns Promise<void>
   */
  public static async fetch(
    { response, state }: RouterContext<string>,
  ): Promise<void> {
    log.debug("Getting documents list");

    const { data, pagination } = await DocumentService.getDocuments(state);

    response.body = {
      data,
      pagination,
    };
  }

  /**
   * Get my document document
   * @param state
   * @param response
   * @returns Promise<void>
   */
  public static me({ state, response }: RouterContext<string>): void {
    log.debug("Getting me data");
    response.body = state;
  }

  /**
   * Get all documents function
   * @param params
   * @param response
   * @returns Promise<void>
   */
  public static async show(
    { params, response }: RouterContext<string>,
  ): Promise<void> {
    const { id } = params;
    log.debug("Getting document");
    response.body = await DocumentService.getDocument(id as string);
  }

  /**
   * Update document function
   * @param params
   * @param request
   * @param response
   * @param state
   * @returns Promise<void>
   */
  public static async update(
    { params, request, response, state }: RouterContext<string>,
  ): Promise<void | Error> {
    const { id } = params;
    const body = request.body();
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
    } = await body.value;
    log.debug("Updating document");
    await DocumentService.updateDocument(id as string, state, {
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
    });
    response.body = await DocumentService.getDocument(id as string);
  }

  /**
   * Delete document function
   * @param params
   * @param response
   * @returns Promise<void>
   */
  public static async remove(
    { params, response }: RouterContext<string>,
  ): Promise<void> {
    const { id } = params;
    log.debug("Removing document");
    try {
      await DocumentService.removeDocument(
        id as string,
      );
      response.status = Status.NoContent;
    } catch (e) {
      response.body = e;
      response.status = e.status;
    }
  }
}

export default DocumentController;
