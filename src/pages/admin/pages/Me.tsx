import React, { useEffect, useRef, useState } from "react";
import API from "../../../lib/API";
import iUser from "../../../interfaces/iUser";
import "./styles/me.css";
import { createRoot } from "react-dom/client";
import ControlledEditor from "../components/ControlledEditor";
import draftToHtml from "draftjs-to-html";
import { json } from "react-router-dom";
import Contacts from "../components/ContactHandler";
import ContactHandler from "../components/ContactHandler";

const Me = () => {
  const [aboutContent, setAboutContent] = useState("");
  const aboutContentRef = React.useRef(aboutContent);
  aboutContentRef.current = aboutContent;

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

  useEffect(() => {
    console.log("Updated:" + aboutContent);
  }, [aboutContent]);

  const getContent = (html: string) => {
    // const hiddenAbout = document.getElementById("hidden-about");
    // if (hiddenAbout) {
    //   hiddenAbout.innerHTML = html;
    // }

    setAboutContent(html);
    // console.log(html);
  };

  const saveUser = () => {
    // get user data from form
    const userID = (document.getElementById("admin-me-form-id") as HTMLInputElement).value;
    const userName = (document.getElementById("admin-me-form-name") as HTMLInputElement).value;
    const firstName = (document.getElementById("admin-me-form-first-name") as HTMLInputElement).value;
    const lastName = (document.getElementById("admin-me-form-last-name") as HTMLInputElement).value;
    const picture = (document.getElementById("admin-me-form-avatar") as HTMLInputElement).value;
    const title = (document.getElementById("admin-me-form-title") as HTMLInputElement).value;
    const email = (document.getElementById("admin-me-form-email") as HTMLInputElement).value;

    // get about from form using draftjs-to-html
    const about = aboutContentRef.current; //document.getElementById("hidden-about")?.innerHTML as string;

    // get contacts from form
    const contactArray = document.getElementsByClassName("admin-me-form-contact-group");
    const contacts: any[] = [];
    for (let i = 0; i < contactArray.length; i++) {
      const element = contactArray[i];
      const name = (element.getElementsByClassName("admin-me-form-contacts-name")[0] as HTMLInputElement).value;
      const link = (element.getElementsByClassName("admin-me-form-contacts-link")[0] as HTMLInputElement).value;
      const icon = (element.getElementsByClassName("admin-me-form-file-input-input")[0] as HTMLInputElement).value;
      contacts.push({
        name: name,
        link: link,
        icon: icon,
      });
    }

    // get tech interests from form
    const techInterestArray = document.getElementsByClassName("admin-me-form-tech-interest-group");
    const techInterests: any[] = [];
    for (let i = 0; i < techInterestArray.length; i++) {
      const element = techInterestArray[i];
      const name = (element.getElementsByClassName("admin-me-form-tech-interest-name")[0] as HTMLInputElement).value;
      const icon = (element.getElementsByClassName("admin-me-form-tech-interest-icon")[0] as HTMLInputElement).value;
      const interestLevel = (element.getElementsByClassName("admin-me-form-tech-interest-level")[0] as HTMLInputElement).valueAsNumber;
      techInterests.push({
        name: name,
        icon: icon,
        interestLevel: interestLevel,
      });
    }

    // create user object
    const user: iUser = {
      userID: userID,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      picture: picture,
      title: title,
      email: email,
      about: about,
      contacts: contacts,
      techInterests: techInterests,
      projects: [],
    };

    // log user object
    console.log(user);
    // send user object to api
    const putUserAPI = API.BASE_URL + API.PUT_USER.replace("{id}", userID);
    console.log(putUserAPI);

    fetch(putUserAPI, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    const contactCopy = user.contacts;

    setAboutContent(user.about);

    const editorProps = {
      content: user.about,
      toolbarClassName: "admin-me-form-about-editor-toolbar",
      wrapperClassName: "admin-me-form-about-editor",
      editorClassName: "admin-me-form-about-editor-content",
      getContent: getContent,
    };

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
          <ContactHandler contactData={contactCopy} />
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
          <ControlledEditor {...editorProps} />
          <div id="hidden-about" style={{ display: "none" }}>
            {user.about}
          </div>
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
