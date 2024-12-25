import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

import { ListContext } from '../../helpers/listContext';
import { SettingsContext } from '../../helpers/settingsContext';
import { languages } from '../../helpers/languages';

import NewItemForm from './newItemForm';
import './itemList.css';

export default function ItemList({ onItemChange }){
    const { lang } = useContext(SettingsContext);
    const { filterSetting } = useContext(ListContext);
    const { list } = useContext(ListContext);
    const [items, setItems] = useState([]);

    const [ showNewItemForm, setShowNewItemForm ] = useState(false);

    useEffect(() => {
        if(filterSetting){setItems(list.items.filter(i => i.state === 'active'));}
        else{setItems(list.items);}
    }, [list, filterSetting]);

    return(<div className='itemList'>
        <div className='items'>
            {items.map(i => {return(
                <div key={i.name} className={i.state}>
                    <div className='item'>
                        <label className='itemCheck'>
                        <input className="checkbox"
                            type="checkbox" 
                            checked={i.state === 'checked'}
                            onChange={() => {onItemChange(i.name, i.state === 'checked' ? 'active' : 'checked')}}
                        />
                        <svg
                            className={`checkbox ${i.state === 'checked' ? 'checkbox--active' : ''}`}
                            aria-hidden="true"
                            viewBox='0 0 15 11'
                            fill='none'
                        >
                           <path d="M1 4.5L5 9L14 1" strokeWidth="2" stroke={i.state === 'checked' ? 'white' : "none"} />
                        </svg>
                        <div className='itemName' title={i.name.length > 10 ? i.name : ''}>
                            {i.name.length > 10 ? i.name.slice(0, 7) + '...' : i.name}
                        </div>
                        <div>{`x${i.quantity}`}</div>
                        </label>

                        <div className="buttons">
                            <FontAwesomeIcon 
                                icon={faSquareMinus}
                                className={`icon ${i.quantity ===1 || i.state==='checked' ? 'disabled' : 'active'}`} 
                                onClick={() => {
                                    if(i.quantity === 1 || i.state === 'checked') return;
                                    else onItemChange(i.name, "dec");
                                }}
                            />
                            <FontAwesomeIcon 
                                icon={faSquarePlus} 
                                className={`icon ${i.state === 'checked' ? 'disabled' : 'active'}`}
                                onClick={() => {
                                    if(i.state === 'checked') return;
                                    else onItemChange(i.name, "inc");
                                }}
                            />
                            <FontAwesomeIcon className='icon active' icon={faTrashCan} onClick={() => onItemChange(i.name, "del")} />  
                        </div>
                    </div>
                </div>
            )})}
        </div>

        {showNewItemForm && <NewItemForm
            onCancel={() => setShowNewItemForm(false)}
            onSubmit={(name, quantity) => {
                onItemChange(name, 'add', quantity);
                setShowNewItemForm(false);
            }}
        />}

        <button className='newItem' onClick={() => setShowNewItemForm(true)}>{languages[lang]['add']}</button>

    </div>)
}