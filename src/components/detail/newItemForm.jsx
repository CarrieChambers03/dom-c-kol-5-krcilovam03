import { useState } from "react";

import './newItemForm.css';

export default function NewItemForm({ onSubmit, onCancel }){
    const [ name, setName ] = useState('');
    const [ quantity, setQuantity ] = useState(1);

    const [ showNameWarning, setShowNameWarning ] = useState(false);
    const [ showNumberWarning, setShowNumberWarning ] = useState(false);

    return(<div className="newItemForm">
        <h3>New Item</h3>
        <label>
            Name
            <input
                type="text"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    e.target.value.length > 0 ? setShowNameWarning(false) : setShowNameWarning(true);
                }}
                className="itemNameField"
            />
            {showNameWarning && <div className="warning">This field is mandatory.</div>}
        </label>
        <label>
            Quantity
            <input
                type="number"
                className="quantityInput"
                value={quantity}
                min="1"
                max="99"
                onChange={(e) => {
                    setQuantity(e.target.value);
                    e.target.value.length > 0 ? setShowNumberWarning(false) : setShowNumberWarning(true);
                }}
                onKeyDown={(e) => {
                    if(e.key === 'e' || e.key === 'E' || e.key === '.' || e.key === '-' || e.key === '+' || (quantity.length >= 2 && e.key !== 'Backspace')){
                        e.preventDefault();
                    }
                }}
            />
            {showNumberWarning && <div className="warning">This field is mandatory.</div>}
        </label>
        <div className="buttons">
            <button onClick={() => onCancel()}>Cancel</button>
            <button
                className="save"
                onClick={() => onSubmit(name, Number(quantity))}
                disabled={Number(quantity) < 1 || name.length < 1}
            >Add</button>
        </div>
    </div>)
}