import React, { Component } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

class ControlledEditor extends Component {
  state = { editorState: EditorState.createEmpty() };
  toolbarClassName = "toolbarClassName";
  wrapperClassName = "wrapperClassName";
  editorClassName = "editorClassName";
  onChangeCallback = (editorState: EditorState) => {};

  constructor(props: any) {
    super(props);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);

    let editorState = props.editorState;
    if (editorState === undefined) {
      editorState = EditorState.createEmpty();
    }

    let toolbarClassName = props.toolbarClassName;
    if (toolbarClassName === undefined) {
      toolbarClassName = "toolbarClassName";
    }

    let wrapperClassName = props.wrapperClassName;
    if (wrapperClassName === undefined) {
      wrapperClassName = "wrapperClassName";
    }

    let editorClassName = props.editorClassName;
    if (editorClassName === undefined) {
      editorClassName = "editorClassName";
    }

    let onChangeCallback = props.onChangeCallback;

    if (onChangeCallback === undefined) {
      onChangeCallback = (editorState: EditorState) => {};
    }

    // set state to the value of the prop
    this.state = {
      editorState: editorState,
    };

    this.toolbarClassName = toolbarClassName;
    this.wrapperClassName = wrapperClassName;
    this.editorClassName = editorClassName;
    this.onChangeCallback = onChangeCallback;
  }

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
    this.onChangeCallback(editorState);
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        toolbarClassName={this.toolbarClassName}
        wrapperClassName={this.wrapperClassName}
        editorClassName={this.editorClassName}
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}

export default ControlledEditor;
