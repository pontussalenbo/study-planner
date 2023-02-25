# Todos For Study Planner UI

Here things that need to be done for the study planner UI are listed. This is a living document and will be updated as the project progresses.
Please add todos to the list if you think something is missing.
Problematic todos are marked with a `?` and should be discussed before being implemented.

The areas and subtasks are not listed in any particular order of priority. Some of them are more important than others, but they are all importan. Some problems are mutually exclusive, thus can be worked on in parallell whereas some tasks are progessively fullfilled and can not simply be removed once _"completed"_.

## Functionality

Directly related to the functionality of the application.
Can be missing functionality or bugs related to the UI or UX.

### Table

- [ ] Add a filter "search box" by course_code
- [ ] Dropdown for masters and programme
- [ ] Class-specific filter
  - [ ] Make `masters` and `class` filters compulsory

### Chart (Study Plan)

- [ ] Fix bug where a course is added to the study plan multiple times
- [ ] Add a button to remove courses from the study plan
- [ ] Save to localstorage (?)

### New Components

- [ ] Add component summarzing to the study plan
  - [ ] Total Points
  - [ ] Total Points inside masters
  - [ ] A-points inside masters

## Misc

Miscellaneous tasks that are not directly related to the functionality of the application.

- [ ] Add a favicon
- [ ] Refactor constants to a separate file(s)
- [ ] Remove _sensitive_ db code from repo
- [ ] Functional component testing
- [ ] E2E testing when needed
- [ ] Refactor helper functions to utils
- [ ] Add more components to standardize the code

## Styling

CSS or component styling related tasks.

- [ ] Organize placement of components when creating studyplan
- [ ] One Table for each year?
- [ ] RESPONSIVENESS
- [ ] Multiple pages for small screen?
- [ ] dark mode? theme?

## Data Queries

Which data related quieres are needed for the application to function.
Furthermore what data is needed for each component, why its needed and how it should be represented.

- [ ] Table needs courses with data columns corresponding to the following:
  - JSON response holding an Array of Objects containing the properties: `Course code`, `Credits`, `Level`, `Course name`
- Above response needs to be filterable by `Programme`, `Master` and `Class`
  - `Class` and `Programme` are compulsory filters, while `Master` is optional as it is a subset of `Programme`. Main reason for this filter is to ease the process of adding courses to a class if you need points in a specific master.
- [ ] When a course is added to the study plan, the following data properties are needed:
  - `Course code`, `Credits`, `Level`, `Course name`, `Programme`, `Masters`, `Class`.
    - `Masters` is a list of masters that the course belongs to.

## Documentation

- [ ] Add a README for the project and each module
- [ ] Document the code
- [ ] Typedoc?
- [ ] BUY ME A COFFEE
