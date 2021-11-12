import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const CommitDetail = (props) => {

    const [commit, setCommit] = useState({});
    let params = useParams();

    useEffect(() => {
        fetch(`/commit/${params.commit}`).then(res =>res.json()).then(data => {
          setCommit(data.commit);
        });
        //console.log(commit);
      }, [])

    return (
        <div className="mt-2 ml-2">
          <h2>Commit: {commit.id}</h2>
          <h3>Message: {commit.message}</h3>
          <h4>Date: {commit.date}</h4>
          <h4>Changed files: {commit.files}</h4>
          <h4>author: {commit.author} ({commit.author_email})</h4>
        </div>
        )
}

export default CommitDetail;