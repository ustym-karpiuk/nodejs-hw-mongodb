import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { parseFilterParams } from '../utils/parseFilterParams.js';

import { parseSortParams } from '../utils/parseSortParams.js';

import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    next(createHttpError(404, `Contact with id ${contactId} not found!`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id: ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contactData = { ...req.body, userId: req.user._id };
  const contact = await createContact(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await patchContact(contactId, req.body, req.user._id);

  if (!result) {
    next(createHttpError(404, `Contact with id ${contactId} not found!`));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    next(createHttpError(404, `Contact with id ${contactId} not found!`));
    return;
  }

  res.status(204).send();
};
