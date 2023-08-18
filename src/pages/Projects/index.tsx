import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectItem from '../../components/ProjectItem';
import './style.css';
import AddProject from '../../components/AddProject';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function ProjectsPage() {
  type Project = {
    id: string;
    title: string;
    description: string;
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');

  const getProjects = async () => {
    try {
      const res = await axios.get(
        'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/projects/get',
        { headers: { Authorization: `Bearer ${tokens.idToken}` } }
      );
      if (res.status === 200) {
        setProjects(res.data);
      }
    } catch (e: any) {
      if (e.response.status === 401) {
        navigate('/login');
      }
      console.error(e);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <button type="button" className="logout">
        <LogoutIcon
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        />
      </button>
      <h1>Your Projects</h1>
      <AddProject />
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
