import { Component } from "react";
import iTechInterest from "../../../interfaces/iTechInterest";
import ImageUpload from "./ImageUpload";

class TechInterest extends Component {
  state: {
    key: string;
    name: string;
    icon: string;
    interestLevel: number;
  };

  remove: any;

  constructor(props: any) {
    super(props);

    // check if contact in props
    const techInterest: iTechInterest = props.techInterest;
    // generate key
    this.state = {
      key: techInterest.id,
      name: techInterest.name,
      icon: techInterest.icon,
      interestLevel: techInterest.interestLevel,
    };

    this.remove = props.remove.bind(this, this);
  }

  render() {
    return (
      <div key={this.state.key} data-name={this.state.key} className="admin-me-form-tech-interest-group">
        <div className="admin-me-form-item">
          <input type="text" className="admin-me-form-tech-interest-name" defaultValue={this.state.name} />
          <label>Tech Interest</label>
        </div>
        <div className="admin-me-form-item">
          <input type="number" className="admin-me-form-tech-interest-level" defaultValue={this.state.interestLevel} />
          <label>Tech Interest Level</label>
        </div>
        <ImageUpload {...this.state} />
        <div className="admin-me-form-add-remove-item" onClick={() => this.remove()}>
          <button type="button">-</button>
        </div>
      </div>
    );
  }
}

export default TechInterest;
