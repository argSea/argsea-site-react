import { Component } from "react";

class ImageUpload extends Component {
  state: {
    icon: string;
  };

  constructor(props: any) {
    super(props);

    this.state = {
      icon: props.icon,
    };

    this.onChange = this.onChange.bind(this);
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
        </div>
      </div>
    );
  }
}

export default ImageUpload;
