---
name: Cursor rules for HTMX development with Django integration
version: 1.0.0
author: community
tags: [cursorrules, django, community]
compatibleModes: [Build, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Cursor rules for HTMX development with Django integration

## When to use this skill
Cursor rules for HTMX development with Django integration.

## Source
Synced from https://github.com/PatrickJS/awesome-cursorrules/tree/main/rules/htmx-django-cursorrules-prompt-file.mdc.

// HTMX with Django .cursorrules

// HTMX and Django best practices

const htmxDjangoBestPractices = [
  "Use Django's template system with HTMX attributes",
  "Implement Django forms for form handling",
  "Utilize Django's URL routing system",
  "Use Django's class-based views for HTMX responses",
  "Implement Django ORM for database operations",
  "Utilize Django's middleware for request/response processing",
];

// Folder structure

const folderStructure = `
project_name/
  app_name/
    templates/
    static/
      css/
      js/
    models.py
    views.py
    urls.py
  project_name/
    settings.py
    urls.py
manage.py
`;

// Additional instructions

const additionalInstructions = `
1. Use Django's template tags with HTMX attributes
2. Implement proper CSRF protection with Django's built-in features
3. Utilize Django's HttpResponse for HTMX-specific responses
4. Use Django's form validation for HTMX requests
5. Implement proper error handling and logging
6. Follow Django's best practices for project structure
7. Use Django's staticfiles app for managing static assets
`;
