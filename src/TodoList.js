import React from 'react'
import Todo from './Todo'

export default function TodoList({doList, updateTasks}) {
    return (
        <div>
            {               
                doList.map(eachDo => { // For each do in do list.                    
                    return <Todo key={eachDo.id} updateTasks={updateTasks} task={eachDo} />
                })
            }

        </div>
    )
}