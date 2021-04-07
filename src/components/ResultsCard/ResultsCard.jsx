import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icons/Icon';

const ResultsCard = ({
    id, name, description, stargazers_count, language,
}) => (
    <div className="card text-dark bg-light mb-4" key={id}>
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
            <a href="/" className="btn btn-secondary btn-sm">Show Details</a>
        </div>
    </div>
);

ResultsCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    stargazers_count: PropTypes.number,
    language: PropTypes.string,
};

ResultsCard.defaultProps = {
    id: null,
    name: '',
    description: '',
    stargazers_count: null,
    language: '',
};

export default ResultsCard;
