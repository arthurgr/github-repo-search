import React, { useState, useEffect, useReducer } from 'react';
import formReducer from './reducers/formReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ResultsCard from './ResultsCard/ResultsCard';

const initialFormState = {
    searchQuery: '',
    sortQuery: '',
    filterQuery: '',
};

const App = () => {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);
    const { searchQuery, sortQuery, filterQuery } = formState;
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        console.log(formState);
        console.log(`https://api.github.com/search/repositories?${searchQuery + sortQuery + filterQuery}`);
    }, [formState]);

    const buildQuery = (e, type) => {
        let finishedPayload = null;
        switch (type) {
            case 'SEARCH':
                finishedPayload = `q=${e.target.value}`;
                break;
            case 'SORT':
                finishedPayload = `&sort=${e.target.value}`;
                break;
            case 'FILTER':
                finishedPayload = `&language:${e.target.value}`;
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
            const getApi = await fetch(`https://api.github.com/search/repositories?${searchQuery + sortQuery + filterQuery}`);
            if (!getApi.ok) throw new Error('Github Request failed');
            const apiResponse = await getApi.json();
            setSearchResults(apiResponse);
        } catch (err) {
            console.log(err);
        }
    };

    const payload = searchResults && searchResults.items.map((e) => {
        const {
            name, stargazers_count, language, description, node_id,
        } = e;
        return (
            <ResultsCard
                node_id={node_id}
                name={name}
                description={description}
                stargazers_count={stargazers_count}
                language={language}
            />
        );
    });

    return (
        <div className="container mt-4">
            <h1 className="fs-5">Github Repository Search</h1>
            <section>
                <form onSubmit={searchSubmitHandler} className="mb-4">
                    <label htmlFor="github-search" className="col-form-label-sm">Search Github Repositories</label>
                    <input
                        id="github-search"
                        className="form-control mb-3 col-12 col-lg-5"
                        type="text"
                        name="searchQuery"
                        value={formState.search}
                        onChange={(e) => buildQuery(e, 'SEARCH')}
                    />
                    {payload && (
                        <>
                            <label htmlFor="sort-by" className="col-form-label-sm">Sort Results By</label>
                            <select
                                className="form-control mb-4 col-12 col-md-4"
                                name="sortQuery"
                                value={formState.sort}
                                onChange={(e) => buildQuery(e, 'SORT')}
                            >
                                <option defaultValue value="">Best Match (Default)</option>
                                <option value="stars">Most Stars</option>
                                <option value="stars&order=asc">Fewest Stars</option>
                            </select>
                            <label htmlFor="sort-by" className="col-form-label-sm">Filter Results By Language</label>
                            <select
                                className="form-control mb-4 col-12 col-md-4"
                                name="filterQuery"
                                value={formState.filter}
                                onChange={(e) => buildQuery(e, 'FILTER')}
                            >
                                <option value="">Sort By</option>
                                <option value="JavaScript">Javascript</option>
                            </select>
                        </>
                    )}
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </section>
            <section>
                {payload}
            </section>
        </div>
    );
};

export default App;
