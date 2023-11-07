import React, { useEffect } from "react";
import API from "../../../lib/API";
import "./styles/projects.css";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

const Projects = () => {
  const projectAPI = API.BASE_URL + API.GET_USER_PROJECTS.replace("{id}", "6396d88feafa14a262f9915c");

  const fetchProjects = async () => {
    const response = await fetch(projectAPI);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchProjects().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div id="admin-projects">
      <div id="admin-content-header">
        <div id="admin-projects-header-title">.projects</div>
      </div>
      <div id="admin-projects-content">
        {/* use reacttable */}

        <div id="admin-projects-add-new-project-button">Add Project</div>
        <div id="admin-projects-content-goes-here"></div>
      </div>
    </div>
  );
};

export default Projects;
