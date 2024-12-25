import { useContext, useState } from 'react';
import { ListContext } from '../../helpers/listContext';
import { SettingsContext } from '../../helpers/settingsContext';

import ListNameForm from './listNameForm.jsx';
import './listSettings.css';

export default function ListSettings({ onClose }){
    const { userId } = useContext(SettingsContext);
    const { filterSetting } = useContext(ListContext);
    const { list } = useContext(ListContext);

    const [ filter, setFilter ] = useState(filterSetting);
    const [ action, setAction ] = useState(null);

    const [ showNameForm, setShowNameForm ] = useState(false);
    const [ showConfirmation, setShowConfirmation ] = useState(false);

    return(<div className='settingsWindow'>
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
                <h3>{`Do you want to ${action} list ${list.name}?`}</h3>
                <div className='buttons'>
                    <button className='cancel' onClick={() => setShowConfirmation(false)}>cancel</button>
                    <button className='confirm' onClick={() => {
                        setShowConfirmation(false);
                        const a = action;
                        setAction(null);
                        onClose(filter, a);
                    }}>{action}</button>
                </div>
            </div>    
        </div>}

        <button className='xButton' onClick={() => onClose(filter)}>x</button>
        <h3>Settings {list.name}</h3>
    
        <label className="filterCheckbox"><input type="checkbox" className="checkbox" id="filter" checked={filter} onChange={() => setFilter(!filter)} /> 
            <svg className={`checkbox ${filter ? 'checkbox--active' : ''}`} aria-hidden="true" viewBox='0 0 15 11'fill='none'>
            <path d="M1 4.5L5 9L14 1" strokeWidth="2" stroke={filter ? 'white' : "none"} />
            </svg>
            {"Hide completed items"}
        </label>

        {userId === list.owner && <div className='buttons'>
            <button className="nameChangeButton" onClick={() => setShowNameForm(true)}>Change Name</button>
            <button className='archiveButton' onClick={() => {
                setAction(`${list.archived? 'un': ''}archive`);
                setShowConfirmation(true);
            }}>{list.archived? "UnArchive" : "Archive"} List</button>
            <button className="deleteButton" onClick={() => {setAction('delete'); setShowConfirmation(true)}}>Delete List</button>
        </div>}
    </div>)
}