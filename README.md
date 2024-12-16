# What is this?

DidTheyEat is a mobile application designed to help pet owners manage and track their pets' feeding schedules. Currently, the app allows users to log and sync the times when their pets have been fed.

The app is in its first release patch, and while the core features are functional, there is still much to be developed. Future plans include adding reminder notifications, feeding history logs, and the ability to upload photos of pets and their communities.

At the moment, the app is missing its main app icon and several assets that need to be created. Additionally, the profile page is in its early stages and requires further design and content.

The backend is built with Django, ensuring a robust and scalable API to handle user data securely via async encryption. On the frontend, I used React Native CLI to develop the mobile app, prioritizing minimal library usage to keep the app lightweight and efficient. This approach allows for smooth performance on both Android and iOS platforms while ensuring the app stays fast and responsive.


# Installation:

    #Back-end:
        Install Python
        Navigate to the backend where manage.py is located cd backend/backend
        Create and activate a virtual environment ( ex: python -m venv .venv ) and activate it ( .venv\Scripts\activate )
        Install dependencies via requirements.txt ( pip install -r requirements.txt )
        copy .env.local and rename it .env following the instructions inside said file
        Run migrations and start the server ( python manage.py migrate & python manage.py runserver )

    #Front-end:
        Install node and react-native-cli ( npm install -g react-native-cli )
        Move into mobile folder and install packages ( npm install )
        Copy .env.local and follow the instructions in it
        Setup your emulator and run the app ( npm run start )

# TO-DO:

- route back if a user removes itself from a community

- 401 when a user that doesnt exist tries to login

- Pet and Community limit (when reaching a high level of pets suggest to group them)

- can create frontend empty name community

- clean

- add backend checks for email register

- add google login

- favorite feature

- camera for taking pictures of the pets

- hide/dont hide password, password and email confermation amd recover mail or password

- notifications

- "Billboard" mode

- router in urls.py?

- cookies?

- when token is invalid the refresh returns a default error (try it on bruno)

- fix tests

- handle rotation