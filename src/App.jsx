import {BrowserRouter,Routes,Route} from "react-router-dom"

import TaskList from "./pages/TaskList"
import TaskDetail from "./pages/TaskDetail"

import {TaskContext} from "./context/TaskContext"
import {useTasks} from "./hooks/useTasks"

export default function App(){

const taskData = useTasks()

return(

<TaskContext.Provider value={taskData}>

<BrowserRouter>

<Routes>

<Route path="/" element={<TaskList/>}/>

<Route path="/tasks/:id" element={<TaskDetail/>}/>

</Routes>

</BrowserRouter>

</TaskContext.Provider>

)

}