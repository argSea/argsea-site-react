import React, { useEffect, useRef } from "react";
import API from "../../../lib/API";
import iUser from "../../../interfaces/iUser";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles/me.css";
import ReactDOM from "react-dom";
import { convertFromHTML, EditorState, ContentState } from "draft-js";
import { createRoot } from "react-dom/client";

const Me = () => {
  // get user data from api
  const userAPIURL = API.BASE_URL + API.GET_USER.replace("{id}", "6396d88feafa14a262f9915c");

  useEffect(() => {
    fetchUserData().then((data) => {
      const admin_me_content_goes_here = document.getElementById("admin-me-content-goes-here");

      if (admin_me_content_goes_here) {
        createRoot(admin_me_content_goes_here).render(data);
      }
    });
  }, []);

  const saveUser = () => {
    // prevent refresh
    return false;
  };

  const addContact = (name: string, link: string, icon: string) => {
    // add contact to admin-me-form-contact-items
    const contactItems = document.getElementById("admin-me-form-contact-items");

    if (!contactItems) {
      return;
    }

    // generate random key
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // create contact group
    const contactGroup = document.createElement("div");
    contactGroup.setAttribute("data-name", key);
    contactGroup.classList.add("admin-me-form-contact-group");

    // create contact name
    const contactName = document.createElement("div");
    contactName.classList.add("admin-me-form-item");

    const contactNameInput = document.createElement("input");
    contactNameInput.classList.add("admin-me-form-contacts-name");
    contactNameInput.setAttribute("type", "text");
    contactNameInput.setAttribute("value", name);

    const contactNameLabel = document.createElement("label");
    contactNameLabel.innerHTML = "Contact Type";

    contactName.appendChild(contactNameInput);
    contactName.appendChild(contactNameLabel);

    // create contact link
    const contactLink = document.createElement("div");
    contactLink.classList.add("admin-me-form-item");

    const contactLinkInput = document.createElement("input");
    contactLinkInput.classList.add("admin-me-form-contacts-link");
    contactLinkInput.setAttribute("type", "text");
    contactLinkInput.setAttribute("value", link);

    const contactLinkLabel = document.createElement("label");
    contactLinkLabel.innerHTML = "Contact Link";

    contactLink.appendChild(contactLinkInput);
    contactLink.appendChild(contactLinkLabel);

    // create contact icon
    const contactIcon = document.createElement("div");
    contactIcon.classList.add("admin-me-form-item");

    const contactIconInput = document.createElement("input");
    contactIconInput.classList.add("admin-me-form-contacts-icon");
    contactIconInput.setAttribute("type", "text");
    contactIconInput.setAttribute("value", icon);

    const contactIconLabel = document.createElement("label");
    contactIconLabel.innerHTML = "Contact Icon";

    contactIcon.appendChild(contactIconInput);
    contactIcon.appendChild(contactIconLabel);

    // create remove button
    const contactRemove = document.createElement("div");
    contactRemove.classList.add("admin-me-form-add-remove-item");

    const contactRemoveButton = document.createElement("button");
    contactRemoveButton.setAttribute("type", "button");
    contactRemoveButton.innerHTML = "-";
    contactRemoveButton.addEventListener("click", () => {
      removeContactByKey(key);
    });

    contactRemove.appendChild(contactRemoveButton);

    // add all elements to contact group
    contactGroup.appendChild(contactName);
    contactGroup.appendChild(contactLink);
    contactGroup.appendChild(contactIcon);
    contactGroup.appendChild(contactRemove);

    // add contact group to contact items but before the add button
    const addBeforeMeAddButton = document.getElementById("add-before-me-add-contact-button");
    if (addBeforeMeAddButton) {
      contactItems.insertBefore(contactGroup, addBeforeMeAddButton);
    }
  };

  const addTechInterest = (name: string, icon: string, interestLevel: number) => {
    // add tech interest to admin-me-form-tech-interests
    const techInterests = document.getElementById("admin-me-form-tech-interest-items");

    if (!techInterests) {
      return;
    }

    // generate random key
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // create tech interest group
    const techInterestGroup = document.createElement("div");
    techInterestGroup.setAttribute("data-name", key);
    techInterestGroup.classList.add("admin-me-form-tech-interest-group");

    // create tech interest name
    const techInterestName = document.createElement("div");
    techInterestName.classList.add("admin-me-form-item");

    const techInterestNameInput = document.createElement("input");
    techInterestNameInput.classList.add("admin-me-form-tech-interest-name");
    techInterestNameInput.setAttribute("type", "text");
    techInterestNameInput.setAttribute("value", name);

    const techInterestNameLabel = document.createElement("label");
    techInterestNameLabel.innerHTML = "Tech Interest";

    techInterestName.appendChild(techInterestNameInput);
    techInterestName.appendChild(techInterestNameLabel);

    // create tech interest icon
    const techInterestIcon = document.createElement("div");
    techInterestIcon.classList.add("admin-me-form-item");

    const techInterestIconInput = document.createElement("input");
    techInterestIconInput.classList.add("admin-me-form-tech-interest-icon");
    techInterestIconInput.setAttribute("type", "text");
    techInterestIconInput.setAttribute("value", icon);

    const techInterestIconLabel = document.createElement("label");
    techInterestIconLabel.innerHTML = "Tech Interest Icon";

    techInterestIcon.appendChild(techInterestIconInput);
    techInterestIcon.appendChild(techInterestIconLabel);

    // create tech interest level
    const techInterestLevel = document.createElement("div");
    techInterestLevel.classList.add("admin-me-form-item");

    const techInterestLevelInput = document.createElement("input");
    techInterestLevelInput.classList.add("admin-me-form-tech-interest-level");
    techInterestLevelInput.setAttribute("type", "text");
    techInterestLevelInput.setAttribute("value", interestLevel.toString());

    const techInterestLevelLabel = document.createElement("label");
    techInterestLevelLabel.innerHTML = "Tech Interest Level";

    techInterestLevel.appendChild(techInterestLevelInput);
    techInterestLevel.appendChild(techInterestLevelLabel);

    // create remove button
    const techInterestRemove = document.createElement("div");
    techInterestRemove.classList.add("admin-me-form-add-remove-item");

    const techInterestRemoveButton = document.createElement("button");
    techInterestRemoveButton.setAttribute("type", "button");
    techInterestRemoveButton.innerHTML = "-";
    techInterestRemoveButton.addEventListener("click", () => {
      removeTechInterestByKey(key);
    });

    techInterestRemove.appendChild(techInterestRemoveButton);

    // add all elements to tech interest group
    techInterestGroup.appendChild(techInterestName);
    techInterestGroup.appendChild(techInterestIcon);
    techInterestGroup.appendChild(techInterestLevel);
    techInterestGroup.appendChild(techInterestRemove);

    // add tech interest group to tech interests but before the add button
    const addBeforeMeAddButton = document.getElementById("add-before-me-add-tech-interest-button");
    if (addBeforeMeAddButton) {
      techInterests.insertBefore(techInterestGroup, addBeforeMeAddButton);
    }
  };

  const removeContactByKey = (key: string) => {
    const contactArray = document.getElementsByClassName("admin-me-form-contact-group");
    // if only one element is left, clear it instead of removing it
    if (contactArray.length === 1) {
      const contactArrayLastName = contactArray[0].getElementsByClassName("admin-me-form-contacts-name")[0] as HTMLInputElement;
      const contactArrayLastLink = contactArray[0].getElementsByClassName("admin-me-form-contacts-link")[0] as HTMLInputElement;
      const contactArrayLastIcon = contactArray[0].getElementsByClassName("admin-me-form-contacts-icon")[0] as HTMLInputElement;

      contactArrayLastName.value = "";
      contactArrayLastLink.value = "";
      contactArrayLastIcon.value = "";
      return;
    }

    // find element with data-name=key
    for (let i = 0; i < contactArray.length; i++) {
      const element = contactArray[i];
      if (element.getAttribute("data-name") === key) {
        element.remove();
      }
    }
  };

  const removeTechInterestByKey = (key: string) => {
    const techInterestArray = document.getElementsByClassName("admin-me-form-tech-interest-group");
    // if only one element is left, clear it instead of removing it
    if (techInterestArray.length === 1) {
      const techInterestArrayLastName = techInterestArray[0].getElementsByClassName("admin-me-form-tech-interest-name")[0] as HTMLInputElement;
      const techInterestArrayLastIcon = techInterestArray[0].getElementsByClassName("admin-me-form-tech-interest-icon")[0] as HTMLInputElement;
      const techInterestArrayLastLevel = techInterestArray[0].getElementsByClassName("admin-me-form-tech-interest-level")[0] as HTMLInputElement;

      techInterestArrayLastName.value = "";
      techInterestArrayLastIcon.value = "";
      techInterestArrayLastLevel.valueAsNumber = 0;
      return;
    }

    // find element with data-name=key
    for (let i = 0; i < techInterestArray.length; i++) {
      const element = techInterestArray[i];
      if (element.getAttribute("data-name") === key) {
        element.remove();
      }
    }
  };

  const fetchUserData = async () => {
    const userAPI = await fetch(userAPIURL);
    const userData = await userAPI.json();
    const user: iUser = userData.users[0];

    const fromHTML = convertFromHTML(user.about);
    const aboutEditorState = EditorState.createWithContent(ContentState.createFromBlockArray(fromHTML.contentBlocks, fromHTML.entityMap));
    return (
      <form id="admin-me-form">
        <input type="hidden" id="admin-me-form-id" defaultValue={user.userID} />
        <div className="admin-me-form-item">
          <input type="text" id="admin-me-form-name" defaultValue={user.userName} />
          <label htmlFor="admin-me-form-name">User Name</label>
        </div>
        <div className="admin-me-form-item">
          <input type="text" id="admin-me-form-first-name" defaultValue={user.firstName} />
          <label htmlFor="admin-me-form-first-name">First Name</label>
        </div>
        <div className="admin-me-form-item">
          <input type="text" id="admin-me-form-last-name" defaultValue={user.lastName} />
          <label htmlFor="admin-me-form-last-name">Last Name</label>
        </div>
        <div className="admin-me-form-item">
          <input type="text" id="admin-me-form-avatar" defaultValue={user.picture} />
          <label htmlFor="admin-me-form-avatar">Avatar</label>
        </div>
        <div className="admin-me-form-item">
          <input type="text" id="admin-me-form-title" defaultValue={user.title} />
          <label htmlFor="admin-me-form-title">Title</label>
        </div>
        <div className="admin-me-form-item">
          <input type="text" id="admin-me-form-email" defaultValue={user.email} />
          <label htmlFor="admin-me-form-email">Email</label>
        </div>
        <label className="about-me-form-item-header" id="admin-me-form-contact-header">
          Contacts
        </label>
        <div id="admin-me-form-contact-items">
          {/* map with index */}
          {user.contacts.map((contact) => {
            // generate random key
            const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            return (
              <div key={key} data-name={key} className="admin-me-form-contact-group">
                <div className="admin-me-form-item">
                  <input type="text" className="admin-me-form-contacts-name" defaultValue={contact.name} />
                  <label>Contact Type</label>
                </div>
                <div className="admin-me-form-item">
                  <input type="text" className="admin-me-form-contacts-link" defaultValue={contact.link} />
                  <label>Contact Link</label>
                </div>
                <div className="admin-me-form-item">
                  <input type="text" className="admin-me-form-contacts-icon" defaultValue={contact.icon} />
                  <label>Contact Icon</label>
                </div>
                {/* minus sign */}
                <div className="admin-me-form-add-remove-item" onClick={() => removeContactByKey(key)}>
                  <button type="button">-</button>
                </div>
              </div>
            );
          })}
          <div className="admin-me-form-add-remove-item" id="add-before-me-add-contact-button">
            <button type="button" onClick={() => addContact("", "", "")}>
              +
            </button>
          </div>
        </div>
        <label className="about-me-form-item-header" htmlFor="">
          Tech Interests
        </label>
        <div id="admin-me-form-tech-interest-items">
          {user.techInterests.map((interest) => {
            const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            return (
              <div key={key} data-name={key} className="admin-me-form-tech-interest-group">
                <div className="admin-me-form-item">
                  <input type="text" className="admin-me-form-tech-interest-name" defaultValue={interest.name} />
                  <label>Tech Interest</label>
                </div>
                <div className="admin-me-form-item">
                  <input type="text" className="admin-me-form-tech-interest-icon" defaultValue={interest.icon} />
                  <label>Tech Interest Icon</label>
                </div>
                <div className="admin-me-form-item">
                  <input type="number" inputMode="numeric" className="admin-me-form-tech-interest-level" defaultValue={interest.interestLevel} />
                  <label>Tech Interest Level</label>
                </div>
                <div className="admin-me-form-add-remove-item" onClick={() => removeTechInterestByKey(key)}>
                  <button type="button">-</button>
                </div>
              </div>
            );
          })}
          <div className="admin-me-form-add-remove-item" id="add-before-me-add-tech-interest-button">
            <button type="button" onClick={() => addTechInterest("", "", 0)}>
              +
            </button>
          </div>
        </div>
        <label className="about-me-form-item-header" htmlFor="admin-me-form-about-header">
          About
        </label>
        <div className="admin-me-form-item">
          <Editor
            ariaLabel="About Me"
            editorState={aboutEditorState}
            toolbarClassName="admin-me-form-about-editor-toolbar"
            wrapperClassName="admin-me-form-about-editor"
            editorClassName="admin-me-form-about-editor-content"
          />
        </div>
        <button id="admin-me-form-submit-button" type="button" onClick={() => saveUser()}>
          Save
        </button>
      </form>
    );
  };

  return (
    <div id="admin-me">
      <div id="admin-me-header">
        <div id="admin-me-header-title">.me</div>
      </div>
      <div id="admin-me-content">
        <div id="admin-me-content-goes-here"></div>
      </div>
    </div>
  );
};

export default Me;