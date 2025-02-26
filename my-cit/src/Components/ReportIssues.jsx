import { useState } from "react";
import UploadIcon from "../assets/icons/upload-icon.svg";
import { reportIssue } from "../http";
import { getUserData } from "../http";

export default function ReportIssues({ sidebarActive }) {
  const [images, setImages] = useState([]);
  const [invalidField, setInvalidField] = useState({ name: "", message: "" });
  const [location, setLocation] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      setInvalidField({
        name: "image",
        message: "At least one image is required!",
      });
      return;
    }
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 3)); // Limit to 3 images
    setInvalidField({ name: "", message: "" }); // Clear error if valid
  };

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);

    // Append images to FormData
    images.forEach((image) => {
      fd.append("imagesUploader", image.file);
    });

    // Basic Validation
    const title = fd.get("title")?.trim();
    const category = fd.get("category")?.trim();
    const description = fd.get("description")?.trim();
    const location = fd.get("location")?.trim();

    if (!title) {
      setInvalidField({ name: "title", message: "Title cannot be empty!" });
      return;
    }
    if (!category) {
      setInvalidField({ name: "category", message: "Select a category!" });
      return;
    }
    if (!description) {
      setInvalidField({
        name: "description",
        message: "Description is missing!",
      });
      return;
    }
    if (!location) {
      setInvalidField({ name: "location", message: "Location is missing!" });
      return;
    }
    if (images.length === 0) {
      setInvalidField({
        name: "image",
        message: "At least one image is required!",
      });
      return;
    }

    getUserData()
      .then((data) => {
        fd.append("reportingUser", data.user.email);
        // Send request to backend
        reportIssue(fd)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("Request failed:", error);
          });
      })
      .catch(() => {
        console.log("Failed to fetch user data.");
      });
  }

  function locationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude}, ${longitude}`);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className={`reportIssues ${!sidebarActive ? "active" : ""}`}>
      <form
        className="reportIssuesForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1>Report an Issue</h1>

        {/* Title */}
        <p>
          <label htmlFor="title">Issue Title</label>
          <input type="text" name="title" id="title" />
          {invalidField.name === "title" && (
            <p className="errorMsg">{invalidField.message}</p>
          )}
        </p>

        {/* Category */}
        <p>
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="">Select a Category</option>
            <option value="roadDamage">Road Damage</option>
            <option value="waterSupply">Water Supply</option>
            <option value="electricity">Electricity</option>
            <option value="wasteManagement">Waste Management</option>
            <option value="streetLighting">Street Lighting</option>
            <option value="parksAndRecreation">Parks & Recreation</option>
          </select>
          {invalidField.name === "category" && (
            <p className="errorMsg">{invalidField.message}</p>
          )}
        </p>

        {/* Description */}
        <p>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" rows={8}></textarea>
          {invalidField.name === "description" && (
            <p className="errorMsg">{invalidField.message}</p>
          )}
        </p>

        {/* Location */}
        <p>
          <label htmlFor="location">Location</label>
          <div className="locationAndBtn">
            <input type="text" name="location" id="location" value={location} onChange={(event)=>setLocation(event.target.value)} />
            <button type="button" id="button" onClick={locationClick}>
              Current Location
            </button>
          </div>
          {invalidField.name === "location" && (
            <p className="errorMsg">{invalidField.message}</p>
          )}
        </p>

        {/* Image Upload */}
        <p>
          <div className="photo-upload-section">
            <h2>Upload Images</h2>
            <input
              type="file"
              id="upload"
              name="imagesUploader"
              accept="image/*"
              multiple
              hidden
              onChange={handleFileChange}
            />
            <label htmlFor="upload">
              <span id="icon">
                <img
                  id="upload-icon"
                  src={UploadIcon}
                  alt="Upload"
                  title="Upload Images"
                />
              </span>
              <span>Click to Upload</span>
              <span>First Photo will be Property Thumbnail.</span>
            </label>
            <ul className="image-list">
              {images.map((image, index) => (
                <li key={index}>{image.name}</li>
              ))}
            </ul>
          </div>
          {invalidField.name === "image" && (
            <p className="errorMsg">{invalidField.message}</p>
          )}
        </p>

        {/* Urgency */}
        <p>
          <label htmlFor="urgency">Urgency</label>
          <select name="urgency" id="urgency">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {invalidField.name === "category" && (
            <p className="errorMsg">{invalidField.message}</p>
          )}
        </p>

        {/* Identity Checkbox */}
        <p>
          <input type="checkbox" name="identity" id="identity" />
          <label htmlFor="identity" id="checkboxLabel">
            Include your identity?
          </label>
        </p>

        {/* Submit Button */}
        <button className="reportIssueSubmitBtn">Submit Report</button>
      </form>
    </div>
  );
}
