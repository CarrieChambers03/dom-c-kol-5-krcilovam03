import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';

import { SettingsContext } from '../helpers/settingsContext.js';
import { languages } from '../helpers/languages.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import './menu.css';

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

    return(<div className={`menu${dark ? ' dark' : ''}`}>
        <h1><span className='simplyText'>Simply</span><span className='shoppingText'>Shopping</span></h1>
        <h3>{languages[settings.lang].manageLists}</h3>
        <div className='menuContent'>
            <div className='userSelect'>
                {languages[settings.lang].userSelect}
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
            </div>
            <div className='darkModeSwitching'>
                <FontAwesomeIcon className='icon sun' icon={faSun} />
                <Switch 
                    checked={dark}
                    onChange={() => onDarkModeChange(!dark)}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor='#5f5ffa'
                    onHandleColor='#5050fa'
                 />
                <FontAwesomeIcon className='icon moon' icon={faMoon} />
            </div>
            <div className='langSelect'>
                {languages[settings.lang].languageSelect}
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
            </div>
        </div>

        <label className='continueButton'><Link to={'/home'}>{languages[settings.lang].continueToApp}</Link></label>
    </div>)
}