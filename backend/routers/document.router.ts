import { Router } from "../deps.ts";
import DocumentController from "../controllers/document.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
  createDocumentValidation,
  getDocumentsValidation,
  getDocumentValidation,
  meValidation,
  updateDocumentValidation,
} from "../validations/document.validation.ts";
import { PermissionList } from "../config/roles.ts";
import { paginate } from "../middlewares/pagination.middleware.ts";
const router = new Router();

router.post(
  "/api/documents",
  auth([PermissionList.MANAGE_USERS]),
  validate(createDocumentValidation),
  DocumentController.create,
);

router.get(
  "/api/documents",
  auth([PermissionList.MANAGE_USERS]),
  validate(getDocumentsValidation),
  paginate,
  DocumentController.fetch,
);

router.get(
  "/api/documents/:id",
  auth([PermissionList.MANAGE_USERS]),
  validate(getDocumentValidation),
  DocumentController.show,
);

router.put(
  "/api/documents/:id",
  auth([PermissionList.UPDATE_ME, PermissionList.MANAGE_USERS]),
  validate(updateDocumentValidation),
  DocumentController.update,
);

router.delete(
  "/api/documents/:id",
  auth([PermissionList.DELETE_ME, PermissionList.MANAGE_USERS]),
  DocumentController.remove,
);

export default router;
