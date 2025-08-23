# Vibe Coding Guidelines

This document describes how a human **vibe coder** works together with AI agents to create a software product using a quality-focused, structured approach that prevents the productivity losses common in unstructured development. The method is built around a small set of **artifacts**—shared documents in the repository that guide and record the process. Artifacts evolve as the project evolves, and they keep knowledge available to all agents and contributors.

## Purpose of the Artifacts

The artifacts exist to provide **context**. Any AI agent that joins the project must be able to continue working without relying on previous chat history. By reading the artifacts, the agent knows what has been built, how it works, what remains to do, and how to judge if a task is done.

This makes it possible to switch AI agents at any time. The human does not need to supply missing context; the artifacts carry it. The repository itself becomes the single source of truth for both product knowledge and process knowledge.

## Incremental development

Development proceeds in small, self-contained increments. For each feature we create a task file that specifies the next increment and its acceptance criteria. After implementing a task we ensure the repository remains in a stable, high-quality state: the project builds, automated tests and a brief smoke test pass, and the `current_architecture.md` artifact is updated. Quality is enforced by the Definition of Done artifact — a checklist run for every task. This keeps progress predictable, reversible, and preserves steady productivity.

## Artifacts and Their Role

Artifacts are the backbone of the workflow. Each artifact lives in the Git repository, can change over time, and is accessible to everyone involved.

The artifacts are:

1. **This Guideline Document** – explains the process and the role of each artifact.
2. **Requirements** – what we want to build.
3. **Target Architecture** – how we intend to build it.
4. **Current Architecture** – what the system currently contains and how it works.
5. **Definition of Done** – what it means for work to be complete.
6. **Tasks** – the full list of increments we have given to the AI coder.

### Guideline Document in Detail

The guideline document is the entry point for the project. It explains how the process works, which artifacts exist, and how they interact. Its purpose is to give any participant or AI agent an overview of the development method before they begin.

This document is updated when the process changes. It should always reflect the current rules of collaboration.

### Requirements in Detail

The requirements artifact describes **what** we want to build. It is the reference for the desired functionality of the product.

- It may start rough and incomplete.
- It evolves as new insights appear.
- It provides a common understanding of the goals.

The requirements file is not a contract but a living plan. It is always valid only for the current state of the project.

### Target Architecture in Detail

The target architecture artifact explains **how** we plan to build the system. It documents the technical foundation and the structural choices.

- It lists the chosen technology stack.
- It describes the overall system structure.
- It may evolve as the system grows and constraints change.

The target architecture document ensures that every contributor works from the same technical baseline.

### Current Architecture in Detail

The current architecture artifact describes the **current state of the system**. It complements the requirements (future) and the target architecture (design) by recording what actually exists now.

It may include:

- Features currently implemented.
- A list of files and their purpose.
- Known placeholders or temporary code marked for removal.
- Acceptance criteria and the location of automated tests.
- A history of tasks completed so far.

The current architecture is updated incrementally, task by task.

### Definition of Done in Detail

The definition of done artifact describes **what it means for work to be finished**. It sets the quality standard for tasks.

Examples of items that may be included:

- The project builds without errors.
- The acceptance criteria for the task are fulfilled.
- All automated tests pass, including those from previous tasks.
- The current architecture artifact is updated.

The definition of done may change as the team gains experience, but it always functions as the common bar for completion.

### Tasks in Detail

Tasks are the **unit of progress**. Every task describes one increment of work and records its own outcome.

- Each task is stored as a separate file in the repository.
- Files are named and ordered numerically: `task1.md`, `task2.md`, `task3.md`, and so on.
- A task file contains:
  - The description of the task.
  - Its acceptance criteria (including which are automated).
  - Implementation details documenting all files changed.
  - References to code, tests, and documentation updated by this task.

Together the tasks form a step-by-step history of how the product was built.

## Step 1: Business Analysis

The first step is to clarify the requirements. In this phase, the AI agent takes the role of business analyst. The purpose is to figure out _what_ we want to build. The output is the **requirements artifact**, a document that lists the current understanding of the product.

