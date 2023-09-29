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
      key: contact.id,
      name: contact.name,
      link: contact.link,
      icon: contact.icon,
    };

    this.onChange = this.onChange.bind(this);
    this.removeContact = props.removeContact.bind(this, this);
  }

  onChange() {
    return (event: any) => {
      // check if file exists
      if (!event.target.files[0]) {
        return;
      }
      // get file
      const file = event.target.files[0];

      // check if file is an image
      if (!file.type.startsWith("image/")) {
        return;
      }

      // preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          icon: e.target?.result,
        });
      };

      reader.readAsDataURL(file);
    };
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
        <div className="admin-me-form-file-input">
          <div className="admin-me-form-file-input-wrap">
            <div className="admin-me-form-file-input-preview">
              {
                //only show image if it exists
                this.state.icon === "" ? (
                  ""
                ) : (
                  // else show the image
                  <img src={this.state.icon} alt="" />
                )
              }
            </div>
            <input type="file" className="admin-me-form-file-input-input" onChange={this.onChange()} />
            {/* <span>
              {
                // only show file name if it exists
                this.state.icon === ""
                  ? "Choose a file"
                  : // else show the file name
                    this.state.icon.split("/").pop()
              }
            </span> */}
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
