import { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  ThumbsUp,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import RightArrow from "../assets/icons/rightArrow.svg";
import { getMyIssues } from "../http";

export default function Reports({ sidebarActive }) {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    getMyIssues()
      .then((data) => {
        console.log("Fetched Issues:", data);
        setIssues(data?.data || []); // ✅ Avoid errors if data is undefined
      })
      .catch((error) => console.error("Failed to fetch issues:", error));
  }, []); // ✅ Runs only once when component mounts

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "In Progress":
        return "status-in-progress";
      case "Resolved":
        return "status-resolved";
      default:
        return "status-default";
    }
  };
  return (
    <main className={`myReports ${!sidebarActive ? "active" : ""}`}>
      <h1>My Reports</h1>
      <div className="container">
        <div className="issues-grid">
          {issues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <div>
                  <h3>{issue.title}</h3>
                  <div className="issue-details">
                    <span>
                      <MapPin size={16} /> {issue.location}
                    </span>
                    <span>
                      <Clock size={16} /> {issue.date}
                    </span>
                  </div>
                </div>
                <span className={`status ${getStatusColor(issue.z)}`}>
                  {issue.status}
                </span>
              </div>

              <div className="issue-footer">
                <div className="actions">
                  <button>
                    <ThumbsUp size={22} /> <span>{issue.votes}</span>
                  </button>
                  <button>
                    <MessageCircle size={22} /> <span>{issue.comments}</span>
                  </button>
                </div>
                <div className="urgency">
                  <span
                    className={
                      issue.urgency === "High"
                        ? "high-urgency"
                        : issue.urgency === "Medium"
                        ? "medium-urgency"
                        : "low-urgency"
                    }
                  >
                    {issue.urgency}
                  </span>
                  <button>
                    <img src={RightArrow} alt="." />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
