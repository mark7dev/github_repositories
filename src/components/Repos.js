import React from 'react';

const Repos = ({repositories}) => {
    return ( 
        <div>
            {repositories.map(repo => (
                <div key={repo.id}>
                    <p>{repo.name}</p>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">view repository</a>
                </div>
            ))}
        </div>
    );
}
 
export default Repos;