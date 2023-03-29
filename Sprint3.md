# 1. Detail work you've completed in Sprint 2
### Frontend
This sprint, we started implementing the main features of our app that would be displayed on the main page. These features are:
- Navigation bar
	- This is a new navigation bar that replaces the one that was on the login/sign-up/home page once the user logs in.
	- Displays the name of the project
	- Displays a progress bar that illustrats the completion status of the user's assigned tasks
	- Includes buttons for Timeline and Sign Out
	- Includes a sidebar button that can be pressed to reveal the sidebar
- Sidebar
  - Revealed by pressing the hamburger icon in the navigation bar
  - Includes the options to Add New Task, Manage Member Tags, and Sign Out
  - Can be closed by preassing the menu icon a second time
- Task Cards
  - One card for each task laid out in a vertical list format
  - Includes information about each task such as
    - Title
    - Due Date
    - Completion Status
    - Tag list
    - Details Button
- Task Details Modal
  - Allows users to edit tasks that have already been created
  - Opened up when the user clicks the "Details" button on a task card
  - We have not finished implementing this feature
  - Will be reused in our Add Task feature, which allows the user to create a new task
- Progress Cards
  - One card for each member who is part of the same team
  - Includes each team member's name and displays a progress bar that indicates that person's progress with their tasks

### Backend
This sprint, we started working on the get calls of our api so the front end is able to use the information from the back end to do certain tasks:
The first task we worked on was getting the login page to correctly work. When the user types in their username the front end will call the backend to see
if that username exists within the database. If it does not then it will throw an error. This is the same case for the password. If the username exists
but the password entered was wrong, then it will throw an error. If both username exists and the password entered was correct then the login will be
successful. The last task we worked on but did not finish was displaying the specific user data once they login. We are currently in the process of 
transferring this data between the components.

# 2. Frontend Unit Tests
# 3. Backend Unit Tests
# 4. Backend API Documentation
In order to use our api you must run the main.go file in your terminal by typing go run main.go. It should then be running on localhost 3000. Our api currently consists of three main methods: getUsers, getUserByUsername, and post. Get users returns a list of every single user in json format stored in the backend and can be accessed using the link localhost:3000/users. Get user by username allows you to look up a specific user by their username and returns that users data in json format. It can be accessed using the link localhost:3000/users/:username with username being the specific username you want to look up. Finally, post allows someone to add a user to the backend database. It takes two parameters the first is the link which is http://localhost:3000/users and the second is the user object itself. The backend expects every user object to contain a username, name, email, phone nmber, password, and project join code property so ensure that the user object you are passing in contains those properties or else post will not add the user properly. When looking for a valid login you must pass in username and password parameters into the call request
so it can check whether a specific user exists in the backend.


