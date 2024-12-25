import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SettingsContext } from '../helpers/settingsContext.js';

export default function Menu ({users, onUserIdChange}) {
    const settings = useContext(SettingsContext);
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(settings.userId);

    useEffect(() => {
        setUserList(users);
        setSelectedUser(settings.userId);
    }, [users, settings.userId]);

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
        <Link to={'/home'}>Continue into the App</Link>
    </div>)
}