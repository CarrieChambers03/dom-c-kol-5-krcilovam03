import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faBars, faClipboardList } from "@fortawesome/free-solid-svg-icons";

import { SettingsContext } from "../../helpers/settingsContext"
import { languages } from "../../helpers/languages";
import "./header.css";

export default function Header({ users, isMobile, onChangePage, archive }){
    const { userId, lang } = useContext(SettingsContext);
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
                <span>{languages[lang].yourId} "{userId}"</span>
                <Link to={'/'}>{languages[lang].backToSettings}</Link>
            </div>
        </div>}

        <h2 className="welcomeMessage">{`${languages[lang].welcome} ${userName.split(' ')[0]}`}</h2>
        <div className="icons">
            <label onClick={() => onChangePage()}>
                {archive ? <FontAwesomeIcon icon={faClipboardList} /> : <FontAwesomeIcon icon={faBoxArchive} />}
                {!isMobile && <span>{archive ? languages[lang].activeListsButton : languages[lang].archiveButton}</span>}
            </label>
            <label onClick={() => setShowMenu(true)}>
                <FontAwesomeIcon icon={faBars} />
                {!isMobile && <span>{languages[lang].menu}</span>}
            </label>
        </div>
    </div>)
}