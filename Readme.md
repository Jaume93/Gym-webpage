# GYM v1.0

This is the third project of Let's Coder Bootcamp.     
This project is dedicated to represent a Gym webpage with its functions and utilities.    
    
The Technologies used in this website are the following:

- HTML
- CSS
- Postman
- JavaScript
- Node js

## Utilities of the page
First of all the user can interact with the gym webpage by **singning in** or **loging in** in case it would have a membership. Then it can select **membership fee** that fits better to its needs depending on services or activites. After the user has signed in and selected a membership fee, the member can **book different activities** to do during the day.

## Backend   
The backend of the project is based in Node.JS directed with *Express*.   
Data Base is hosted in *Mongo Atlas* and called by *mongoose*.   
Some data base (passwords) are encrypted by *bcrypt* and private routes are protected with *jsonwebtoken*.

### Relationship Schema
![relationship schema](https://user-images.githubusercontent.com/83576037/122210863-65a2e780-cea6-11eb-82ba-12ed81057bbf.jpg)

### Endpoints
#### Member    
*/members/*

*/members/signin*  

*/members/login*   

*/members/yourInfo*    

*/members/modifyAccount*   

*/members/removeAccount/*    

   
#### Membership Fees
*/membershipFees/*  

*/membershipFees/create*   

*/membershipFees/modify/:id*   

*/membershipFees/delete/:id*   

#### Activities   
*/activities/*  

*/activities/find*:id*   

*/activities/yourActivities*    

*/activities/:id/signupActivity*   

*/activities/:id/dropoutActivity*    

*/activities/resetPartakers*   

*/activities/create*    

*/activities/modify/:id*    

*/activities/remove/:id*     

#### Services    
*/services/*  

*/servicesfind*:id*   

*/services/yourServices*     

*/services/resetPartakers*   

*/services/create*    

*/services/modify/:id*    

*/services/remove/:id*  
   

