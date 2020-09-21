import React from 'react';
import './styles/Repos.css'

const Repos = ({repositories}) => {
    return ( 
        <div className="repos__container">
            {repositories.map(repo => (
                <div key={repo.id} className="repo__card">
                    <p>{repo.name}</p>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <i class="fa fa-github" aria-hidden="true"></i>
                    </a>
                </div>
            ))}
        </div>
    );
}
 
export default Repos;