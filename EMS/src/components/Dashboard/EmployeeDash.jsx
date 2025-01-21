import Headers from "../Others/Headers"
import TaskListNumber from "../Others/TaskListNumber"
import TaskList from "../TaskList/TaskList"

const EmployeeDash = () => {
  return (
    <div className="p-10 bg-[#1c1c1c] h-screen">
        <Headers />
        <TaskListNumber />
        <TaskList />
    </div>
  )
}

export default EmployeeDash