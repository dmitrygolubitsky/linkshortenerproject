---
agent: Ask
---

Perform a security audit of this codebase to detect any potential security vulnerabilities in this project.

Output your findings as a markdown formatted table with the following columns (Id should start at 1 and increment for each issue, File path should be an actual link to the file): "Id", "Severity", "Issue", "File path", "Line number(s)", and "Recommendation".

Next, ask the user which issues they would like to fix by either replying "all" to fix all issues or providing a comma-separated list of issue Ids. After their reply, run a separate sub agent (#runSubagent) to fix each issue that the user has selected. Each sub agent should handle one issue at a time and report back with a simple 'subAgentSuccessful: true|false'.