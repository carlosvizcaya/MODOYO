# SDLC (Software Development Life Cycle) - Project Initialization Guide

This document outlines the standardized process for initiating and managing software projects using **The-Architect** methodology within the **Abacus.AI** environment.

## 1. Blueprint Creation (The-Architect Methodology)

Before writing any code, a comprehensive blueprint must be created. This blueprint serves as the single source of truth for the project.

### The 20 Sections of the Blueprint
The `blueprint.md` file must contain the following sections:

1.  **Project Name & Tagline**: A concise name and a one-sentence description.
2.  **Elevator Pitch**: A 30-second explanation of the project's value.
3.  **Core Features (MVP)**: The minimum set of features required for launch.
4.  **User Personas**: Detailed descriptions of the primary users.
5.  **User Stories**: Functional requirements formatted as "As a [persona], I want [action] so that [benefit]".
6.  **Non-Functional Requirements**: Performance, security, and scalability constraints.
7.  **Tech Stack**: Specific technologies, frameworks, and libraries to be used.
8.  **Data Schema**: Database structure, including tables, fields, and relationships.
9.  **API Endpoints**: A list of all required API routes and their expected inputs/outputs.
10. **UI/UX Guidelines**: Design principles, color palettes, and component libraries.
11. **App Flow**: A step-by-step walkthrough of the primary user journey.
12. **State Management**: How application state will be handled (e.g., Redux, Context API).
13. **Authentication & Authorization**: User login, registration, and permission logic.
14. **Third-Party Integrations**: External services (e.g., Stripe, SendGrid, AWS).
15. **Testing Strategy**: Unit, integration, and end-to-end testing plans.
16. **Deployment Strategy**: CI/CD pipelines and hosting environments.
17. **Project Structure**: A high-level overview of the file and folder organization.
18. **Known Risks & Mitigations**: Potential technical or business challenges.
19. **Future Roadmap**: Features planned for post-MVP releases.
20. **Glossary**: Definitions of domain-specific terms.

### Process
-   **Interview Phase**: The AI agent will ask targeted questions to fill these sections.
-   **Validation Phase**: The user must review and approve the blueprint before coding begins.
-   **Versioning**: The blueprint should be versioned (e.g., `v1.0`, `v1.1`) in GitHub.

## 2. GitHub Integration (Source of Truth)

The blueprint and all project specifications must be stored in a GitHub repository to ensure persistence across Abacus sessions.

### Steps
1.  **Initialize Repository**: Create a new GitHub repo for the project.
2.  **Upload Blueprint**: Save the finalized `blueprint.md` in the root of the repository.
3.  **Context File**: Include a `CLAUDE.md` or `CONTEXT.md` file that summarizes the project for AI agents.
4.  **Commit Strategy**: Use clear commit messages referencing User Story IDs (e.g., `feat: implement US-001 login flow`).

## 3. Abacus Project Configuration

To maintain context within Abacus.AI, the project must be configured to reference the GitHub repository.

### Configuration Instructions
1.  **Project Name**: `[Nombre de Proyecto]`
2.  **GitHub Connection**: Link the project to the GitHub repository containing the `blueprint.md`.
3.  **System Instruction**: Add the following instruction to the project's "Custom Instructions" or "System Prompt":
    > "Siempre que inicie un nuevo chat, lee el archivo `blueprint.md` de mi repositorio para recuperar el contexto del proyecto. Usa este archivo como la fuente primaria de verdad para todas las decisiones técnicas y de producto."

## 4. Tracking & User Stories

All functional requirements must be tracked using unique IDs to facilitate clear communication and progress tracking.

### ID Format
-   **User Stories**: `US-XXX` (e.g., `US-001`, `US-002`)
-   **Tasks**: `T-XXX` (e.g., `T-001`, `T-002`)
-   **Bugs**: `B-XXX` (e.g., `B-001`, `B-002`)

### Example User Story
**ID**: `US-001`
**Title**: User Registration
**Description**: As a new user, I want to register with my email and password so that I can access the platform.
**Acceptance Criteria**:
-   Email validation is performed.
-   Password must be at least 8 characters.
-   Success message is displayed upon registration.

---

*This document is part of the "Santi y amigos" project context and should be updated as the SDLC process evolves.*
