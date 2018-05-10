# React Website Checklist

This project is in the process of being made while first learning react. It ties in with google's Firebase database that updates in real-time so I can have my own personalized checklist, with the ability to add more, for use at work and on the side.

## Dependencies
<ol>
<li>React</li>
<li>React router</li>
<li>Firebase</li>
</ol>

## TODO
<ul>
<li>Learn more about react and firebase, best way to tie them together</li>
~~Have a main page that contains all the created checklists~~
~~Create pages (routes) for checklists~~
<li>Ability to remove checklists once completed</li>
~~Have checklists reference the same template based on the project selected~~
<li>Fix the styling and layout of the checklist single page</li>
<li>Add ability to remove the checklist once it is completed</li>
<li>Maybe find a way to add more fields / remove certain fields per instance</li>
</ul>

### Status

<ul>
<li>Got firebase working and im able to save unique checklists bound by userIDs</li>
<li>This is a per person instance so it will be based purely on your google account login id</li>
<li>Each checklists references a single template route that has the ability to update their fields invidually and write to the database for that list</li>
</ul>