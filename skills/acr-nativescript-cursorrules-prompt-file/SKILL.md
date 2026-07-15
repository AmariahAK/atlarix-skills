---
name: Cursor rules for NativeScript development
version: 1.0.0
author: community
tags: [cursorrules, community]
compatibleModes: [Build, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Cursor rules for NativeScript development

## When to use this skill
Cursor rules for NativeScript development.

## Source
Synced from https://github.com/PatrickJS/awesome-cursorrules/tree/main/rules/nativescript-cursorrules-prompt-file.mdc.

// NativeScript .cursorrules

// NativeScript best practices

const nativeScriptBestPractices = [
  "Utilize @nativescript/core features and APIs where applicable",
  "Utilize common web APIs where applicable",
  "Implement proper navigation using NativeScript Navigation",
  "Use NativeScript's assets folder for images, sounds or videos and use the fonts folder for custom fonts",
  "Implement proper error handling where possible"
];

// Folder structure

const folderStructure = `
src/
  assets/
  components/
  services/
  utils/
`;

// Additional instructions

const additionalInstructions = `
1. Use TypeScript for type safety
2. Use @nativescript/secure-storage for sensitive data
3. Use @nativescript/biometrics for anything related to biometrics
4. Always use nativescript-fonticon for font icons
5. Follow NativeScript best practices for performance
`;
