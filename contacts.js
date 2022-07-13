const FsPromises = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");
console.log("contactsPath: ", contactsPath);

// console.log(__dirname);
// console.log(__filename);

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const getContactsPromise = await FsPromises.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(getContactsPromise);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
}
async function getContactById(contactId) {
  try {
    const getContactsById = await listContacts();
    return getContactsById.filter((el) => Number(el.id) === contactId);
  } catch (error) {
    console.log("error: ", error);
  }
}

async function removeContact(contactId) {
  try {
    const getContactsById = await listContacts();
    const newContacts = JSON.stringify(
      getContactsById.filter((el) => Number(el.id) !== contactId)
    );
    return await FsPromises.writeFile(contactsPath, newContacts, "utf-8");
  } catch (error) {
    console.log("error: ", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const getContacts = await listContacts();
    const modifiedContacts = JSON.stringify([
      ...getContacts,
      { name, email, phone },
    ]);
    return await FsPromises.writeFile(contactsPath, modifiedContacts, "utf8");
  } catch (error) {
    console.log("error: ", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
