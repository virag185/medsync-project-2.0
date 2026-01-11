# MedSync Engineering Journal
# AI & Research Transparency

Throughout this project, I used AI (ChatGPT) as a debugging and learning assistant.
Below are the **exact prompts** I used, mapped to real problems encountered.

---

### Prompt 1 — Firebase Secure Setup


I am building a Node.js backend with Firebase Firestore. How do I connect firebase-admin securely without exposing serviceAccountKey.json to GitHub?


---

### Prompt 2 — Node.js await Error


SyntaxError: await is only valid in async functions Node.js. How do I fix this error in an Express server?


---

### Prompt 3 — API 404 Error

Why am I getting POST http://localhost:3000/api/log-dose
 404 Not Found even though my server is running?
 
---

### Prompt 4 — Dashboard State Logic


Why does Firestore store taken_today as 'false' (string) instead of false (boolean), and how does this affect JavaScript logic?


---

### Prompt 6 — Daily Reset Design

How should I design a daily reset system so a patient can take medicine only once per day?


---

### Prompt 7 — Git Repository Errors

fatal: not a git repository (or any of the parent directories): .git — how do I fix this?

fatal: pathspec 'Dockerfile' did not match any files — what does this mean?


---

### Prompt 8 — Engineering Documentation


How should I structure an engineering journal with RCA and screenshots for a full stack project?

Prompt 9 — CORS Issue Between Frontend & Backend

Why does my browser block requests to my Node.js backend due to CORS, and how do I fix it using Express?

Prompt 10 — Firebase Data Not Updating

My Firebase Firestore document is not updating even though my API returns success. How can I debug this?

Prompt 11 — Frontend Fetch Not Working

Uncaught (in promise) TypeError: Failed to fetch in JavaScript. What are the common reasons and fixes?

Prompt 12 — Doctor Dashboard Not Updating in Real Time

How can a doctor dashboard reflect patient actions immediately after a patient clicks a button?

Prompt 13 — Designing Patient–Doctor Data Flow

What is a clean backend API design to sync patient actions with a doctor dashboard?

Prompt 14 — Docker Not Recognized Error

'docker' is not recognized as an internal or external command. How do I fix this on Windows?

Prompt 17 — Deleting Files Properly in Git

How do I properly delete files from a Git repository so the deletion is tracked?





This file documents bugs, errors, investigations, and lessons learned during the MedSync project.
Bug ID: #008
Context:
Verifying backend server response in browser.

Assumption:
Expected a visible confirmation message.

Reality:
Browser displayed backend response successfully.

Evidence:
[Screenshot of browser showing the message]

Lesson:
A simple response confirms that the server, routing, and port configuration are working correctly.
Milestone:
Initialized backend Node.js project and committed dependency configuration files.
Bug ID: #022
Context:
Could not navigate to backend directory using PowerShell.

Root Cause:
Folder path contained spaces and was not wrapped in quotes.

Solution:
Used quoted path in `cd` command.

Lesson:
Paths with spaces must be quoted in PowerShell to be interpreted correctly.
Bug ID: #029
Context:
POST /api/log-dose returned "Patient not found".

Investigation:
Checked Firestore and confirmed database was empty.

Root Cause:
Test patient document had not been created yet.

Solution:
Ran test-db.js to seed initial patient data.

Lesson:
API errors can correctly indicate missing data rather than system failure.
Bug ID: #030
Context:
Git add failed due to incorrect file path.

Root Cause:
Ran git commands from inside backend directory while using root-relative paths.

Solution:
Used relative paths appropriate to current working directory.

Lesson:
Always verify current directory when staging files in Git.
Note:
Firestore timestamp type is required for date comparison; string values are not interchangeable.
Bug ID: #044
Context:
Attempted to containerize backend using Docker Desktop on Windows.

Investigation:
Docker build failed with EOF and file locking errors.
Moving the project out of OneDrive resolved file issues, but Docker Desktop failed to start on the system.

Root Cause:
Docker Desktop could not start due to host environment limitations (system-level dependency / virtualization issue).

Decision:
Per assignment instructions, proceeded with local backend execution while recording the demo.

Lesson:
Engineering judgment includes knowing when to stop fighting tooling and document constraints transparently.
Bug ID: #045
Context:
Docker Desktop failed to start despite multiple retries.

Investigation:
Verified Docker installation, BuildKit settings, filesystem issues, and OneDrive conflicts.
Checked system virtualization support using systeminfo.

Root Cause:
Hardware virtualization was not enabled in firmware (BIOS), which is required for Docker Desktop on Windows.

Decision:
Stopped further Docker attempts and proceeded with local backend execution as permitted by the assignment.

Lesson:
Some deployment failures are caused by system-level constraints; proper diagnosis and transparent documentation is the correct engineering response.
Bug ID: #046
Context:
Node server failed to start due to MODULE_NOT_FOUND error.

Root Cause:
Attempted to run server.js from the project root instead of backend directory.

Solution:
Changed directory to backend and ran node server.js.

Lesson:
Node resolves entry files relative to the current working directory.
Bug ID: #047
Context:
Initial frontend lacked time display and doctor nudge functionality.

Root Cause:
Frontend was intentionally minimal during early integration phase.

Solution:
Extended patient UI to show pill time and doctor UI to display timestamps and nudge action.

Lesson:
Incremental delivery is effective, but final requirements must be explicitly implemented.
Bug ID: #054
Context:
Doctor dashboard did not display daily dosage or nudge option.

Root Cause:
Frontend UI initially rendered minimal patient fields and conditionally hid nudge for taken status.

Solution:
Extended doctor UI to show daily dosage, pill count, and conditional nudge button.

Lesson:
Data availability in backend must be explicitly rendered in frontend views.
Bug ID: #057
Context:
Doctor dashboard showed duplicate headers and lacked clear visual status indicators.

Root Cause:
Duplicate HTML elements and reliance on background color instead of explicit indicators.

Solution:
Removed duplicate header and added red/green status dot with timestamp display.

Lesson:
Explicit visual indicators communicate status more reliably than background styling alone.
## Bug ID: #001
**Timestamp:** 11 Jan 2026, 5:20 PM

### The Context
I was running the backend using `node server.js`.

### 1. The Assumption
I assumed the backend would run correctly because the logic was valid.

### 2. The Reality
The server crashed with a JavaScript syntax error.

**Error Message:**
