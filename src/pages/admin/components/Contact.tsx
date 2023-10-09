import { Component } from "react";
import iContacts from "../../../interfaces/iContacts";
import ImageUpload from "./ImageUpload";

class Contact extends Component {
  state: {
    key: string;
    name: string;
    link: string;
    icon: string;
  };

  removeContact: any;

  constructor(props: any) {
    super(props);

    // check if contact in props
    const contact: iContacts = props.contact;
    // generate key
    this.state = {
      key: contact.id,
      name: contact.name,
      link: contact.link,
      icon: contact.icon,
    };

    this.removeContact = props.removeContact.bind(this, this);
  }

  render() {
    return (
      <div key={this.state.key} data-name={this.state.key} className="admin-me-form-contact-group">
        <div className="admin-me-form-item">
          <input type="text" className="admin-me-form-contacts-name" defaultValue={this.state.name} />
          <label>Contact Name</label>
        </div>
        <div className="admin-me-form-item">
          <input type="text" className="admin-me-form-contacts-link" defaultValue={this.state.link} />
          <label>Contact Link</label>
        </div>
        <ImageUpload {...this.state} />
        <div className="admin-me-form-add-remove-item" onClick={() => this.removeContact()}>
          <button type="button">-</button>
        </div>
      </div>
    );
  }
}

export default Contact;
