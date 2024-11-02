//src/components/dashboard/AdminDashBoard/AdminDashboard.tsx
import React, { useState } from 'react';

const AdminDashboard: React.FC = () => {
  const[activeTab, setActiveTab] = useState('attendanceTab')
  const tabContent = {
    attendanceTab: <p>Attendance Marks Tab</p>,
    projectReviewTab:<p>Project Review Marks Tab</p>,
    assessmentTab:<p>Assessment Marks Tab</p>,
    projectSubmission:<p>Project Submission Marks  Tab</p>,
    linkedinTab:<p>Linkedin Marks Tab</p>,
    resultsTab:<p>Results Tab</p>
  }

  return(
    <div>
      <div>
        <button onClick ={()=>setActiveTab('attendanceTab')}>
          Attendance Marks Tab
        </button>
        <button onClick={()=>setActiveTab('projectReviewTab')}>
          Project Review Marks Tab
        </button>
        <button onClick={()=>setActiveTab('assessmentTab')}>
          Assessment Tab
        </button>
        <button onClick ={()=>setActiveTab('projectSubmissionTab')}>
          Project Submission Marks Tab
        </button>
        <button onClick={()=>setActiveTab('linkedinTab')}>
          Linkedin Marks Tab
        </button>
        <button onClick={()=>setActiveTab('resultsTab')}>
          Results Tab
        </button>
      </div>
      <h1>Admin Dashboard</h1>
      
      
      <section>
        <h2>Overview</h2>
        <p>Welcome to the Admin Dashboard! Here you can manage users, view reports, and adjust settings.</p>
      </section>
    </div>
  );
};

export default AdminDashboard;
