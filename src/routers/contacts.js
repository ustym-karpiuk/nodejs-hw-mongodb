import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
