import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faBars, faClipboardList } from "@fortawesome/free-solid-svg-icons";

import { SettingsContext } from "../../helpers/settingsContext"
import "./header.css";

export default function Header({ users, isMobile, onChangePage, archive }){
    const { userId } = useContext(SettingsContext);
    const [userName, setUserName] = useState("");
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const user = users.find(user => user.id === userId);
        setUserName(user.name);
    }, [userId, users])

    return(<div className="header">
        {showMenu && <div>
            <div className="backdrop" onClick={() => setShowMenu(false)}></div>
            <div className="menu">
                <span>Your id is "{userId}"</span>
                <Link to={'/'}>Back to App Settings</Link>
            </div>
        </div>}

        <h2 className="welcomeMessage">{`Welcome ${userName.split(' ')[0]}`}</h2>
        <div className="icons">
            <label onClick={() => onChangePage()}>
                {archive ? <FontAwesomeIcon icon={faClipboardList} /> : <FontAwesomeIcon icon={faBoxArchive} />}
                {!isMobile && <span>{archive ? "ActiveLists" : "Archive"}</span>}
            </label>
            <label onClick={() => setShowMenu(true)}>
                <FontAwesomeIcon icon={faBars} />
                {!isMobile && <span>Menu</span>}
            </label>
        </div>
    </div>)
}