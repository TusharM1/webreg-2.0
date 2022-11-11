import React from 'react';
import Button from 'react-bootstrap/Button';


const Home = () => {
    return (
        <span>Home2
            <Button onClick={() => console.log("test")}>Search Class</Button>
        </span>
    );
};

export default Home;