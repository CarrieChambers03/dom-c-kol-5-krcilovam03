import { useState, useEffect, useContext } from 'react';

import { ListContext } from '../../helpers/listContext';
import './listNameForm.css';

export default function ListNameForm({ onCancel, onSave }){
    const { list } = useContext(ListContext);
    const [ listName, setListName ] = useState('');

    useEffect(() => {
        setListName(list.name);
    }, [list]);

    return(<div className='listNameForm'>
        <h3>Enter new list name</h3>
        <div className='inputField'>
            <input type='text' onChange={(e) => setListName(e.target.value)} value={listName} />
            <button className='clear' onClick={() => setListName('')}>Clear</button>
        </div>
        <div className='nameButtons'>
            <button className='cancel' onClick={() => onCancel()}>Cancel</button>
            <button className='save' onClick={() => onSave(listName)}>Save</button>
        </div>
    </div>)
}