import { useState, useEffect, useContext } from 'react';

import { SettingsContext } from '../../helpers/settingsContext';
import { ListContext } from '../../helpers/listContext';
import { languages } from '../../helpers/languages';
import './listNameForm.css';

export default function ListNameForm({ onCancel, onSave }){
    const { list } = useContext(ListContext);
    const { lang, darkMode } = useContext(SettingsContext);
    const [ listName, setListName ] = useState('');

    useEffect(() => {
        setListName(list.name);
    }, [list]);

    return(<div className={`listNameForm${darkMode ? ' dark' : ''}`}>
        <h3>{languages[lang].listName}</h3>
        <div className='inputField'>
            <input type='text' onChange={(e) => setListName(e.target.value)} value={listName} />
            <button className='clear' onClick={() => setListName('')}>{languages[lang].clear}</button>
        </div>
        <div className='nameButtons'>
            <button className='cancel' onClick={() => onCancel()}>{languages[lang].cancel}</button>
            <button className='save' onClick={() => onSave(listName)}>{languages[lang].save}</button>
        </div>
    </div>)
}