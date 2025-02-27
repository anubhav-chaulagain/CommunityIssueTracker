export async function signup(data) {
  const response = await fetch("http://localhost:3000/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function login(data) {
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return response.json();
}

export async function reportIssue(data) {
  const response = await fetch("http://localhost:3000/reportIssues", {
    method: "POST",
    
    body: data, // `data` should be a FormData object
    credentials: "include",
  });

  return response.json();
}

export async function getUserData() {
  const response = await fetch("http://localhost:3000/users", {
    method: "GET",
    credentials: "include", // ✅ Ensures token (cookie) is sent
  });
  return response.json();
}

export async function getAllIssues() {
  const response = await fetch("http://localhost:3000/issues", {
    method: "GET",
    credentials: "include", // ✅ Ensures token (cookie) is sent
  });
  return response.json();
}

export async function getMyIssues() {
  const response = await fetch("http://localhost:3000/myIssues", {
    method: "GET",
    credentials: "include", // ✅ Ensures token (cookie) is sent
  });
  return response.json();
}

export async function getResolvedIssues() {
  const response = await fetch("http://localhost:3000/resolvedIssues", {
    method: "GET",
    credentials: "include", // ✅ Ensures token (cookie) is sent
  });
  return response.json();
}

export async function updateProfile(data) {
  const response = await fetch("http://localhost:3000/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return response.json();
}

export async function updateIssues(data) {
  const response = await fetch("http://localhost:3000/issues", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return response.json();
}

export async function getCookie() {
  const response = await fetch("http://localhost:3000/auth/me", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}