The requirements document does not have to be complete. It is expected to change as we learn more. What matters is that we always have a shared artifact that reflects our current understanding of the system.

Prompt suggestion (copy-paste):

```
You are acting as a Business Analyst. Read the project-management/guidelines.md file to understand the vibe coding process. We are in Step 1: Business Analysis.

Your task: Create the requirements.md file based on my project description below.

My initial project description:
- [paste your project description here]
- [add any specific requirements, constraints, or goals]

Please:
1. Draft a complete requirements.md file following the template structure
2. Ask me 3-5 clarifying questions to improve our shared understanding
3. Suggest the first 2-3 tasks that would implement core functionality

Focus on being specific and testable - avoid vague requirements.
```

## Step 2: Target Architecture

Once we know what to build, we move to target architecture. Here the AI agent acts as system architect. The result is the **target architecture artifact**, a document describing the chosen technology stack and the structural design of the application.

Like requirements, the target architecture is not fixed forever. It evolves as the system evolves. The document ensures that every contributor has a common picture of the technical foundation.

Prompt suggestion (copy-paste):

```
You are acting as a System Architect. Read project-management/guidelines.md and project-management/requirements.md to understand the project. We are in Step 2: Target Architecture.

Your task: Create the target_architecture.md file.

Technology preferences:
- [Option 1: List specific technologies you want to use]
- [Option 2: "I have limited technical knowledge - please recommend the best approach"]

Please:
1. Draft a complete target_architecture.md following the template structure
2. Justify your key technology choices based on the requirements
3. Identify 2-3 architectural risks and mitigation strategies
4. Ask me any clarifying questions about technical constraints or preferences

Focus on creating a foundation that supports the requirements and enables incremental development.
```

## Step 3: Definition of Done

The third step defines how we decide that work is finished. Here the AI agent takes the role of **Quality Engineer** to establish quality standards and propose comprehensive Definition of Done criteria covering build, testing, documentation, and review processes.

The result is the **definition of done artifact**, a document that serves as the quality contract for every task and gives the programmer agent clear criteria to validate against.

Prompt suggestion (copy-paste):

```
You are acting as a Quality Engineer. Read project-management/guidelines.md, project-management/requirements.md, and project-management/target_architecture.md to understand the project. We are in Step 3: Definition of Done.

Your task: Create the definition_of_done.md file that defines quality standards for each task.

Please:
1. Draft a complete definition_of_done.md following the template structure
2. Include specific, measurable criteria for: Build, Acceptance Criteria, Automated Tests, Documentation, Review Process
3. Propose a simple smoke test approach that validates core functionality after each task
4. Suggest quality gates that prevent common shortcuts or technical debt

Focus on criteria that ensure each task leaves the repository in a stable, runnable state.
```

## Step 4: Planning

This step focuses on deciding what to build next and preparing the task. The AI agent takes the role of **Product Owner**.

1. **Backlog Creation** – The AI agent and vibe coder create a prioritized list of potential tasks that would provide value to the project.
2. **Task Selection** – The vibe coder selects which feature from the backlog should be implemented next.
3. **Task Definition** – The AI agent creates a detailed task file with acceptance criteria and identifies which criteria should be automated tests.
4. **Documentation Review** – Before implementation begins, review if the planned task requires updates to the requirements or the target architecture artifact. As implementation details become clearer, the documentation may need refinement.

Example prompt 1 (backlog creation, copy-paste):

```
You are acting as a Product Owner. Read the project files: guidelines.md, requirements.md, target_architecture.md, and current_architecture.md to understand the current project state.

Task: Create a prioritized backlog of potential tasks we could implement next.

Please:
1. Suggest 8-10 valuable features/tasks, ordered by priority
2. Give each suggestion a clear title and 2-3 sentence description
3. Explain the business value each would provide
4. Indicate any dependencies between suggestions
5. Estimate relative complexity (Small/Medium/Large)

Note: These are backlog suggestions, not final task numbers. Tasks will be numbered sequentially as we implement them (task1.md, task2.md, etc.).

Focus on suggestions that build incrementally toward core user value.
```

