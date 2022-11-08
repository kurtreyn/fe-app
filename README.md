# Take Home Test from Fetch Rewards

## by: Kurt Reynolds

### created with React.js using React Bootstrap

---

https://fetch-hiring.s3.amazonaws.com/frontend.html

---

---

https://kurtreyn.com

---

### GET Request

- create async function fetchForm
- fetch data from API using GET method
- convert response into JSON object
- if response was successful (data present)
- - map the occupations array and insert results to the Form.Select element with id of "occupatiions". Clicking on that particular element triggers the fetchForm function.
- - use similar process for the states array:
- - - create variable stateArray and set equal to data.states
- - - map over stateArray and insert results into Form.Select element with id of "states".

## POST Request

- create async function submitForm using POST method
- set headers & body as an object
- use a callback function to log a message to the console that the post was successful, along with the response from the server
- if the status result is 201, reset states and display a message to the user
- if status was unsuccessful, display message to user that the submission was unsuccessful
- catch and log any errors
- create function findFormErrors which lists that conditions that must be met in order for the form to be submitted
- - the handleSubmit function calls the findFormErrors function to search for errors before proceeding the execution of submitting the POST request.
- errors will be displayed to the user upon an unsuccessful submission
