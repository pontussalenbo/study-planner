<!--
  ~ Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
  ~
  ~ This program is free software: you can redistribute it and/or modify
  ~ it under the terms of the GNU General Public License as published by
  ~ the Free Software Foundation, either version 3 of the License, or
  ~ (at your option) any later version. See the included LICENSE file for
  ~ the full text of the GNU General Public License.
-->

<p align="center">
  <a href="https://studyplanner.se"><img src="https://github-production-user-asset-6210df.s3.amazonaws.com/45301555/242436813-54269264-13b7-42db-af82-47c39b48c8ba.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230531%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230531T233337Z&X-Amz-Expires=300&X-Amz-Signature=7db8c76f354b49d5c5bdeb4c74c91302bb98732bd8f359266853710197aff43e&X-Amz-SignedHeaders=host&actor_id=45301555&key_id=0&repo_id=590166546" alt="Logo" height=170></a>
</p>

<h1 align="center">Study Planner</h1>

We regret to inform you that this project has been deprecated due to insufficient time for its proper development and maintenance. Our primary focus has shifted towards our academic responsibilities and graduating, which has consumed the majority of our time and efforts. We highly recommend using the excellent app available at studyplan.se, created by fellow students who share a passion for web development. Their dedication and expertise have resulted in a robust and effective tool for study planning :)

## About
>
> When we sat down and tried to plan our master years here at LTH, we found the process to be mildly (very) confusing and tedious (endless soup of excel sheets...). Taking into account the rules of what courses may be included, the credits and level requirements, AND on top of that finding interesting courses to fill up the entire years in order to construct a comprehensive schedule!?

So basically, we built an app to simplify the process of planning your masters studies, hopefully making the average LTH student's life easier :)

This project is devolped and maintained by [Pontus Salenbo](https://github.com/pontussalenbo) and [Andreas Bartilson](https://github.com/IIAndreasII), it is idealistic, non-profit and open-source. We are not affiliated with Lund University or LTH in any way.

 We are just a couple of students who want to help other students. If you like the application and want to support us with the fees associated with hosting, domain etc. please consider buying us a coffee! :)

## Getting Started

This project is based on React and TypeScript for the UI and C# dotnet for the backend. The easiest way to get started is to use Docker to set up the complete runtime environment. This requires you to have [Docker](https://www.docker.com/) installed locally on your machine.

To get started with Docker, run the following in your terminal of choice:

```bash
source common/scripts/env.sh
```

And you should be good to go! The frontend application should now be running on [localhost:5173](http://localhost:5173/) whereas the backend should be running the HTTP instance on [http://localhost:5085](http://localhost:5085/) and the HTTPS on [https://localhost:7266](https://localhost:7266).

If you want to run the application locally without Docker, you need to set up the runtime environment yourself. See the [Prerequisites]((#prerequisites)) section for more information.

### Prerequisites

* [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
* [pnpm](https://pnpm.js.org/) - Package manager used for frontend
* [PostgreSQL](https://www.postgresql.org/) - Open source relational database used for backend
* [Docker](https://www.docker.com/) - Containerization platform used for setting up the complete runtime environment
* [PGAdmin](https://www.pgadmin.org/) - PostgreSQL administration and development platform. GUI for the database (optional)

**HINT**: For Installing pnpm, run the following in your terminal of choice:

```bash
npm install -g pnpm
```

### License

StudyPlanner is [GPL licensed](./LICENSE).
