import React, { useState, useEffect, useReducer } from 'react';
import formReducer from '../reducers/formReducer';
import ResultsCard from '../ResultsCard/ResultsCard';

const searchFormState = {
    searchQuery: '',
    sortQuery: '',
    filterQuery: '',
};

const SearchPage = () => {
    const [formState, dispatch] = useReducer(formReducer, searchFormState);
    const { searchQuery, sortQuery, filterQuery } = formState;
    const [searchResults, setSearchResults] = useState(null);
    const [submitBtnState, setSubmitBtnState] = useState(false);

    useEffect(() => {
        console.log(formState);
        console.log(`https://api.github.com/search/repositories?${searchQuery + filterQuery + sortQuery}`);
    });

    const buildQuery = (e, type) => {
        let finishedPayload = null;
        switch (type) {
            case 'SEARCH':
                finishedPayload = `q=${e.target.value}`;
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
        await setSubmitBtnState(true);
        try {
            const getApi = await fetch(`https://api.github.com/search/repositories?${searchQuery + filterQuery + sortQuery}`);
            if (!getApi.ok) throw new Error('Github Request failed');
            const apiResponse = await getApi.json();
            setSearchResults(apiResponse);
        } catch (err) {
            console.log(err);
        }
        await setSubmitBtnState(false);
    };

    const payload = searchResults && searchResults.items.map((e) => {
        const {
            name,
            stargazers_count,
            language,
            description,
            id,
            watchers_count,
            forks_count,
            html_url,
        } = e;
        return (
            <div key={id}>
                <ResultsCard
                    name={name}
                    description={description}
                    stargazers_count={stargazers_count}
                    language={language}
                    watchers_count={watchers_count}
                    forks_count={forks_count}
                    html_url={html_url}
                />
            </div>
        );
    });

    return (
        <>
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
                        required
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
                                <option value="">All Languages</option>
                                <option value="JavaScript">Javascript</option>
                                <option value="Java">Java</option>
                                <option value="C%2B%2B">C++</option>
                                <option value="Python">Python</option>
                                <option value="C%23">C#</option>
                                <option value="Assembly">Assembly</option>
                                <option value="C">C</option>
                                <option value="HTML">HTML</option>
                                <option value="Typescript">Typescript</option>
                                <option value="Hack">Hack</option>
                            </select>
                        </>
                    )}
                    <button type="submit" className="btn btn-primary" disabled={submitBtnState}>Search</button>
                </form>
            </section>
            <section>
                {payload}
            </section>
        </>
    );
};

export default SearchPage;
