import { Component } from "react";
import iContacts from "../../../interfaces/iContacts";

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
      key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      name: contact.name,
      link: contact.link,
      icon: contact.icon,
    };

    this.onChange = this.onChange.bind(this);
    this.removeContact = props.removeContact.bind(this, this);
  }

  onChange(event = null) {
    return (event: any) => {
      console.log(event);
    };
  }

  render() {
    return (
      <div key={this.state.key} data-name={this.state.key} className="admin-me-form-contact-group">
        <div className="admin-me-form-item">
          <input type="text" className="admin-me-form-contacts-name" defaultValue={this.state.name} />
        </div>
        <div className="admin-me-form-item">
          <input type="text" className="admin-me-form-contacts-link" defaultValue={this.state.link} />
          <label>Contact Link</label>
        </div>
        <div className="admin-me-form-file-input">
          <div className="admin-me-form-file-input-wrap">
            <div className="admin-me-form-file-input-preview">
              <img src={this.state.icon} alt="" />
            </div>
            <input type="file" className="admin-me-form-file-input-input" onChange={this.onChange()} />
            <span>{this.state.icon}</span>
          </div>
        </div>
        <div className="admin-me-form-add-remove-item" onClick={() => this.removeContact()}>
          <button type="button">-</button>
        </div>
      </div>
    );
  }
}

export default Contact;
