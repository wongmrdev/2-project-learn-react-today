import React, {useContext} from 'react'
import {RecipeContext} from './App'
import ReactDom from 'react-dom'


export default function ModalDeleteConfirmation(props) {
    const { handleRecipeDelete } = useContext(RecipeContext)

    const { id, name,
        onClose,
        confirming
        // others already delcared by Context handleRecipeDelete
    } = props
    function handleOkButtonPress () {
        console.log(id);
        onClose();
        handleRecipeDelete(id)
    }
    function handleClickOff(e) {
        console.log(e.target.className);
        if(e.target.className==='delete-dialogue-box'){
            if(confirming){
                onClose();
            }
        }
    }

    if (!confirming) return null

    return ReactDom.createPortal (
        <>
        <div className="delete-dialogue-box" onClick={(e)=>handleClickOff(e)}> 
            <div className="modal-grid-container">
                <div className="delete-dialogue-box__title">Delete Recipe</div>
                <div className="delete-dialogue-box__notice">Are you sure you want to delete recipe: {name ? name: 'Unnamed recipe' }?</div>
                <button id='confirm-delete' className="btn btn--danger" onClick={handleOkButtonPress}>ok</button>
                <button id='cancel-delete' className="btn btn--primary" onClick={onClose}>cancel</button>
            </div>
        </div>
        </>,
        document.getElementById('portal-root')
    )
}
