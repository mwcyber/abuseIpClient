import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes
} from "react-router-dom";

import Home from './home';

const Webpages = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default Webpages;