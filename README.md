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

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/studyplannerLTH)



## About
> When we sat down and tried to plan our master years here at LTH, we found the process to be mildly (very) confusing and tedious (endless soup of excel sheets...). Taking into account the rules of what courses may be included, the credits and level requirements, AND on top of that finding interesting courses to fill up the entire years in order to construct a comprehensive schedule!? 

So basically, we built an app to simplify the process of planning your masters studies, hopefully making the average LTH student's life easier :)

This project is devolped and maintained by [Pontus Salenbo](https://github.com/pontussalenbo) and [Andreas Bartilson](https://github.com/IIAndreasII), it is idealistic, non-profit and open-source. We are not affiliated with Lund University or LTH in any way. We are just a couple of students who want to help other students. If you like the application and want to support us with the fees associated with hosting, domain etc. please consider buying us a coffee! :)

## Roadmap

### User Interface (React App)
#### Functionality

- [x] Select Programme and Class at the very top.
- [x] Filter by  | Class/Year  | By master (optional) | [get courses]
- [ ] Navbar fixed at top with scroll click and GH + BMCs links
- [ ] Sort table rows (asc/desc) by clicking on column headers

#### Design

- [x] Make tables look less stretched out (grid issue)
- [x] Search field looks a bit compressed(?)
- [ ] Align items flex end for bar charts
- [ ] Color row green when a master is fulfilled

#### Others

- [x] Make context dispatch more efficient (useReducer?)
- [x] Fix Todos with real filters
- [ ] Loading spinner (?)


### Backend
- [ ] Generate excel file for study plan
- [ ] Error logging for frontend

### Misc
- [ ] Update READEME's
- [ ] Add License [[#30](https://github.com/pontussalenbo/study-planner/issues/30)]