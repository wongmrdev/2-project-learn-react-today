import React from 'react'
import { Link } from 'react-router-dom';

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logout() {
        const handleClick = () => {
        localStorage.removeItem("isLoggedIn")
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        }

        return (
                 <Link  to="/login">
                        <div onClick={handleClick} className="btn--header header__login-logout-icon" >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                        </div>
                </Link>
        )
}

     