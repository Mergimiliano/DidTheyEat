# DidTheyEat
DidTheyEat is a web application designed to help pet owners track and manage their pet's feeding schedule. The app provides reminders, logs feeding history, and allows multiple users to collaborate on feeding tasks, ensuring that pets are fed on time and avoiding overfeeding. 


# TO-DO:

- Try to fix / Ask professor about Snyk vulnerability

- add a soft delete for recovering accounts

    * add google login

    * expand user enabling soft delete (fields: is_active, name, surname etc.)
    (https://medium.com/@karimdhrif4444/mastering-user-management-comprehensive-guide-to-extending-djangos-user-model-51c2ccd793d4)

- add backend checks for email as username and for other stuff

- backoff font

- handle resetting fed status and connected fields via adding a time field (default is 24h) that can be changed and its used for calculations ex. when pet is loaded current time-fet_at <=time reset

- notifications

- "Billboard" mode

- Check create pet for when creating a pet inside a community

- Set a timer logic (with selectable time) that resets the "fed" field when loading the community pets

- router in urls.py?

- cookies?

- camera for taking pictures of the pets

# NOTES
Mind that if a JSON {"fed": "true"} the fed_at time will update
