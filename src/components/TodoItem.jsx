import React from 'react'

const TodoItem = ({ title, id, description, updateHandler, deleteHandler, isCompleted }) => {


    return (
        <div className="ptodos">

            <div className='todos'>
                <div className="dt">
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
                <div className="fm">
                    <input type="checkbox" onChange={()=>updateHandler(id)} checked={isCompleted} />
                    <button onClick={()=>deleteHandler(id)}>Delete</button>
                </div>

            </div>
        </div>
    )
}

export default TodoItem