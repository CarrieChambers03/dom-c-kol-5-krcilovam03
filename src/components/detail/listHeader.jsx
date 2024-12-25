import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faGear, faCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { ListContext } from '../../helpers/listContext.js';

export default function ListHeader({ onIconClick }){
    const { list, isMobile } = useContext(ListContext);

    return(
        <div className='listHeader'>
            <h2>{list.name}</h2>
            <div className='icons'>
                <Link to={'/home'}><FontAwesomeIcon icon={faCircleLeft} /></Link>
                <FontAwesomeIcon icon={faGear} onClick={() => onIconClick('settings')} />
                {isMobile && <FontAwesomeIcon icon={faUserGroup} onClick={() => onIconClick('members')} />}
            </div>
        </div>
    );
}