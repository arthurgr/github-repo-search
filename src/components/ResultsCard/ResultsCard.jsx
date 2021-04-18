import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '../Icons/Icon';

const ResultsCard = ({ result }) => {
    const clickHandler = () => {
        localStorage.clear();
        localStorage.setItem('result', JSON.stringify(result));
    };

    return (
        <div className="card text-dark bg-light mb-4">
            <h4 className="card-header">{result.name}</h4>
            <div className="card-body">
                <p><b>{result.description}</b></p>
                <p>
                    <Icon icon="STAR" fill="#ebc911" />
                    {`Number of Stars: ${result.stargazers_count} `}
                </p>
                <p>
                    <Icon icon="LANGUAGE" fill="#0055b0" />
                    {`Language: ${result.language} `}
                </p>
                <Link to="/repository-details" onClick={clickHandler} className="btn btn-secondary btn-sm">Show Details</Link>
            </div>
        </div>
    );
};

ResultsCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    stargazers_count: PropTypes.number,
    language: PropTypes.string,
    watchers_count: PropTypes.number,
    forks_count: PropTypes.number,
    html_url: PropTypes.string,
};

ResultsCard.defaultProps = {
    id: null,
    name: '',
    description: '',
    stargazers_count: null,
    language: '',
    watchers_count: null,
    forks_count: null,
    html_url: null,
};

export default ResultsCard;
