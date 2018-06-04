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
<li>Fix the styling and layout of the checklist single page</li>
<li>Break nav into its own component</li>
<li>Have the ability to select the type of checklist you need. EX: web dev, SEO, ppc etc..</li>
<li>Add section for notes under the individual checklist (section for input field / textarea)</li>
</ul>

### Status

<ul>
<li>Got firebase working and im able to save unique checklists bound by userIDs</li>
<li>This is a per person instance so it will be based purely on your google account login id</li>
<li>Each checklists references a single template route that has the ability to update their fields invidually and write to the database for that list</li>
<li>Can remove checklists</li>
<li>Can add / remove fields per checklist</li>
</ul>