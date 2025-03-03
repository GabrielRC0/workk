import ProjectsScreens from "./components/ProjectsScreens";

export default async function HomePage() {
  const res = await fetch("http://backend:3001/projects-screens", {
    cache: "no-store",
  });
  const data = await res.json();

  return <ProjectsScreens data={data} />;
}
