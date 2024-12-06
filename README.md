# DidTheyEat
DidTheyEat is a web application designed to help pet owners track and manage their pet's feeding schedule. The app provides reminders, logs feeding history, and allows multiple users to collaborate on feeding tasks, ensuring that pets are fed on time and avoiding overfeeding. 


# TO-DO:

- 401 when a user that doesnt exist tries to login

- Pet and Community limit (when reaching a high level of pets suggest to group them)

- add google login

- add backend checks for email register

- favorite feature 

- backoff font

- fix tab layout (expecially for tablet)

- Set a timer logic (with selectable time) that resets the "fed" field when loading the community pets

- camera for taking pictures of the pets

- loading background and image

- remove alerts

- dependencies that are not getting used currently

- hide/dont hide password, password and email confermation amd recover mail or password

- notifications

- "Billboard" mode

- router in urls.py?

- cookies?

- when token is invalid the refresh returns a default error (try it on bruno)

- fix tests

- handle rotation

# NOTES
Mind that if a JSON {"fed": "true"} the fed_at time will update

reanimated works only on android right now, eact-native-reanimated—require configuration in the native Android and iOS environments to fully integrate.

# INSTRUCTIONS
Change baseUrl in axiosInstance, will change it later