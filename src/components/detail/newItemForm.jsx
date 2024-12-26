import { useState, useContext } from "react";
import { SettingsContext } from "../../helpers/settingsContext";
import { languages } from "../../helpers/languages";

import './newItemForm.css';

export default function NewItemForm({ onSubmit, onCancel }){
    const { lang, darkMode } = useContext(SettingsContext);
    const [ name, setName ] = useState('');
    const [ quantity, setQuantity ] = useState(1);

    const [ showNameWarning, setShowNameWarning ] = useState(false);
    const [ showNumberWarning, setShowNumberWarning ] = useState(false);

    return(<div className={`newItemForm${darkMode ? ' dark' : ''}`}>
        <h3>{languages[lang].newItem}</h3>
        <label>
            {languages[lang]["name"]}
            <input
                type="text"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    e.target.value.length > 0 ? setShowNameWarning(false) : setShowNameWarning(true);
                }}
                className="itemNameField"
            />
            {showNameWarning && <div className="warning">{languages[lang].mandatory}</div>}
        </label>
        <label>
            {languages[lang]["quantity"]}
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
            {showNumberWarning && <div className="warning">{languages[lang].mandatory}</div>}
        </label>
        <div className="buttons">
            <button onClick={() => onCancel()}>{languages[lang].cancel}</button>
            <button
                className="save"
                onClick={() => onSubmit(name, Number(quantity))}
                disabled={Number(quantity) < 1 || name.length < 1}
            >{languages[lang]['add']}</button>
        </div>
    </div>)
}