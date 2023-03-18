# ChatBot

This is a web app for a restaurant that utilizes a chatBot interface

---

## Requirements for the chatBot

1. User should see the below options on landing on the chatBot page<br>
   a select 1 to place an order<br>
   b select 99 to checkout order<br>
   c select 98 to see order history<br>
   d select 97 to see current order<br>
   e select 0 to cancel order 
2. The chatBot should return a list of items from the restaurant when the user selects 1 
3. The chatBot should respond with 'order placed' when the user selects 99 or 'no order to place' if there are no orders 
4. The chatBot should return all placed order when the user selects 98 
5. The chatBot should return a  the current order when the user selects 97   
6. The chatBot should cancel order if there is any when the user selects 0 


---

## Setup

- Install NodeJS, mongodb
- pull this repo
- update env with example.env
-  run `npm install` to install packages
- run `npm start` to start server

---

## Base URL

- <p><a href="https://chatbot-y67d.onrender.com">click here to view deployed site</a></p> 

## Backend

### Models

---

#### users

| field      | data_type | constraints |
| ---------- | --------- | ----------- |
| id         | string    | required    |
| created_at | date      | optional    |
| username   | string    | optional   |



#### items

| field        | data_type            | constraints                |
| ------------ | -------------------- | -------------------------- |
| id           | string               | optional                   |
| name         | string               | required                   |
| price        | number               | required                   |


#### orders

| field        | data_type            | constraints                |
| ------------ | -------------------- | -------------------------- |
| id           | string               | optional                   |
| created_at   | date                 | optional                   |
|total_price   | number               | required                   |
|  items       | array                | optional                   |


### store meal in database

- Route: /meal
- Method: POST
- Body:

```
{
  "name": "pasta",
  "price": 5000,
  
}
```

- Responses

Success

```
{
  "name": "pasta",
  "price": 5000,
  "_id": "641589b4b7b1bd4a59b93fdf",
  "__v": 0
}
```



## frontend

### Enter a username


![enter a username](/frontend/public/assets/Screenshot%20(8).png)


### click the message icon


![click the message icon](/frontend/public/assets/Screenshot%20(9).png)


### follow the prompt messages

![follow the prompt messages](/frontend/public/assets/Screenshot%20(10).png)


![follow the prompt messages](/frontend/public/assets/Screenshot%20(11).png)


![follow the prompt messages](/frontend/public/assets/Screenshot%20(12).png)


## Contributor

- Adediran Kehinde