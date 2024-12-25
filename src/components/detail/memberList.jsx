import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";

import { SettingsContext } from "../../helpers/settingsContext";
import { ListContext } from "../../helpers/listContext";
import { languages } from "../../helpers/languages";

import "./memberList.css";

export default function MemberList({ users, onMemberChange }){
    const { userId, lang } = useContext(SettingsContext);
    const { list } = useContext(ListContext);
    const navigate = useNavigate();

    const [ members, setMembers ] = useState(null);
    const [ owner, setOwner ] = useState(null);
    const [ memberId, setMemberId] = useState(null);
    const [ warning, setWarning ] = useState(null);
    const [ showInviteWindow, setShowInviteWindow ] = useState(false);
    const [ showConfirmation, setShowConfirmation ] = useState(null);

    useEffect(() => {
        setOwner(users.find(u => u.id === list.owner));
        setMembers(users.filter(u => list.members.includes(u.id)));
    }, [list, users]);

    return(<div className="memberList">
        {showConfirmation && <div>
            {showConfirmation === "leave" ? (
                <div>
                    <div className="memberWindowBackdrop"></div>
                    <div className="confirmationWindow">
                        <h2>{languages[lang].confirmLeave}</h2>
                        <div className="buttons">
                            <button onClick={() => setShowConfirmation(null)}>{languages[lang].cancel}</button>
                            <button className="confirm" onClick={() => {onMemberChange('delete', userId); setShowConfirmation(null); navigate('/home')}}>{languages[lang].leave}</button>
                        </div>
                    </div>
                </div>
            ) : (<div>
                <div className="memberWindowBackdrop"></div>
                <div className="confirmationWindow">
                    <h2>{languages[lang].confirmKick}</h2>
                    <div className="buttons">
                        <button onClick={() => setShowConfirmation(null)}>{languages[lang].cancel}</button>
                        <button className="confirm" onClick={() => {onMemberChange('delete', showConfirmation); setShowConfirmation(null);}}>{languages[lang].kick}</button>
                    </div>
                </div>
            </div>)}
        </div>}

        {showInviteWindow && <div>
            <div className="memberWindowBackdrop"></div>
            <div className="inviteWindow">
                <h2>{languages[lang].inviteText}</h2>
                <input 
                    type="text"
                    value={memberId || ''}
                    onChange={e => setMemberId(e.target.value)}
                />
                {warning && (
                    <div className="warning">
                        {warning}
                    </div>
                )}
                <div className="buttons">
                    <button onClick={() => {setShowInviteWindow(false); setMemberId(null); setWarning(null)}}>{languages[lang].cancel}</button>
                    <button className='confirm' onClick={() => {
                        if(members.some(m => m.id === memberId)){
                            setWarning(languages[lang]['isMember']);
                        } else if (!users.some(u => u.id === memberId)){
                            setWarning(languages[lang]['userNotExist']);
                        } else if (memberId === list.owner){
                            setWarning(languages[lang]['yourself']);
                        } else {
                            setShowInviteWindow(false);
                            setMemberId(null);
                            setWarning(null);
                            onMemberChange('invite', memberId);
                        }
                    }}>{languages[lang].invite}</button>
                </div>
            </div>
        </div>}

        <h3>{languages[lang]['members']}</h3>
        <div className="ownerMembers">
            {owner && <div className="owner" key={owner.id}>{owner.name}</div>}
            <div className="members">
                {Array.isArray(members) && members.map(m => {
                    return(<div key={m.id} className="member">
                        {m.name}
                        {userId === list.owner && (
                            <FontAwesomeIcon icon={faUserSlash} onClick={() => setShowConfirmation(m.id)} />
                        )}
                    </div>)
                })}
            </div>
        </div>

        {owner && userId === owner.id ? (
            <button className="inviteButton" onClick={() => setShowInviteWindow(true)}>{languages[lang]["invite"]}</button>
        ): (
            <button className="leaveButton" onClick={() => setShowConfirmation("leave")}>{languages[lang].leave}</button>
        )}
    </div>)
}