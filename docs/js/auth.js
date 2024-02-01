const loginUrl = "login.html";
const indexUrl = ".";

const authOrRedirectToLogin = async () => {
  // Redirect if not logged in.
  const sessionid = getStoredSessionId();
  if (!(sessionid)) location.href = loginUrl;

  // Hit /me endpoint and if it fails then execute logout.
  try {
    const username = await apiGetMe();
  } catch (exc) {
    await apiPostLogout();
  }
};

const getStoredSessionId = () => {
  // Redirect if not logged in.
  let sessionid = getCookie("sessionid");
  console.log(`Cookie sessionid=${sessionid}`);
  if (!(sessionid)) sessionid = localStorage.getItem("sessionid");
  console.log(`Local storage sessionid=${sessionid}`);
  return sessionid;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

const apiPostLogin = async (formData) => {
  const host = formData.get("host");
  const username = formData.get("username");
  let protocol = "https";
  if (host.startsWith("127.")) protocol = "http";

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/login`, {
      method: "POST",
      body: formData,
    });
  } catch (exc) {
    console.log(exc);
    throw new Error(`Cannot reach the host ${host}`);
  }

  if (!(response.ok)) {
    console.log(response);
    throw new Error("Username or password invalid");
  }

  // Store username and host in local storage.
  localStorage.clear();
  localStorage.setItem("host", host);
  localStorage.setItem("protocol", protocol);
  localStorage.setItem("username", username);
  const json = await response.json()
  const sessionid = json.sessionid;
  console.log("Login returned sessionid=" + sessionid);
  localStorage.setItem("sessionid", sessionid);
  console.log("Stored sessionid=" + getStoredSessionId());
};

const apiPostLogout = async () => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/logout`, {
      method: "POST",
    });
  } catch (exc) {
    console.log(exc);
    throw new Error("Cannot reach the host");
  } finally {
    deleteCookie("sessionid");
    localStorage.clear();
    location.href = loginUrl;
  }
};

const apiGetMe = async () => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");
  const sessionid = getStoredSessionId();

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/me`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: sessionid,
      }
    });
  } catch (exc) {
    console.log(exc);
    throw new Error("Cannot reach the host");
  }
  console.log(response);

  if (!(response.ok)) {
    throw new Error("GET /me error");
  }

  const username = await response.text();
  return username;
};
