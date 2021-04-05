import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);

if (process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}
