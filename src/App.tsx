import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import _config from './config.yml';
import { ToastContainer, toast } from 'react-toastify';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface Config {
  page: {
    title: string;
    contacts: {
      title: string;
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
      button: string;
    };
    toast: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  projects: Project[];
}

const config: Config = _config as Config;

const projects: Project[] = config.projects;

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast(config.page.toast, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      style: {
        color: 'black',
        fontSize: '12px',
        fontWeight: 500,
      },
    });

    // Handle form submission here
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  document.title = config.page.title;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{config.page.title}</h1>
        </div>
      </header>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{config.page.contacts.title}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {config.page.contacts.name.label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder={config.page.contacts.name.placeholder}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {config.page.contacts.email.label}
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder={config.page.contacts.email.placeholder}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                {config.page.contacts.message.label}
              </label>
              <textarea
                id="message"
                rows={3}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder={config.page.contacts.message.placeholder}
                className="resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-indigo-700 transform hover:translate-y-[-1px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {config.page.contacts.button}
            </button>
          </form>

          <div className="mt-8 space-y-3">
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="text-indigo-500" size={18} />
              <span className="text-sm">{config.contact.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="text-indigo-500" size={18} />
              <span className="text-sm">{config.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="text-indigo-500" size={18} />
              <span className="text-sm">{config.contact.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => {
            setSelectedProject(null);
          }}
        >
          <div className="relative bg-white rounded-lg max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-[60vh] object-cover rounded-lg"
              />
              <h3 className="text-2xl font-bold mt-4">{selectedProject.title}</h3>
              <p className="text-gray-600 mt-2">{selectedProject.description}</p>
              <p className="text-sm text-indigo-600 mt-2">{selectedProject.category}</p>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
