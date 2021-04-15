import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SearchPage from './SearchPage/SearchPage';
import DetailsPage from './DetailsPage/DetailsPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const App = () => (
    <Router>
        <div className="container mt-4">
            <Route path="/" exact component={SearchPage} />
            <Route path="/repository-details" component={DetailsPage} />
        </div>
    </Router>
);

export default App;
