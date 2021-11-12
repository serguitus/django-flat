import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const PRequestDetail = (props) => {

    const [pullRequest, setPullRequest] = useState('');
    let params = useParams();

    useEffect(() => {
        fetch(`/pullrequests/${params.id}`).then(res =>res.json()).then(data => {
          setPullRequest(data.pullRequest);
        });
      }, [])

    return (
        <div className="mt-2 ml-2">
          <h2>Title: {pullRequest.title}</h2>
          <h3>Description: {pullRequest.description}</h3>
          <h4>Author: {pullRequest.author}</h4>
          <h4>Status: {pullRequest.status}</h4>
          <button onClick={MergePullRequest}> Merge</button>
          <Link to='/pr'>Back to List</Link>
        </div>
        )
}

const MergePullRequest = pr => {
    // repeat merge action here
}

export default PRequestDetail;