"use client";

import React, { useState } from "react";

export default function ProjectsScreens({ data }) {
  const [hoverScreen, setHoverScreen] = useState(null);

  const handleMouseEnter = (project) => {
    if (project.screens && project.screens.length > 0) {
      setHoverScreen({
        user: project.user_name,
        projectTitle: project.project_title,
        ...project.screens[0],
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverScreen(null);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ flex: 1 }}>
        <h1>Lista de Projetos</h1>
        <table
          border="1"
          cellPadding="5"
          cellSpacing="0"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID do Projeto</th>
              <th>Título</th>
              <th>Usuário</th>
              <th>Nº de Telas</th>
            </tr>
          </thead>
          <tbody>
            {data.map((proj) => (
              <tr
                key={proj.project_id}
                onMouseEnter={() => handleMouseEnter(proj)}
                onMouseLeave={handleMouseLeave}
              >
                <td>{proj.project_id}</td>
                <td>{proj.project_title}</td>
                <td>{proj.user_name}</td>
                <td>{proj.screens.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hoverScreen && (
        <div
          style={{
            width: "300px",
            marginLeft: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h3>Preview do Projeto</h3>
          <div
            style={{
              backgroundColor: hoverScreen.header_color,
              padding: "10px",
              color: "#fff",
            }}
          >
            Header: {hoverScreen.header_color}
          </div>
          <div
            style={{
              backgroundColor: hoverScreen.body_color,
              padding: "10px",
              margin: "10px 0",
              color: "#000",
            }}
          >
            Body: {hoverScreen.body_color}
          </div>
          <div
            style={{
              backgroundColor: hoverScreen.footer_color,
              padding: "10px",
              color: "#fff",
            }}
          >
            Footer: {hoverScreen.footer_color}
          </div>
          <p style={{ marginTop: "10px", fontSize: "0.9em" }}>
            Projeto: {hoverScreen.projectTitle} <br />
            Usuário: {hoverScreen.user}
          </p>
        </div>
      )}
    </div>
  );
}
