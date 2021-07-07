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
GET   
*/members/*  --> This is a private route for Admins. It gets all members registered in the Gym's webpage and provide all information (Name, Last Name, Email, Membership Fee) excluding password.

*/members/yourInfo*  --> This is a private route for logged in users. It gets information of **Name, Last Name, Email and Membership Fee** excluding password.

POST   
*/members/signin*  --> Non private route. Allow to sign in to the Gym by providing a valid **Name, Last Name, Email, Password and Membership Fee**

*/members/login*  --> Non private route. Allow to the user to Log in. To log in it is required to enter with the email and pasword that user signed in before.

PUT  
*/members/modifyAccount*  -->  Private Route for the member. This allow to **modify email, password and membership fee**. It cannot be changed none of them if it was the same as previous.

DELETE   
*/members/removeAccount/*  -->  This is a private route to **unsubscribe** from the Gym facilities.

   
#### Membership Fees   
GET    
*/membershipFees/*  --> This is not a private route. It gets all membership fees of the Gym and **provide Name of the fee and Pvp**.
   
POST    
*/membershipFees/create*  --> This is a private route only for Admins. It can **create membership fee** with its Name and Pvp.
   
PUT  
*/membershipFees/modify/:id*  -->     

DELETE   
*/membershipFees/delete/:id*  --> This is a private route only for Admins to **delete** a membership fee.   

#### Activities  
GET   
*/activities/*  -->  This is not a private route. It gets only **name, duration and start time** information of the activities.

*/activities/find*:id*  -->   

*/activities/yourActivities*  -->   

POST   
*/activities/create*  -->    

PUT   
*/activities/:id/signupActivity*  -->   

*/activities/:id/dropoutActivity*  -->    

*/activities/resetPartakers*  -->   

*/activities/modify/:id*  -->      

DELETE   
*/activities/remove/:id*  -->     

#### Services   
GET   
*/services/*  -->  This is not a private route. It gets only **name, description** information of the services.

*/servicesfind*:id*  -->   

*/services/yourServices*  -->     

POST   
*/services/create*  -->    

PUT   
*/services/resetPartakers*  -->   

*/services/modify/:id*  -->    

DELETE   
*/services/remove/:id*  -->  
   


### TO DO    
- Finish Home page (hide button subscribe when user is logged in)

- Sort Activities by hours

- Add route to see only the activities the member can do by it member Fee.

- Routes admin:   
 * * Create activity / service / membership Fee
 * * Modify activity / service / membership Fee
 * * Upgrade a Member to be Admin

- Implement a success/wrong messages at Log in & Sign Up / already signed up at activity & try to quit an activity when not signed in.

- Modify personal info (email, password, membership Fee, Unsubscribe)

- Implement loader

- Error at Log Out when its done in Member profile.

- Finish style webpage & mediaQuery
