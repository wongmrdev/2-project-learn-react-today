import React, {useContext} from 'react'
import {RecipeContext} from './App'

export default function ModalDeleteConfirmation(props) {
const { handleRecipeDelete } = useContext(RecipeContext)

const { id,
        handleDeleteCancelButtonKeyPress
        // others already delcared by Context handleRecipeDelete
    } = props

    return (
        <div className="delete-dialogue-box">
            <div className="delete-dialogue-box__title">Are you sure you want to delete {id}?</div>
            <button id='confirm-delete' className="btn" onClick={handleRecipeDelete(id)}>ok</button>
            <button id='cancel-delete' className="btn" onClick={handleDeleteCancelButtonKeyPress}>cancel</button>
        </div>
    )
}
