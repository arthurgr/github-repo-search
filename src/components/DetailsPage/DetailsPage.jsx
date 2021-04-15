import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icons/Icon';

const DetailsPage = () => {
    const retrievedObject = JSON.parse(localStorage.getItem('repoDetails'));
    console.log('retrievedObject: ', retrievedObject);
    const {
        name, description, stargazers_count, language, watchers_count, forks_count, html_url,
    } = retrievedObject;

    return (
        <>
            <h1 className="fs-5">Repository Details</h1>
            <div className="card text-dark bg-light mt-4">
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
                    <p>
                        <Icon icon="LANGUAGE" fill="#0055b0" />
                        {`Watchers: ${watchers_count} `}
                    </p>
                    <p>
                        <Icon icon="LANGUAGE" fill="#0055b0" />
                        {`Forks: ${forks_count} `}
                    </p>
                    <p>
                        <Icon icon="LANGUAGE" fill="#0055b0" />
                        {`URL: ${html_url} `}
                    </p>
                    <Link to="/" className="btn btn-secondary btn-sm">Back</Link>
                </div>
            </div>
        </>
    );
};

export default DetailsPage;
