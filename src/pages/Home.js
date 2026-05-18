import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";


function Home() {

    const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editDate, setEditDate] = useState(""); 
  
  

   useEffect(() => {
  axios.get("https://task-manager-backend-xb2v.onrender.com/tasks")
    .then((res) => {
      setTasks(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);





  const addTask = () => {
      if (task.trim() === "") return;

      axios.post("https://task-manager-backend-xb2v.onrender.com/tasks", {
        text: task,
        status: status,
        priority: priority,
        dueDate: dueDate
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setTask("");
        setStatus("");
        setPriority("");
        setDueDate("");
      });
    };


    const deleteTask = (id) => {
    axios.delete(`https://task-manager-backend-xb2v.onrender.com/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== id));
      });
    };

    // const toggleTask = (id) => {
    // axios.put(`https://task-manager-backend-xb2v.onrender.com/tasks/${id}`)
    //   .then((res) => {
    //     setTasks(tasks.map((t) => t._id === id ? res.data : t));
    //   });
    // };

    const filteredTasks = tasks
    .filter((t) => {
      if (filter === "completed") return t.status === "Completed";
      if (filter === "pending") return t.status === "Pending";
      return true;
    })
    .filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    );

    const clearAllTasks = () => {
      axios.delete("https://task-manager-backend-xb2v.onrender.com/tasks")
        .then(() => {
          setTasks([]);
        });
    };

  return (
    
    <div className="app main_app">
      
      <div className="container main_container">
       
        <div className="d-flex justify-content-between">
          
          <p className=" fw-bold mt-3" >
            Total: {tasks.length} | Completed: {tasks.filter(t => t.status === "Completed").length}
          </p>
        </div>
        
        <div className="main_top d-flex justify-content-between mb-3">
          <div className="mb-3 filter_sec">
            <button className="btn btn-outline-primary me-2" onClick={() => setFilter("all")}>All</button>
            <button className="btn btn-outline-success me-2" onClick={() => setFilter("completed")}>Completed</button>
            <button className="btn btn-outline-warning me-2" onClick={() => setFilter("pending")}>Pending</button>
            <button className="btn btn-outline-danger" onClick={clearAllTasks}>Clear All</button>
          </div>
          <div className="search_box">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="🔍 Search task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        
        <div className="form_main mb-4">
          <div className=" text-center">
            <div className="row">
              <div className="col-md-3 mb-3">
                {/* Task Input */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
              <div className="col-md-3 mb-3">
                {/* Status */}
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                {/* Priority */}
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                {/* Due Date */}
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="col-12 pt-2">
               {/* Add Button */}
                <button
                  className="btn btn-success "
                  onClick={addTask}
                >
                 Add Task
                </button>
              </div>
            </div>
          </div>
          

          

          

          

         

        </div>

        <div className="row">
          {filteredTasks.map((t, index) => (
            <div className="col-md-4 list_item mb-4" key={t._id}>
              <div className="project_detail">
              {editId === t._id? (
                <div className="project_edit">

                  <input
                    className="form-control mb-1"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />

                  <select
                    className="form-select mb-1"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>

                  <select
                    className="form-select mb-1"
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  >
                    <option value="">Select Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>

                  <input
                    type="date"
                    className="form-control mb-1"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />

                </div>
              ) : (
                <span
                  
                >
                  <div className="project_cont">
                    <h4>{t.text}</h4>

                    <small>
                      Status:
                      <span className={
                        t.status === "Completed" ? "text-success" :
                        t.status === "In Progress" ? "text-primary" :
                        "text-warning"
                      }>
                        {" "}{t.status}
                      </span>
                    </small>

                    <br />

                    <small>
                      Priority:
                      <span className={
                        t.priority === "High" ? "text-danger" :
                        t.priority === "Medium" ? "text-warning" :
                        "text-success"
                      }>
                        {" "}{t.priority}
                      </span>
                    </small>

                    <br />

                    <small>
                      Due: {t.dueDate || "No date"}
                    </small>
                  </div>
                </span>
              )}

              <div>
                <button className="btn btn-sm btn-danger me-2" onClick={() => deleteTask(t._id)}>Remove Task</button>

                <button className="btn btn-sm btn-warning me-2" onClick={() => {
                  setEditId(t._id);
                  setEditText(t.text);
                  setEditStatus(t.status);
                  setEditPriority(t.priority);
                  setEditDate(t.dueDate);
                }}
                
                >Edit Task</button>

                {editId === t._id&& (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      axios.put(`https://task-manager-backend-xb2v.onrender.com/tasks/edit/${t._id}`, {
                        text: editText,
                        status: editStatus,
                        priority: editPriority,
                        dueDate: editDate
                      })
                      .then((res) => {
                        setTasks(tasks.map((task) =>
                          task._id === res.data._id ? res.data : task
                        ));
                        setEditId(null);
                        
                      });
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
              </div>
            </div>
          ))}
        </div>

       {loading ? (
        <p>Loading tasks... ⏳</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-muted" >No tasks available</p>
      ) : filteredTasks.length === 0 ? (
        <p>No tasks found 😴</p>
      ) : null}

      
        
      </div>
    </div>

  );
}




export default Home;