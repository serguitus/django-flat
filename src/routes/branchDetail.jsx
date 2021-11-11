import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const BranchDetail = (props) => {

    const [commits, setCommits] = useState('');
    let params = useParams();

    useEffect(() => {
        fetch(`/commits/${params.branch}`).then(res =>res.json()).then(data => {
          setCommits(data.commits);
        });
      })

    return (
        <div className="mt-2">
          <h2>Branch: {params.branch}</h2>
        {/* Display the branch name if branch is not None */}
        <h3>Commits:</h3>
        {commits && commits.map(commit =>{
            return (
            <div key= {commit.timestamp}>
                <h2 className="text-primary"> { commit.message} </h2>
                <div>by {commit.author} on {commit.date}</div>
                <hr/>
            </div>
            )

            })}
        </div>
        )
}

export default BranchDetail;