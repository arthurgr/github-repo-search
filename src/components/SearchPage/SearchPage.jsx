import React from 'react';
import PropTypes from 'prop-types';

const SearchPage = ({
    buildQuery, searchSubmitHandler, formState, submitBtnState, payload,
}) => (
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

SearchPage.propTypes = {
    buildQuery: PropTypes.func.isRequired,
    searchSubmitHandler: PropTypes.func.isRequired,
    formState: PropTypes.objectOf(PropTypes.any).isRequired,
    submitBtnState: PropTypes.func.isRequired,
    payload: PropTypes.func,
};

SearchPage.defaultProps = {
    payload: null,
};

export default SearchPage;
