import React, { useState, useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchPage from './SearchPage/SearchPage';
import DetailsPage from './DetailsPage/DetailsPage';
import ResultsCard from './ResultsCard/ResultsCard';
import formReducer from './reducers/formReducer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const searchFormState = {
    searchQuery: '',
    sortQuery: '',
    filterQuery: '',
};

const App = () => {
    const [formState, dispatch] = useReducer(formReducer, searchFormState);
    const [searchResults, setSearchResults] = useState(null);
    const [submitBtnState, setSubmitBtnState] = useState(false);

    const buildQuery = (e, type) => {
        let finishedPayload = null;
        switch (type) {
            case 'SEARCH':
                finishedPayload = e.target.value;
                break;
            case 'FILTER':
                finishedPayload = `+language:"${e.target.value}"`;
                break;
            case 'SORT':
                finishedPayload = `&sort=${e.target.value}`;
                break;
            default:
                break;
        }
        return finishedPayload ? dispatch({
            type: 'HANDLE INPUT',
            field: e.target.name,
            payload: finishedPayload,
        }) : formState;
    };

    const searchSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setSubmitBtnState(true);
            const getApi = await fetch(`https://api.github.com/search/repositories?q=${formState.searchQuery}${formState.filterQuery}${formState.sortQuery}`);
            if (!getApi.ok) throw new Error('Github Request failed');
            const apiResponse = await getApi.json();
            setSearchResults(apiResponse);
            await setSubmitBtnState(false);
        } catch (err) {
            console.log(err);
            setSubmitBtnState(false);
        }
    };

    const payload = searchResults && searchResults.items.map((result) => (
        <div key={result.id}>
            <ResultsCard result={result} />
        </div>
    ));

    return (
        <Router>
            <div className="container mt-4">
                <Route path="/" exact>
                    <SearchPage
                        buildQuery={buildQuery}
                        searchSubmitHandler={searchSubmitHandler}
                        formState={formState}
                        submitBtnState={submitBtnState}
                        payload={payload}
                    />
                </Route>
                <Route path="/repository-details/:details">
                    <DetailsPage />
                </Route>
            </div>
        </Router>
    );
};

export default App;
