import React, { useEffect, useState } from "react";
import iContacts from "../../../interfaces/iContacts";
import Contact from "./Contact";

const ContactHandler = ({ contactData }: { contactData: iContacts[] }) => {
  console.log("Contact handler");
  const [contacts, setContacts] = useState<iContacts[]>(contactData);
  console.log("contactData");
  console.log(contactData);
  console.log("contacts");
  console.log(contacts);

  useEffect(() => {
    if (contacts.length === 0) {
      addContact("", "", "");
    }
  }, [contacts]);

  const addContact = (name: string, link: string, icon: string) => {
    // add contact to contactData
    const newContact = {
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      name: name,
      link: link,
      icon: icon,
    };
    console.log(newContact);
    setContacts([...contacts, newContact]);
  };

  const removeContact = (context: any) => {
    let self = context;
    console.log("self");
    console.log(self);

    console.log("removeContact function");
    console.log(contacts);

    // remove contact from contacts
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== self.state.key);
    });
  };

  return (
    <>
      {contacts.map((contact: iContacts) => {
        const index = contacts.indexOf(contact);
        const props = {
          contact: contact,
          removeContact: removeContact,
        };
        return <Contact key={index} {...props} />;
      })}
      <div className="admin-me-form-add-remove-item" id="add-before-me-add-contact-button">
        <button type="button" onClick={() => addContact("", "", "")}>
          +
        </button>
      </div>
    </>
  );
};

export default ContactHandler;
