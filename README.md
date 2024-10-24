# DidTheyEat
DidTheyEat is a web application designed to help pet owners track and manage their pet's feeding schedule. The app provides reminders, logs feeding history, and allows multiple users to collaborate on feeding tasks, ensuring that pets are fed on time and avoiding overfeeding. 


# TO-DO:
1- expand user model and add a soft delete for recovering accounts

    - add google login

    - expand user enabling soft delete (fields: is_active, name, surname etc.)
    (https://medium.com/@karimdhrif4444/mastering-user-management-comprehensive-guide-to-extending-djangos-user-model-51c2ccd793d4)

2- "Billboard" mode

3- add tests and use Bruno for testing (adding the file in the git repo)

4- JWT is currently not verifying, change to verify the signature. Also ProtectedRoute should be moved do context and beeing hooked. context is just a name we use a provider

5- Check create pet for when creating a pet inside a community

6- router in urls.py?

# NOTES
Mind that if a JSON {"fed": "true"} the fed_at time will update