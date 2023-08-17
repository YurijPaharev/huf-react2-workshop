import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectItem from '../../components/ProjectItem';
import './style.css';

function ProjectsPage() {
  type Project = {
    id: string;
    title: string;
    description: string;
  };

  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = async () => {
    const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
    try {
      const res = await axios.get(
        'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/projects/get',
        { headers: { Authorization: `Bearer ${tokens.idToken}` } }
      );
      setProjects(res.data);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <h1>Your Projects</h1>
      <ul>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            title={project.title}
            description={project.description}
          />
        ))}
      </ul>
    </>
  );
}

export default ProjectsPage;
