// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tool-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const tabId = `tab-${btn.dataset.tab}`;
    document.getElementById(tabId).classList.add('active');
  });
});

// JSON Studio
const jsonInput = document.getElementById('json-input');
const jsonOutput = document.getElementById('json-output');
const jsonStatus = document.getElementById('json-status');

document.getElementById('json-format').addEventListener('click', () => {
  try {
    const parsed = JSON.parse(jsonInput.value);
    jsonOutput.textContent = JSON.stringify(parsed, null, 2);
    jsonStatus.className = 'status-bar ok';
    jsonStatus.textContent = '✓ Valid JSON formatted successfully';
  } catch (err) {
    jsonStatus.className = 'status-bar err';
    jsonStatus.textContent = `✗ Parse Error: ${err.message}`;
  }
});

document.getElementById('json-minify').addEventListener('click', () => {
  try {
    const parsed = JSON.parse(jsonInput.value);
    jsonOutput.textContent = JSON.stringify(parsed);
    jsonStatus.className = 'status-bar ok';
    jsonStatus.textContent = '✓ Valid JSON minified';
  } catch (err) {
    jsonStatus.className = 'status-bar err';
    jsonStatus.textContent = `✗ Parse Error: ${err.message}`;
  }
});

document.getElementById('json-sample').addEventListener('click', () => {
  const sample = {
    name: "Rushank",
    role: "Full-Stack Engineer",
    skills: ["React", "Next.js", "Node.js", "TypeScript"],
    profile: {
      github: "https://github.com/rushank3485",
      status: "Available for freelance and internships"
    },
    metrics: { repos: 4, stars: 12 }
  };
  jsonInput.value = JSON.stringify(sample);
  document.getElementById('json-format').click();
});

document.getElementById('json-copy').addEventListener('click', () => {
  navigator.clipboard.writeText(jsonOutput.textContent);
  jsonStatus.textContent = 'Copied formatted output to clipboard!';
});

// JWT Inspector
const jwtInput = document.getElementById('jwt-input');
const jwtHeader = document.getElementById('jwt-header');
const jwtPayload = document.getElementById('jwt-payload');

function parseJwt() {
  const token = jwtInput.value.trim();
  const parts = token.split('.');
  if (parts.length >= 2) {
    try {
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      jwtHeader.textContent = JSON.stringify(header, null, 2);
      jwtPayload.textContent = JSON.stringify(payload, null, 2);
    } catch (e) {
      jwtHeader.textContent = '// Invalid base64 in JWT token';
      jwtPayload.textContent = '// Could not decode claims';
    }
  } else {
    jwtHeader.textContent = '// Paste a valid JWT (3 parts separated by dots)';
    jwtPayload.textContent = '';
  }
}

jwtInput.addEventListener('input', parseJwt);

document.getElementById('jwt-sample').addEventListener('click', () => {
  jwtInput.value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJ1c2hhbmsiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3OTQwNjYwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  parseJwt();
});

document.getElementById('jwt-copy').addEventListener('click', () => {
  navigator.clipboard.writeText(jwtPayload.textContent);
});

// Base64
const b64Input = document.getElementById('b64-input');
const b64Output = document.getElementById('b64-output');

document.getElementById('b64-encode').addEventListener('click', () => {
  b64Output.value = btoa(unescape(encodeURIComponent(b64Input.value)));
});

document.getElementById('b64-decode').addEventListener('click', () => {
  try {
    b64Output.value = decodeURIComponent(escape(atob(b64Input.value.trim())));
  } catch (e) {
    b64Output.value = `Error: ${e.message}`;
  }
});

document.getElementById('url-encode').addEventListener('click', () => {
  b64Output.value = encodeURIComponent(b64Input.value);
});

document.getElementById('url-decode').addEventListener('click', () => {
  b64Output.value = decodeURIComponent(b64Input.value);
});

// Init sample
document.getElementById('json-sample').click();
