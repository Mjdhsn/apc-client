import React, { Component } from "react";

export default class Checkbox extends Component {
  render() {
    const { index, id, title, name, handleChange, checked } = this.props;

    return (
      <div style={{ display: "flex" }}>
        <input
          id={id}
          type="checkbox"
          index={index}
          name={name}
          onChange={handleChange}
          checked={checked}
          style={{ blockSize: "auto", width:"20px" }}
        />
        <label htmlFor={id}>{title}</label>
      </div>
    );
  }
}
