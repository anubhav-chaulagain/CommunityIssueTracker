import Navbar from "../Components/NavBar";
import StatCard from "../Components/StatCard";
import StatusBadge from "../Components/StatusBadge";
import { useState, useEffect } from "react";
import { getAllIssues, updateIssues } from "../http";

import {
  Bug,
  Users,
  GitPullRequest,
  Sparkles,
  ArrowRight,
  LogIn,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  BarChart3,
  MapPin,
  MessageSquare,
  Search,
  ChevronDown,
} from "lucide-react";

export default function AuthorityDashboard({ sidebarActive }) {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    getAllIssues()
      .then((data) => {
        console.log("Fetched Issues:", data);
        const issuesList = data?.data || []; // ✅ Avoid errors if data is undefined

        // Filter issues that are not resolved
        const unresolvedIssues = issuesList.filter(
          (issue) => issue.status.toLowerCase() !== "resolved"
        );

        const computedStats = {
          total: issuesList.length,
          pending: unresolvedIssues.filter(
            (issue) => issue.status.toLowerCase() === "pending"
          ).length,
          inProgress: unresolvedIssues.filter(
            (issue) => issue.status.toLowerCase() === "in-progress"
          ).length,
          resolved: issuesList.filter(
            (issue) => issue.status.toLowerCase() === "resolved"
          ).length,
        };

        setIssues(unresolvedIssues); // Set only unresolved issues
        setStats(computedStats);
      })
      .catch((error) => console.error("Failed to fetch issues:", error));
  }, []); // ✅ Runs only once when component mounts

  function formatDate(isoString) {
    const date = new Date(isoString);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedIssue) {
      console.error("No issue selected");
      return;
    }

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    // ✅ Add issue ID to the request data
    data.id = selectedIssue.id;

    updateIssues(data)
      .then((response) => {
        console.log("Issue updated:", response);
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  }

  return (
    <div className="authDashboard">
      <Navbar onAuthDashboard={true}>
        <li className="profileIcon">Ace</li>
      </Navbar>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
        <StatCard
          title="Total Issues"
          value={stats.total}
          icon={<Bug className="h-6 w-6" />}
          color="bg-[#147b73]"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Clock className="h-6 w-6" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<GitPullRequest className="h-6 w-6" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon={<CheckCircle2 className="h-6 w-6" />}
          color="bg-green-500"
        />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white !rounded-lg !shadow-sm !p-4 !mb-6 !mt-10">
        <div className="!flex !items-center !justify-between gap-4">
          <div className="!relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="!appearance-none !bg-gray-50 !border !rounded-lg !px-4 !py-2 !pr-8 !focus:outline-none !focus:ring-2 !focus:ring-[#147b73]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <ChevronDown className="!absolute !right-2 !top-1/2 !transform !-translate-y-1/2 !text-gray-400 !h-4 !w-4" />
          </div>
          <button className="!flex !items-center !space-x-2 !px-4 !py-2 !bg-gray-100 !rounded-lg !hover:bg-gray-200 !transition">
            <Filter className="!h-4 !w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Issues List and Details */}
      {/* <div className="!grid !grid-cols-1 !lg:grid-cols-3 !gap-6"> */}
      <div className="!flex flex-col md:flex-row !gap-2 !w-full">
        {/* Issues List */}
        <div className="!bg-white !rounded-lg !shadow-sm !overflow-hidden w-full md:w-[70%]">
          <div className="!p-4 !border-b">
            <h2 className="!text-lg !font-semibold">Recent Issues</h2>
          </div>
          <div className="!divide-y">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="!p-4 !hover:bg-gray-50 !cursor-pointer !transition"
                onClick={() => setSelectedIssue(issue)}
              >
                <div className="!flex !items-start !justify-between">
                  <div>
                    <h3 className="!font-medium !text-gray-900">
                      {issue.title}
                    </h3>
                    <div className="!mt-1 !flex !items-center !space-x-2 !text-sm !text-gray-500">
                      <MapPin className="!h-4 !w-4" />
                      <span>{issue.location}</span>
                    </div>
                  </div>
                  <StatusBadge status={issue.status} />
                </div>
                <div className="!mt-2 !text-sm !text-gray-600 !line-clamp-2">
                  {issue.description}
                </div>
                <div className="!mt-2 !flex !items-center !space-x-4 !text-sm !text-gray-500">
                  <span>Reported by: {issue.reportingUser}</span>
                  <span>Date: {formatDate(issue.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issue Details */}
        <div className="!bg-white !rounded-lg !shadow-sm w-full md:w-[30%]">
          {selectedIssue ? (
            <form className="!p-4" onSubmit={handleSubmit}>
              <div className="!mb-4">
                <h2 className="!text-xl !font-semibold !mb-2">
                  {selectedIssue.title}
                </h2>
                <StatusBadge status={selectedIssue.status} className="!mt-2" />
              </div>
              <img
                src={`http://localhost:3000/${selectedIssue.images[0]}`}
                alt="Issue"
                className="!w-full !h-48 !object-cover !rounded-lg !mb-4"
              />
              <div className="!space-y-4">
                <div>
                  <h3 className="!font-medium !text-gray-900">Description</h3>
                  <p className="!mt-1 !text-gray-600">
                    {selectedIssue.description}
                  </p>
                </div>
                <div>
                  <h3 className="!font-medium !text-gray-900">Location</h3>
                  <div className="!mt-1 !flex !items-center !space-x-2 !text-gray-600">
                    <MapPin className="!h-4 !w-4" />
                    <span>{selectedIssue.location}</span>
                  </div>
                </div>
                <div>
                  <h3 className="!font-medium !text-gray-900">Update Status</h3>
                  <select
                    className="!mt-1 !w-full !border !rounded-lg !px-3 !py-2 !focus:outline-none !focus:ring-2 !focus:ring-[#147b73]"
                    value={selectedIssue.status}
                    name="status"
                    onChange={(e) =>
                      setSelectedIssue({
                        ...selectedIssue,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <h3 className="!font-medium !text-gray-900">Add Response</h3>
                  <textarea
                    className="!mt-1 !w-full !border !rounded-lg !px-3 !py-2 !focus:outline-none !focus:ring-2 !focus:ring-[#147b73]"
                    rows={3}
                    placeholder="Type your response..."
                  />
                  <button className="!mt-2 !w-full !bg-[#147b73] !text-white !px-4 !py-2 !rounded-lg !hover:bg-[#147b73]/90 !transition">
                    Send Response
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="!p-4 !text-center !text-gray-500">
              <MessageSquare className="!h-12 !w-12 !mx-auto !mb-2" />
              <p>Select an issue to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
