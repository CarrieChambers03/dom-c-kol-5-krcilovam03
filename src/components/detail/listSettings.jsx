import { useContext, useState } from 'react';
import { ListContext } from '../../helpers/listContext';
import { SettingsContext } from '../../helpers/settingsContext';
import { languages } from '../../helpers/languages';

import ListNameForm from './listNameForm.jsx';
import './listSettings.css';

export default function ListSettings({ onClose }){
    const { userId, lang, darkMode } = useContext(SettingsContext);
    const { filterSetting } = useContext(ListContext);
    const { list } = useContext(ListContext);

    const [ filter, setFilter ] = useState(filterSetting);
    const [ action, setAction ] = useState(null);

    const [ showNameForm, setShowNameForm ] = useState(false);
    const [ showConfirmation, setShowConfirmation ] = useState(false);

    return(<div className={`settingsWindow${darkMode? ' dark': ''}`}>
        {showNameForm && <div>
            <div className='backdrop'></div>
            <ListNameForm onCancel={() => setShowNameForm(false)} onSave={(name) => {
                setShowNameForm(false);
                onClose(filter, 'nameChange', name);
            }} />
        </div>}

        {showConfirmation && <div>
            <div className='backdrop'></div>
            <div className='confirmation'>
                <h3>{languages[lang].confirmation.replace('{action}', languages[lang][action])}</h3>
                <div className='buttons'>
                    <button className='cancel' onClick={() => setShowConfirmation(false)}>{languages[lang].cancel}</button>
                    <button className='confirm' onClick={() => {
                        setShowConfirmation(false);
                        const a = action;
                        setAction(null);
                        onClose(filter, a);
                    }}>{languages[lang][action]}</button>
                </div>
            </div>    
        </div>}

        <button className='xButton' onClick={() => onClose(filter)}>x</button>
        <h3>{languages[lang].settings}</h3>
    
        <label className="filterCheckbox"><input type="checkbox" className="checkbox" id="filter" checked={filter} onChange={() => setFilter(!filter)} /> 
            <svg className={`checkbox ${filter ? 'checkbox--active' : ''}`} aria-hidden="true" viewBox='0 0 15 11'fill='none'>
            <path d="M1 4.5L5 9L14 1" strokeWidth="2" stroke={filter ? 'white' : "none"} />
            </svg>
            {languages[lang].filterText}
        </label>

        {userId === list.owner && <div className='buttons'>
            <button className="nameChangeButton" onClick={() => setShowNameForm(true)}>{languages[lang].nameChange}</button>
            <button className='archiveButton' onClick={() => {
                setAction(`${list.archived? 'un': ''}archive`);
                setShowConfirmation(true);
            }}>{list.archived? languages[lang].unarchive : languages[lang].archive} {languages[lang]["list"]}</button>
            <button className="deleteButton" onClick={() => {setAction('delete'); setShowConfirmation(true)}}>{languages[lang].delete} {languages[lang]["list"]}</button>
        </div>}
    </div>)
}