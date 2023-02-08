## User Stories
- As a student who frequently has to work on group projects, I want my team to be able to coordinate tasks and deadlines so that we can complete the project more efficiently.
- As a project manager for a team, I want my team to have a way to visualize progress on the project so that I can motivate my team to complete their tasks in a timely manner.
- As a team leader, I want a way to easily assign tasks to a group of people rather than assigning tasks individually so that I can save time
- As a professor, I want the students working on the group projects I assign to each complete a fair share of the work so that all the work doesn't fall on one person.
- As the owner of a company, I want my workers to securely access their assigned tasks by logging in to a project so that sensitive project info cannot be accessed by anyone else.

## What issues your team planned to address
### Frontend

We wanted to set up a login page, a sign up page for general users, a sign up page for team managers, an info page for general information on the website, and a blank user homepage where that user's tasks will be displayed. We wanted to correcty route the user to each separate page and provide input fields that we could connect to the backend later.

### Backend

We wanted to set up a database that stores information about a user like their name, email, and phone number. Their section of the data in the database will be reserved once they sign up and input their information. Once this is set up, it will allow for our webpage to display personalized data that are specific to the user once they login. 

## Which ones were successfully completed
### Frontend

We were able to lay out the basics of each page besides the blank homepage. We have tabs that link to each page and the general sign up/login input fields for each respective user type (team manager and team member). 

### Backend

We we were able to successfully set up a local database that stores users information from the console into a JSON object. This JSON object with data will then be sent to the frontend to be displayed.

## Which ones didn't and why?
### Frontend

We did not set up the route to the blank homepage because we are still planning out the different ways the user can take to reach their homepage, but plan to do this for the next sprint. Also, although we implemented the basics of each page, everything we have is filler and does not look good. We decided to focus more on getting things to show up to the screen rather than making them look good. Next sprint, we will remake each page using Angular Material rather than HTML and will replace the filler text on the info page with a better looking placeholder.

### Backend

The thing we were not able to complete successfully was set up a cloud database which was what we were planning on doing originally. We thought it would be easier to first set up a local database and ensure that data can be saved locally and subsequently displayed to the frontend. Nonetheless, setting up a cloud databse is what we have planned for future sprints.
