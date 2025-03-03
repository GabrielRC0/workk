import React from "react";

function Home({ usersProjects }) {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Usuários e seus Projetos</h1>
      {usersProjects.map((user) => (
        <div key={user.id} style={{ marginBottom: "20px" }}>
          <h2>{user.name}</h2>
          <ul>
            {user.projects.map((project) => (
              <li key={project.id}>{project.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://backend:3001/users-projects");
  const usersProjects = await res.json();
  return { props: { usersProjects } };
}

export default Home;
