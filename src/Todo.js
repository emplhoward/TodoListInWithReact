import React from 'react'

export default function Todo({task, updateTasks}) {
    function handleToDoClick() {
        updateTasks(task.id)
    }

    return (
        <div>
            <label>
                <input type="checkbox"  checked={task.complete} onChange={handleToDoClick}/>
                {task.name}
            </label>
            
        </div>
    )
}