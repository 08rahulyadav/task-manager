import {useContext} from "react"
import {TaskContext} from "../context/TaskContext"
import {api} from "../api/axios"
import {Link} from "react-router-dom"

export default function TaskItem({task}){

const {tasks,setTasks} = useContext(TaskContext)

const toggleComplete = async ()=>{

await api.patch(`/todos/${task.id}`,{
completed:!task.completed
})

setTasks(tasks.map(t=>t.id===task.id?{...t,completed:!t.completed}:t))

}

const deleteTask = async ()=>{

if(!confirm("Delete task?")) return

await api.delete(`/todos/${task.id}`)

setTasks(tasks.filter(t=>t.id!==task.id))

}

return(

<div className="flex justify-between items-center bg-gray-50 border rounded-lg p-3 mb-3 hover:shadow">

<Link to={`/tasks/${task.id}`}
className={`flex-1 ${task.completed?"line-through text-gray-400":""}`}>

{task.title}

</Link>

<div className="flex gap-3">

<input
type="checkbox"
checked={task.completed}
onChange={toggleComplete}
/>

<button
onClick={deleteTask}
className="text-red-500 font-bold"
>

X

</button>

</div>

</div>

)

}