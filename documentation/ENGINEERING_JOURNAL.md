# MedSync Engineering Journal

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
