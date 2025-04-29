import React, { useContext, useState, useEffect } from 'react'
import {UserContext} from '../context/user.context';
import axios from '../config/axios.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  function createProject(e){
    e.preventDefault();
    console.log({projectName});
    const token = localStorage.getItem('token');
    console.log('Token:', token);


    axios.post(
      '/projects/create',
      { name: projectName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
      });
  }

  useEffect(() => {
    axios.get('/projects/all').then((res) => {
  
      setProjects(res.data.projects);
    }).catch((error) => {
      console.error(error);
    });
  },[]);

  return (
    <main className='p-4'>
      <div className="projects flex flex-wrap gap-3 text-white">
        <button 
        onClick={() => setIsModalOpen(true)}
        className="project p-4 border-2 border-transparent rounded-md cursor-pointer 
        bg-white/10 backdrop-blur-md border-2 border-transparent hover:bg-black/50 
        hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500 transition-all" 
        style={{ textShadow: '0 0 6px rgba(243, 234, 175, 0.5), 0 0 15px rgba(243, 234, 175, 0.5)' }}>
          <div className="flex items-center justify-center text-white font-semibold text-lg">
            New Project <i className="ri-link ml-2"></i>
        </div>
        </button>
        {
          projects.map((project) => (
            <div key={project._id} 
            onClick={ () => {navigate(`/project`,{
              state: { project }
            })}}
            className="project flex flex-col gap-2 p-4 rounded-md cursor-pointer min-w-52 
    bg-white/10 backdrop-blur-md border-2 border-transparent hover:bg-black/50 
    hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500 transition-all" 
    style={{ textShadow: '0 0 6px rgba(243, 234, 175, 0.4), 0 0 15px rgba(243, 234, 175, 0.4)' }}>
              <h2 className='font-semibold text-white text-xl'>{project.name}</h2>
              <div className='flex gap-2 '>
                <p><i className='ri-user-line'></i> <small>Collaborators : </small></p>
                {project.users.length}
              </div>
            </div>
          ))
        }
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  type="text"
                  id="projectName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </main>
  )
}

export default Home
