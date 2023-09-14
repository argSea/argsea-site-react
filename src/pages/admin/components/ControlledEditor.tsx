import React, { Component } from "react";
import { ContentState, EditorState, convertFromHTML, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

class ControlledEditor extends Component {
  state = { editorState: EditorState.createEmpty() };
  toolbarClassName = "toolbarClassName";
  wrapperClassName = "wrapperClassName";
  editorClassName = "editorClassName";
  getContent = (html: string) => {};
  content = "";

  constructor(props: any) {
    super(props);

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

    let content: string = props.content;
    if (content === undefined) {
      content = "";
    }

    let getContent = props.getContent;
    if (getContent === undefined) {
      getContent = (html: string) => {};
    }

    this.getContent = getContent;
    this.toolbarClassName = toolbarClassName;
    this.wrapperClassName = wrapperClassName;
    this.editorClassName = editorClassName;
    this.content = content;

    this.onEditorStateChange = this.onEditorStateChange.bind(this);

    // create editor state from content
    let editorState = EditorState.createEmpty();
    if (this.content !== "") {
      const fromHTML = convertFromHTML(this.content);
      editorState = EditorState.createWithContent(ContentState.createFromBlockArray(fromHTML.contentBlocks, fromHTML.entityMap));
    }

    // set state to the value of the prop
    this.state = {
      editorState: editorState,
    };
  }

  getEditorValue = () => {
    return this.state.editorState.getCurrentContent().getPlainText();
  };

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });

    let htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.getContent(htmlContent);
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
