//src/components/dashboard/AdminDashboard/AdminDashboard.tsx
import React, { useState } from "react";
import { AssessmentMarks, AttendanceMarks, LinkedinMarks, ProjectReviewMarks, ProjectSubmissionMarks, Results } from "./index";

type TabKeys = "attendanceTab" | "projectReviewTab" | "assessmentTab" | "projectSubmissionTab" | "linkedinTab" | "resultsTab";

const AdminDashboard: React.FC = () => {
  // State to keep track of the currently active tab
  const [activeTab, setActiveTab] = useState<TabKeys>("attendanceTab");

  // Define the content for each tab
  const tabContent: Record<TabKeys, JSX.Element> = {
    attendanceTab: <AttendanceMarks />,
    projectReviewTab: <ProjectReviewMarks />,
    assessmentTab: <AssessmentMarks />,
    projectSubmissionTab: <ProjectSubmissionMarks />,
    linkedinTab: <LinkedinMarks />,
    resultsTab: <Results />,
  };

  // Define the tabs for rendering buttons with explicit types
  const tabs: { id: TabKeys; label: string }[] = [
    { id: "attendanceTab", label: "Attendance Tab" },
    { id: "projectReviewTab", label: "Project Review Tab" },
    { id: "assessmentTab", label: "Assessment Tab" },
    { id: "projectSubmissionTab", label: "Project Submission Tab" },
    { id: "linkedinTab", label: "LinkedIn Tab" },
    { id: "resultsTab", label: "Results Tab" },
  ];

  return (
    <div>
      {/* Main heading for the Admin Dashboard */}
      <h1>Admin Dashboard</h1>

      {/* Overview section providing a brief description of the dashboard */}
      <section>
        <h2>Overview</h2>
        <p>
          Welcome to the Admin Dashboard! Here you can manage users, view
          reports, and adjust settings.
        </p>
      </section>

      {/* Buttons for each tab */}
      <div className="flex gap-4 m-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`p-2 rounded ${activeTab === tab.id ? 'bg-purple-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conditionally render the content of the currently active tab */}
      <div>{tabContent[activeTab]}</div>
    </div>
  );
};

export default AdminDashboard;
