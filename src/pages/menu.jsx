import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';

import { SettingsContext } from '../helpers/settingsContext.js';
import { languages } from '../helpers/languages.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Menu ({users, onUserIdChange, onDarkModeChange, onLangChange}) {
    const settings = useContext(SettingsContext);
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(settings.userId);
    const [dark, setDark] = useState(settings.darkMode);
    const [selectedLang, setSelectedLang] = useState(settings.lang);

    useEffect(() => {
        setUserList(users);
        setSelectedUser(settings.userId);
        setDark(settings.darkMode);
        setSelectedLang(settings.lang);
    }, [users, settings.userId, settings.darkMode, settings.lang]);

    return(<div>
        <label>
            Select User:
            <select 
                value={selectedUser}
                onChange={(e) => {
                    const userId = e.target.value;
                    setSelectedUser(userId);
                    onUserIdChange(userId);
                }}
            >
                {userList.map(user => {return <option key={user.id} value={user.id}>{user.id}</option>})}
            </select>
        </label>
        <label>
            <FontAwesomeIcon icon={faSun} />
            <Switch checked={dark} onChange={() => onDarkModeChange(!dark)} />
            <FontAwesomeIcon icon={faMoon} />
        </label>
        <label>
            Select language:
            <select
                value={selectedLang}
                onChange={(e) => {
                    const lang = e.target.value;
                    setSelectedLang(lang);
                    onLangChange(lang);
                }}
            >
                {Object.keys(languages).map(language => {return <option key={language} value={language}>{language}</option>})}
            </select>
        </label>

        <Link to={'/home'}>Continue into the App</Link>
    </div>)
}