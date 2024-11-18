# DidTheyEat
DidTheyEat is a web application designed to help pet owners track and manage their pet's feeding schedule. The app provides reminders, logs feeding history, and allows multiple users to collaborate on feeding tasks, ensuring that pets are fed on time and avoiding overfeeding. 


# TO-DO:

- Pet and Community limit (when reaching a high level of pets suggest to group them)

- add google login

- add backend checks for email register

- backoff font

- Set a timer logic (with selectable time) that resets the "fed" field when loading the community pets

- notifications

- camera for taking pictures of the pets

- stack navigation of login and register going infite if clicking on link ("Dont have an account etc.")

- if logout succesfull check if no tokens, if not tokens go to getStarted

- "Billboard" mode

- router in urls.py?

- cookies?

- when token is invalid the refresh returns a default error (try it on bruno)

- fix tests

# NOTES
Mind that if a JSON {"fed": "true"} the fed_at time will update
