import React from 'react';

const Header = ({ information }) => {
    // let userInformationDiv = null;
    // if (information.loggedIn) {
    //     userInformationDiv =
    //         <div>
    //             <span>{information.name} ({information.netID})</span>
    //             <button>Log Out</button>
    //         </div>;
    // }
    // else {
    //     userInformationDiv =
    //         <div>
    //             <button>Log In</button>
    //         </div>;
    // }

    return (
        <header>
            <h1>Web Registration System</h1>
            {/*<span>Semester: {information.semesterName}</span>*/}
            {/*{userInformationDiv}*/}
        </header>
    )
};

export default Header;