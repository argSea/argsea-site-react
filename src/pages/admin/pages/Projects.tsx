import React, { useEffect } from "react";
import API from "../../../lib/API";
import "./styles/projects.css";
import iProject from "../../../interfaces/iProject";
import { FaPlus } from "react-icons/fa";

const Projects = () => {
  const [projectHTML, setProjectHTML] = React.useState(
    <tr>
      <td>Loading...</td>
    </tr>
  );

  const projectAPI = API.BASE_URL + API.GET_USER_PROJECTS.replace("{id}", "6396d88feafa14a262f9915c");

  const fetchProjects = async () => {
    const response = await fetch(projectAPI);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchProjects().then((data) => {
      if (data["projects"].length < 1) {
        return;
      }

      const rData = data["projects"].map((project: iProject) => {
        return (
          <tr key={project.projectID}>
            <td>{project.name}</td>
            <td>{project.shortName}</td>
            <td>{project.priority}</td>
            <td>{project.progress}</td>
            <td>
              <input type="checkbox" defaultChecked={project.isActive} />
            </td>
            <td>
              <input type="checkbox" defaultChecked={project.isReleased} />
            </td>
            <td>
              <input type="checkbox" defaultChecked={project.isHidden} />
            </td>
          </tr>
        );
      });

      setProjectHTML(rData);
    });
  }, []);

  const tableHeaders = [".name", ".shortName", ".priority", ".progress", ".active", ".released", ".hidden"];

  return (
    <div id="admin-projects">
      <div id="admin-content-header">
        <div id="admin-projects-header-title">.projects</div>
      </div>
      <div id="admin-projects-content">
        <div id="admin-projects-add-new-project-button">
          <FaPlus id="admin-projects-add-new-project-button-plus" /> Add New
        </div>
        <table id="admin-projects-table">
          <thead>
            <tr>
              {tableHeaders.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody id="admin-projects-content-goes-here">{projectHTML}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
