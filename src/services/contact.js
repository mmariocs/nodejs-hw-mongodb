import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (ObjectIdId) => {
  const contacts = await ContactsCollection.findById(ObjectIdId);
  return contacts;
};
