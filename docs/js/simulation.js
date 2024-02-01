const apiGetSimulation = async (simId) => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");
  if (!host) throw new Error("Host not in localStorage");
  if (!protocol) throw new Error("Protocol not in localStorage");
  const sessionid = getStoredSessionId();

  if (!simId) throw new Error("simId blank");

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/simulation/${simId}`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: sessionid,
      }
    });
  } catch (exc) {
    console.log(exc);
    throw new Error(`Cannot reach the host ${host}`);
  }

  if (response.ok) {
    return await response.json();
  } else {
    console.log(response);
    throw new Error(`GET /simulation/${simId} error`);
  }
};

const apiGetRunLog = async (simId) => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");
  if (!host) throw new Error("Host not in localStorage");
  if (!protocol) throw new Error("Protocol not in localStorage");
  const sessionid = getStoredSessionId();

  if (!simId) throw new Error("simId blank");

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/simulation/${simId}/run-log`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: sessionid,
      }
    });
  } catch (exc) {
    console.log(exc);
    throw new Error(`Cannot reach the host ${host}`);
  }

  if (response.ok) {
    return await response.json();
  } else {
    console.log(response);
    throw new Error(`GET /simulation/${simId}/run-log error`);
  }
};

const apiGetPerfLogs = async (simId) => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");
  if (!host) throw new Error("Host not in localStorage");
  if (!protocol) throw new Error("Protocol not in localStorage");
  const sessionid = getStoredSessionId();

  if (!simId) throw new Error("simId blank");

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/simulation/${simId}/perf-logs`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: sessionid,
      }
    });
  } catch (exc) {
    console.log(exc);
    throw new Error(`Cannot reach the host ${host}`);
  }

  if (response.ok) {
    return await response.json();
  } else {
    console.log(response);
    throw new Error(`GET /simulation/${simId}/perf-logs error`);
  }
};

const apiGetSimulations = async () => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");
  if (!host) throw new Error("Host not in localStorage");
  if (!protocol) throw new Error("Protocol not in localStorage");
  const sessionid = getStoredSessionId();

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/simulation/`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: sessionid,
      }
    });
  } catch (exc) {
    console.log(exc);
    throw new Error(`Cannot reach the host ${host}`);
  }

  if (response.ok) {
    return await response.json();
  } else {
    console.log(response);
    throw new Error("GET /simulation error");
  }
};

const apiCreateSimulation = async (label) => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");
  if (!host) throw new Error("Host not in localStorage");
  if (!protocol) throw new Error("Protocol not in localStorage");
  const sessionid = getStoredSessionId();

  const body = JSON.stringify({"label": label});

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/simulation/`, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: sessionid,
      }
    });
  } catch (exc) {
    console.log(exc);
    throw new Error(`Cannot reach the host ${host}`);
  }

  const jsonBody = await response.json();
  if (response.ok) {
    return jsonBody;
  } else {
    console.log(response);
    let msg = jsonBody.error_message;
    if (!msg) msg = `POST /simulation/ error<br>${JSON.stringify(jsonBody)}`;
    throw new Error(msg);
  }
};

const apiDeleteSimulation = async (simId) => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");
  if (!host) throw new Error("Host not in localStorage");
  if (!protocol) throw new Error("Protocol not in localStorage");
  const sessionid = getStoredSessionId();

  if (!simId) throw new Error("simId blank");

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/simulation/${simId}`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        Authorization: sessionid,
      }
    });
  } catch (exc) {
    console.log(exc);
    throw new Error(`Cannot reach the host ${host}`);
  }

  const jsonBody = await response.json();
  if (response.ok) {
    return;
  } else {
    console.log(response);
    let msg = jsonBody.error_message;
    if (!msg) msg = `DELETE /simulation/${simId} error<br>${JSON.stringify(jsonBody)}`;
    throw new Error(msg);
  }
};

const apiPostUpload = async (simId, filesToUploadObject) => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");
  if (!host) throw new Error("Host not in localStorage");
  if (!protocol) throw new Error("Protocol not in localStorage");
  const sessionid = getStoredSessionId();

  if (!simId) throw new Error("simId blank");
  if (Object.keys(filesToUploadObject).length === 0) throw new Error("filesToUploadObject empty");

  const formData = new FormData();
  if (filesToUploadObject["dot.tib"]) formData.append("tib_file", filesToUploadObject["dot.tib"], "dot.tib");
  if (filesToUploadObject["dot.geo"]) formData.append("geo_file", filesToUploadObject["dot.geo"], "dot.geo");

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/simulation/${simId}/input-files`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: 'application/json',
        Authorization: sessionid,
      }
    });
  } catch (exc) {
    console.log(exc);
    throw new Error(`Cannot reach the host ${host}`);
  }
  console.log(response);

  const jsonBody = await response.json();
  if (response.ok) {
    return;
  } else {
    console.log(response);
    const msg = `POST /simulation/${simId}/input-files error<br>${JSON.stringify(jsonBody)}`;
    throw new Error(msg);

  }
};

const apiGetDownload = async (simId) => {
  const host = localStorage.getItem("host");
  const protocol = localStorage.getItem("protocol");
  if (!host) throw new Error("Host not in localStorage");
  if (!protocol) throw new Error("Protocol not in localStorage");
  const sessionid = getStoredSessionId();

  if (!simId) throw new Error("simId blank");

  let response;
  try {
    response = await fetch(`${protocol}://${host}/api/simulation/${simId}/output.zip`, {
      method: "GET",
      headers: {
        Authorization: sessionid,
      }
    });
  } catch (exc) {
    console.log(exc);
    throw new Error(`Cannot reach the host ${host}`);
  }
  console.log(response);

  if (!(response.ok)) {
    console.log(response);
    const msg = `POST /simulation/${simId}/input-files error<br>${JSON.stringify(jsonBody)}`;
    throw new Error(msg);
  }
  return await response.blob();
};

let ws = null;
const apiWebsocketRun = async (simId, nProc, onMessageHookFn, onOpenHookFn, onCloseHookFn, onErrorHookFn) => {
  const host = localStorage.getItem("host");
  if (!host) throw new Error("Host not in localStorage");

  if (!simId) throw new Error("simId blank");
  if (!nProc) nProc = 8;

  let protocol = "wss";
  if (host.startsWith("127.0.0.1")) protocol = "ws";
  ws = new WebSocket(`${protocol}://${host}/api/simulation/${simId}/run`);

  ws.onopen = () => {
    const sessionid = getStoredSessionId();
    ws.send(`<[AUTH]>sessionid=${sessionid}`);
    ws.send(`<[START]>nproc=${nProc}`);
    onOpenHookFn();
  };

  ws.onclose = async (event) => {
    console.log(event);
    if (event.code===1011 && event.reason==="forbidden") {
      await apiPostLogout();
    }
    ws = null;
    onCloseHookFn();
  };

  ws.onmessage = (event) => {
    console.log(event.data);
    onMessageHookFn(event.data);
  };

  ws.onerror = (event) => {
    onErrorHookFn();
  }

  console.log(ws.readyState);
  while (ws && ws.readyState !== 1) {
    console.log(ws.readyState);
    await sleep(500);
  }
};
