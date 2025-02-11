import { FormEvent, useEffect, useState } from 'react';
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
    toast: {
      loading: string;
      success: string;
      error: string;
    };
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  projects: Project[];
}

const config: Config = _config as Config;

const projects: Project[] = config.projects.map(p => ({
  ...p,
  id: Math.random(),
}));

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const loading = toast(config.page.toast.loading, {
      position: 'top-center',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      closeButton: false,
      style: {
        color: 'black',
        fontSize: '12px',
        fontWeight: 500,
      },
    });

    // send to formsubmit.co
    await fetch(`https://formsubmit.co/ajax/${config.contact.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })
      .catch(() => {
        toast.error(config.page.toast.error);
        throw new Error('Failed to send message');
      })
      .finally(() => {
        toast.dismiss(loading);
        setFormData({ name: '', email: '', message: '' });
      });

    toast(config.page.toast.success, {
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
  };

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [opened]);

  document.title = config.page.title;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{config.page.title}</h1>
        </div>
      </header>
      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-3 py-12">
        <div className="grid grid-cols-3 gap-1">
          {projects.map(project => (
            <div
              key={project.id}
              className="relative group cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => {
                setSelectedProject(project);
                setOpened(true);
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 hidden md:visible">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xs sm:text-sm lg:text-xl font-semibold">{project.title}</h3>
                  <p className="text-xs lg:text-sm">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Form */}
      <div className="max-w-xl mx-auto px-3 py-12">
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
              className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-indigo-700 hover:translate-y-[-1px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-transform md:transition-opacity duration-100 ease-in-out md:bg-black md:bg-opacity-75
            ${opened ? '' : 'translate-x-full md:opacity-0'}
            `}
        onClick={() => {
          setOpened(false);
        }}
      >
        <div className="relative bg-white max-w-4xl w-full h-dvh md:h-auto" onClick={e => e.stopPropagation()}>
          <div>
            <div className="p-4 flex flex-row items-end gap-2">
              <button
                className="md:hidden text-gray-600 mb-[1px]"
                onClick={() => {
                  setOpened(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h3 className="text-xl font-bold">{selectedProject?.title}</h3>
            </div>
            <img src={selectedProject?.image} alt={selectedProject?.title} className="w-full h-[60vh] object-cover" />
            <div className="p-4">
              <p className="text-gray-600 mt-2">{selectedProject?.description}</p>
              <p className="text-sm text-indigo-600 mt-2">{selectedProject?.category}</p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