Example prompt 2 (task file creation, copy-paste):

```
You are acting as a Product Owner. We've decided to implement ### as our next task.

Task: Create the task file for the next sequential task number.

Please:
1. Check current_architecture.md to see which task number is next (look at task history)
2. Write a complete taskX.md file following the template structure (where X is the next number)
3. Include specific, testable acceptance criteria
4. Identify which acceptance criteria should be automated tests
5. Ensure the task is small enough to complete in one increment
6. Check if this task refinement reveals any changes needed to requirements.md or target_architecture.md - if so, update them before finalizing the task

Do not write any code or example code yet - just create the task file for review.
```

## Step 5: Implementation

Here we actually implement the planned task. The AI agent takes the role of **Programmer**. Implementation proceeds with careful attention to quality and the Definition of Done.

1. **Implementation** – When the vibe coder decides the task is ready, they give the command to implement to the AI agent. The AI agent carries out the work, ensuring that the project builds, all relevant tests pass, and the definition of done is satisfied.
2. **Documentation Update** – As part of the task, the current_architecture artifact is updated.
3. **Task File Update** – The AI agent documents all changes made, including which files were modified, created, or deleted.
4. **Review and Check-in** – The vibe coder reviews the implementation, validates that all acceptance criteria are met, checks code quality, and ensures tests are meaningful. If accepted, the work is committed to the repository.

Example prompt (implementation, copy-paste):

```
You are acting as a Programmer. I want you to implement the requirements written in taskX.md

Read everything written in the the project files: guidelines.md, requirements.md, target_architecture.md, current_architecture.md and definition_of_done.md to understand the current project state.

Please:
1. Implement the feature/changes from the task file
2. Satisfy all acceptance criteria from the task file
3. Ensure all Definition of Done requirements are met (all commands mentioned in the file had to be executed for the current version of the code)
4. Update current_architecture.md with new features and file changes. Reference the task in the task history, but avoid references to the task in other parts of the document. The document should describe the current state regardless of the last task.
5. Update the task file with implementation notes and file changes
6. If you encounter an unexpected blocker you should stop the development and ask for help. Do not take shortcuts to finish the tasks (like not passing tests, ignoring warnings or errors or doing workarounds)
```

Example prompt for review:

```
Here are some points that still need work:
-
-

Please:
1. Go through the list of open points and finish the work
3. Ensure all Definition of Done requirements are met (all commands mentioned in the file had to be executed for the current version of the code)
4. Update current_architecture.md if needed
5. Update the task file with implementation notes if needed
6. If you encounter an unexpected blocker you should stop the development and ask for help. Do not take shortcuts to finish the tasks (like not passing tests, ignoring warnings or errors or doing workarounds)
```

## Step 6: Retrospective

After each task, there may be a short retrospective. In this step we review whether the process or any artifact needs to change. Requirements, architecture, definition of done, documentation, or task files may all be adjusted. The retrospective ensures that the process itself improves along with the product.

Prompt suggestion (copy-paste):

```
You are acting as a Retrospective Facilitator. Read the last 3-5 completed task files from project-management/tasks/ and project-management/guidelines.md.

Your task: Facilitate a process improvement retrospective.

Please:
1. Analyze what went well and what could be improved in recent tasks
2. Identify any recurring issues or bottlenecks
3. Suggest 2-3 concrete process improvements
4. Recommend updates to any artifacts (requirements, architecture, DoD, guidelines) if needed
5. Propose metrics to track improvement in the next iteration

Focus on actionable improvements that maintain quality while increasing development velocity.
```

## Summary

The workflow begins with requirements and architecture, sets a definition of done, and then advances through planning and implementation cycles. Each cycle produces working software, updates artifacts, and keeps tests green. Artifacts provide continuity: they preserve context, make switching agents possible, and ensure that both the system and the process move forward in small, reliable increments.
