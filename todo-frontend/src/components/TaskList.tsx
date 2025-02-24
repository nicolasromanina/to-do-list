// TaskList.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Task, getTasks, deleteTask } from '../services/taskService';
import { formatDate } from '../utils/dateUtils';
import LoadingSpinner from './LoadingSpinner';
import { FiCalendar, FiEdit2, FiInbox, FiPlus, FiTrash2 } from 'react-icons/fi'; // exemples d'icônes modernes

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'title' | 'status'>('dueDate');
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'dueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    });

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setDeleteConfirm(null);
    fetchTasks();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Mes Tâches
        </h1>
        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
        >
          <FiPlus className="text-xl" />
          Nouvelle Tâche
        </Link>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="w-full md:w-64 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white bg-select-chevron bg-no-repeat bg-right-4 bg-4 transition-colors duration-300"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="dueDate">Date d'échéance</option>
          <option value="title">Titre</option>
          <option value="status">Statut</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-50 hover:border-blue-50 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1"></div>
            
            <div className="flex justify-between items-start z-10">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
                {task.description && (
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {task.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide ${
                    task.completed 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {task.completed ? '✓ Terminée' : '⌛ En cours'}
                  </span>
                  {task.dueDate && (
                    <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                      <FiCalendar className="mr-2 text-gray-500" />
                      <span className="text-gray-700">
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 ml-4">
                <Link
                  to={`/edit/${task.id}`}
                  className="p-2 hover:bg-blue-100 rounded-full transition-colors duration-200 text-blue-600 hover:text-blue-800"
                  title="Modifier"
                >
                  <FiEdit2 size={18} />
                </Link>
                <button
                  onClick={() => setDeleteConfirm(task.id)}
                  className="p-2 hover:bg-red-100 rounded-full transition-colors duration-200 text-red-600 hover:text-red-800"
                  title="Supprimer"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>

            {deleteConfirm === task.id && (
              <div className="mt-4 pt-4 border-t-2 border-red-100">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-red-700 font-medium text-sm flex-1">
                    Confirmer la suppression ?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-100 hover:bg-red-600 hover:text-white text-red-700 px-4 py-2 rounded-full transition-all duration-300 text-sm font-semibold"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-all duration-300 text-sm font-semibold"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="col-span-full text-center py-12 space-y-4">
            <div className="inline-block bg-blue-100 p-4 rounded-full">
              <FiInbox className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              Aucune tâche trouvée
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Commencez par créer une nouvelle tâche en cliquant sur le bouton ci-dessus
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
