﻿import { GetUserEmail } from "/static/js/api/crud/get.js";
import { Logout } from "/static/js/api/crud/post.js";

// ================================ || Update User State - HTMl - Show Hide Login - Register etc. || ===========================================================
export async function UpdateUserHtml()
{
    var resPrommise = await GetUserEmail(); // #1 - Responce from the fetch api
    var userEmail = '';

    // # 2 - Extract the Email from the Response
    userEmail = await resPrommise.json().then(content => // Check the response content
    {
        if (content != null)
        {
            return content['email']; // Return email from the responce
        }
        return '';
    });


    var userContainer = document.getElementById('userHtml');  
    if (userEmail!='')
    {
       userContainer.innerHTML = 
           `<a id="profile" href="/Profile" onclick="" data-link>${userEmail}</a>
           <a id="logout" href=""> Log Out</a >`;
        document.getElementById('logout').onclick = function () { return Logout(this, event);};
    }
    else
    {
        userContainer.innerHTML =
            `<a href="/Register" onclick="" data-link>Register</a>
                    <a href="/Login" onclick="" data-link>Log In</a>`;
    }
}















// ============== || Get User DATA - Populate Update - Form|| =======================================================================================
export async function PopulateUpdateForm(formID)
{
    var currentForm = document.getElementById(formID);  // Get the form   
    var resPrommise = await GetUserData();  // Get responce
 

     // populate the Form
     await resPrommise.json().then(content => // Check the response content
    {
         if (content != null)
         {
             currentForm['email'].value = content['email'];
             currentForm['firstname'].value = content['firstname'];
             currentForm['lastname'].value = content['lastname'];
             if (content['age'] != 0)
             {
               currentForm['age'].value = content['age'];
             }
             currentForm['phonenumber'].value = content['phonenumber'];
         }
    
             return;
    });
}










//// Listen for Location Change - Record Previouse URL
//var prevUrl = '/';
//window.addEventListener('locationchange', function () {
//    prevUrl = window.location.href;
//});