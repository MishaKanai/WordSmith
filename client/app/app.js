import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory} from 'react-router'
import {resetDatabase} from './server';
import routes from './routes';
import ErrorBanner from './components/errorbanner';


if (document.getElementById('app') !== null) {
    ReactDOM.render((
            <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    ),document.getElementById('app'));
}


/*
class ResetDatabase extends React.Component {
    render() {
        return (
                <button className="btn btn-default" type="button" onClick={() => {
                    resetDatabase((msg) => console.log(msg));
                    window.alert("Database reset! Refreshing the page now...");
                    document.location.reload(false);
                }}>Reset Mock DB</button>
        );
    }
}

ReactDOM.render(
        <ResetDatabase />,
    document.getElementById('db-reset')
); */
