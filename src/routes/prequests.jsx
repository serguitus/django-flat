import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrList = () => {

    const [pullRequests, setPullRequests] = useState([]);

    useEffect(() => {
        fetch("/pullrequests").then(res =>res.json()).then(data => {
          setPullRequests(data.prs);
        });
      }, [])

    return (
        <div className="mt-2">
        {/* Display the branch name if branch is not None */}
        <h2>Pull Requests:</h2>
        {pullRequests && pullRequests.map(pr =>{
            return (
              <div key={pr.title}>
                <Link to={`/pr/${pr.id}`}><h3 className="text-primary"> {pr.title} </h3></Link>
                <h5 className="text-primary"> {pr.description} </h5>
                <h5 className="text-primary"> {pr.author} </h5>
                <h5 className="text-primary"> {pr.status} </h5>
                <h5 className="text-primary"> {`${pr.baseBranch} >>> ${pr.compareBranch}`}</h5>
              </div>
            )
          })
        }
        <Link to='/'>Back to Home</Link>
        </div>
        )
}

export default PrList;
