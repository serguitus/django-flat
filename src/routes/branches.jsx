import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const BranchList = () => {

    const [branches, setBranches] = useState([]);

    useEffect(() => {
        fetch("/branches").then(res =>res.json()).then(data => {
          setBranches(data.branches);
        });
      })

    return (
        <div className="mt-2">
        {/* Display the branch name if branch is not None */}
        {branches && branches.map(branch =>{
          console.log(branch);
            return (
              <div key={branch}>
                <Link to={`/heads/${branch}`}><h2 className="text-primary"> { branch} </h2></Link>
              </div>
            )
          })
        }
        <Outlet />
        </div>
        )
}

export default BranchList;
