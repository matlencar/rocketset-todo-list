import { useState } from 'react'
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'
interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskInputError, setNewTaskInputError] = useState(false)

  function handleCreateNewTask() {
      // Crie uma nova task com um id random, não permita criar caso o título seja vazio.



      const newTask = {
        id: crypto.randomUUID(),
        title: newTaskTitle,
        isComplete: false
      }
      if(!newTaskTitle.trim().length) {
        setNewTaskInputError(true)
        return 
      }
      setTasks([...tasks, newTask ])
      
      console.log(handleCreateNewTask)
      
    }
  
  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const checkTask = tasks.map(tasks => {
      if(tasks.id == id) {
        return {
          ...tasks,
          isComplete: !tasks.isComplete,
          
        }
      }
      return tasks
      
    });
    setTasks(checkTask)
    console.log(checkTask)
    }
    
    function handleRemoveTask(idTasks: string) {
      // Remova uma task da listagem pelo ID
      const removeTasks = tasks.filter(tasks => tasks.id != idTasks);
      setTasks(removeTasks);
    }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
          <button type="submit" data-testid="add-task-button" onClick={()=>{handleCreateNewTask()}}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}
