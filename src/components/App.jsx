import React, { useEffect, useState } from 'react';
import Icon from './Icons/Icon';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const App = () => {
    const [searchParams, setSearchParams] = useState(null);
    const [sortParams, setSortParams] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        console.log(sortParams);
    }, [sortParams]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const getApi = await fetch(`https://api.github.com/search/repositories?q=${searchParams.replace(' ', '+')}&per_page=100&sort=${sortParams}`);
            if (!getApi.ok) throw new Error('Github Request failed');
            const apiResponse = await getApi.json();
            setSearchResults(apiResponse);
        } catch (err) {
            console.log(err);
        }
    };

    const payload = searchResults ? searchResults.items.map((e) => {
        const {
            name, stargazers_count, language, description,
        } = e;
        return (
            <div className="card text-dark bg-light mb-4">
                <h4 className="card-header">{name}</h4>
                <div className="card-body">
                    <p><b>{description}</b></p>
                    <p>
                        <Icon icon="STAR" fill="#ebc911" />
                        {`Number of Stars: ${stargazers_count} `}
                    </p>
                    <p>
                        <Icon icon="LANGUAGE" fill="#0055b0" />
                        {`Language: ${language} `}
                    </p>
                    <a href="/" className="btn btn-primary btn-sm">Show Details</a>
                </div>
            </div>
        );
    }) : null;

    return (
        <div className="container mt-4">
            <h1 className="fs-5">Github Repository Search</h1>
            <section>
                <form onSubmit={submitHandler} className="mb-4">
                    <label htmlFor="github-search" className="col-form-label-sm">Search Github Repositories</label>
                    <input
                        type="text"
                        id="github-search"
                        className="form-control mb-3 col-12 col-lg-5"
                        onChange={(e) => setSearchParams(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                    {
                        payload && (
                            <>
                                <hr className="mt-4" />
                                <label htmlFor="github-search" className="col-form-label-sm">Sort Results By</label>
                                <select
                                    className="form-control mb-4 col-12 col-md-4"
                                    id="sort-by"
                                    onChange={(e) => setSortParams(e.target.value)}
                                >
                                    <option value="best_match">Best Match</option>
                                    <option value="stars">Most Stars</option>
                                </select>
                            </>
                        )
                    }
                </form>
            </section>
            <section>
                {payload}
            </section>
        </div>
    );
};

export default App;
