import React, { useState, useEffect } from 'react';

  function PrForm(props) {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [baseBranch, setBaseBranch] = useState();
    const [compareBranch, setCompareBranch] = useState();
    const [message, setMessage] = useState();
    const [error, setError] = useState(false);
    const [status, setStatus] = useState('OPEN');

    const [branches, setBranches] = useState();

    const statusOptions = [
      {key:'OPEN', value: 'Open'},
      {key:'CLOSED', value: 'Closed'},
      {key:'MERGED', value: 'Merged'}];

    useEffect(() => {
      fetch("/branches").then(res =>res.json()).then(data => {
        setBranches(data.branches);
        setBaseBranch(data.branches[0]);
        setCompareBranch(data.branches[0]);
        setStatus(1);
      });
    }, [])

    const handleSubmit = (e) => {
      e.preventDefault();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          description: description,
          base_branch: baseBranch,
          compare_branch: compareBranch,
          status: status,
        })
      };
      fetch("/pullrequests", requestOptions).then(res =>res.json()).then(data => {
        if (data){
          setMessage("PR created!");
        } else {
          setError(true);
          setMessage("something went wrong");
        }
      });
    }

    const MergePullRequest = (e) => {
      // first create an open PR
      handleSubmit(e);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {}
      };
      fetch(`/merge/${baseBranch}/${compareBranch}`, requestOptions).then(res => res.json()).then(data => {
      })
    }

    return (
      <form onSubmit={e => {handleSubmit(e)}}>
        <label>Title</label>
        <br />
        <input
          name='title'
          type='text'
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <br/>
        <label>Description</label>
        <br />
        <input
          name='description'
          type='text'
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        <br />
        <label>Base Branch</label>
        <br />
        <select
          name='baseBranch'
          onChange={e => setBaseBranch(e.target.value)}
          value={baseBranch}>
            { branches && branches.map(branch =>{
              return (<option value={branch}>{branch}</option>)
            })
            }
          </select>
        <br/>
        <label>Compare Branch</label>
        <br />
        <select
          name='compareBranch'
          onChange={e => setCompareBranch(e.target.value)}
          value={compareBranch}>
            { branches && branches.map(branch =>{
              return (<option value={branch}>{branch}</option>)
            })
            }
          </select>
          <br/>
        <label>Status</label>
        <br />
        <select
          name='status'
          disabled={true}
          value={status}>
            { statusOptions && statusOptions.map(option =>{
              return (<option value={option.key}>{option.value}</option>)
            })
            }
          </select>
        <br/>
        <input
          className='submitButton'
          type='submit'
          value='Create Pull Request'
        />
        <button onClick={MergePullRequest}> Merge </button>
        <p style={{color: error?'#ff0000':'#00ff00'}}>{message}</p>
      </form>
    )
  }

  export default PrForm;