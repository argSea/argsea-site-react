import React, { useEffect, useState } from "react";
import iContacts from "../../../interfaces/iContacts";
import Contact from "./Contact";

const ContactHandler = ({ contactData }: { contactData: iContacts[] }) => {
  const [contacts, setContacts] = useState<iContacts[]>(contactData);
  console.log("Contact handler");
  console.log(contactData);

  const addContact = (name: string, link: string, icon: string) => {
    // add contact to contactData
    const newContact = {
      name: name,
      link: link,
      icon: icon,
    };
    console.log(newContact);
    setContacts([...contacts, newContact]);
  };

  const removeContact = (context: any) => {
    let self = context;
    console.log(self);
    // const contactGroup = document.querySelector(`[data-name="${self.state.key}"]`);

    // if (!contactGroup) {
    //   return;
    // }

    // console.log(contactGroup);
    // contactGroup.remove();

    // remove contact from contacts
    const newContacts = contacts.filter((contact) => contact.name !== self.state.name && contact.link !== self.state.link && contact.icon !== self.state.icon);
    console.log(newContacts);
    setContacts(newContacts);
  };

  return (
    <>
      {contacts.map((contact: iContacts) => {
        const index = contactData.indexOf(contact);
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
