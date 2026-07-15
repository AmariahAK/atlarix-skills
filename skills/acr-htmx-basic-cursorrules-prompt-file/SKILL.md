---
name: Cursor rules for HTMX development with basic setup
version: 1.0.0
author: community
tags: [cursorrules, community]
compatibleModes: [Build, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# Cursor rules for HTMX development with basic setup

## When to use this skill
Cursor rules for HTMX development with basic setup.

## Source
Synced from https://github.com/PatrickJS/awesome-cursorrules/tree/main/rules/htmx-basic-cursorrules-prompt-file.mdc.

// HTMX Basic Setup .cursorrules

// HTMX best practices

const htmxBestPractices = [
  "Use hx-get for GET requests",
  "Implement hx-post for POST requests",
  "Utilize hx-trigger for custom events",
  "Use hx-swap to control how content is swapped",
  "Implement hx-target to specify where to swap content",
  "Utilize hx-indicator for loading indicators",
];

// Folder structure

const folderStructure = `
src/
  templates/
  static/
    css/
    js/
  app.py
`;

// Additional instructions

const additionalInstructions = `
1. Use semantic HTML5 elements
2. Implement proper CSRF protection
3. Utilize HTMX extensions when needed
4. Use hx-boost for full page navigation
5. Implement proper error handling
6. Follow progressive enhancement principles
7. Use server-side templating (e.g., Jinja2, Handlebars)
`;
