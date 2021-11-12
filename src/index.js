import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BranchList from './routes/branches';
import BranchDetail from './routes/branchDetail';
import CommitDetail from './routes/commitDetail';
import PrList from './routes/prequests';
import PrForm from './routes/prequestForm';
import PRequestDetail from './routes/prequestDetail';
// import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/heads" element={<BranchList />} >
        <Route path=":branch" element={<BranchDetail />} />
      </Route>
      <Route path="/commits/:commit" element={<CommitDetail />} />
      <Route path="/pr/add" element={<PrForm />} />
      <Route path="/pr/:id" element={<PRequestDetail />} />
      <Route path="/pr" element={<PrList />} />
      <Route path="*" element={<App />}
    />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
