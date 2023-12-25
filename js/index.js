//show initial values
window.onload = function(){
    //deleteUser();
    headerName();
    totalOrganization();
    chart();
    totalUsers();
    totalDonations();
    headerName();
    picture();
}

let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

let modal = document.getElementById("login-Modal");
let signDirect = document.getElementById("sign-up-redirect");
let loginDirect = document.getElementById("login-up-redirect");
//let aboutButton = document.getElementById("about-btn");
let modal2 = document.getElementById("signup-Modal");
let modal4 = document.getElementById("organization-Modal");
let blurr = document.getElementById("blur");

// Get the button that opens the modal
var btn = document.getElementById("login-btn");
var btn2 = document.getElementById("signup-btn");
var btn4 = document.getElementById("organization-btn");

// Get the <span> element that closes the modal
var span4 = document.getElementsByClassName("organization-close")[0];

// When the user clicks on the button, open the modal
// signDirect.onclick = function () {
//   modal.style.display = "none";
// }
// loginDirect.onclick = function () {
//   modal2.style.display = "none";
// }
// heroDonationButton.onclick = function() {
//   modal.style.display = "block";
// }
// aboutButton.onclick = function() {
//   modal.style.display = "block";
// }
function opener1() {
  topFunction();
  modal.style.display = "block";
}
function orgopen() {
  modal4.style.display = "block";
  blurr.style.display = "block";
}

btn2.onclick = function() {
    modal2.style.display = "block";
}
btn4.onclick = function() {
  modal4.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closer1() {
  modal.style.display = "none";
}
function closer2() {
    modal2.style.display = "none";
  }
function orgclose() {
    modal4.style.display = "none";
    blurr.style.display = "none";
  }


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
window.onclick = function(event) {
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
}
window.onclick = function(event) {
    if (event.target == modal4) {
      modal4.style.display = "none";
    }
}

function recform() {
  window.location.href = "./receiver_form.html";
}

function insertIntoObject(obj, key, value) {
    if (userTemplate.hasOwnElement(key)) {
        obj[key] = value;
    }
    else{
    obj[key] = value;
    }
}

function login() {
    
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const emailErrorMessage = document.querySelector('#p-one');
  const passwordErrorMessage = document.querySelector('#p-two');
  let flager = 0;

      if (emailInput.value ===  '') {
          emailErrorMessage.innerHTML = 'please enter a valid email';
          emailErrorMessage.style.color = 'red';
      }else if (emailInput.value !== ''){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let result = emailRegex.test(emailInput.value);
        if(result == true){
          emailErrorMessage.innerHTML = ' valid email';
          flager++;
          emailErrorMessage.style.color = 'green';
        }else if(result == false){
          emailErrorMessage.innerHTML = 'please enter a valid email';
          emailErrorMessage.style.color = 'red';
        }
      }
  
  
       if(passwordInput.value === ''){
          passwordErrorMessage.innerHTML = 'please enter a valid password';
          passwordErrorMessage.style.color = 'red';
      }else if (passwordInput.value != ''){
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let passwordResult = passwordRegex.test(passwordInput.value);
  
        if (passwordResult == true) {
          passwordErrorMessage.innerHTML = ' valid password';
          passwordErrorMessage.style.color = 'green';
          flager++;
        } else if(passwordResult == false){
          passwordErrorMessage.innerHTML = ' please enter a valid password';
          passwordErrorMessage.style.color = 'red';
        }
      }

  if (flager == 2) {
          console.log(flager);
          console.log(emailInput.value, passwordInput.value);
          fetchDataFromBackend(emailInput.value, passwordInput.value);
  }
}
//Function to fetch data from the backend.
async function fetchDataFromBackend(param1, param2) {
  const backendURL = 'http://localhost:5050/';
  let data;

  try {
      console.log(param1, param2);

      const response = await fetch(`${backendURL}users/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: param1, password: param2 })
      });

      if (response.ok) {
          data = await response.json();
          console.log('Data from the backend:', data);

          // Assuming data.info is defined before using it
          console.log(data.info);

          if (data.info.user_role === 'admin') {
              localStorage.setItem('id', data.info.user_id);
              localStorage.setItem('username', data.info.name);
              localStorage.setItem('email', data.info.email);
              localStorage.setItem('password', data.info.password);
              localStorage.setItem('userrole', data.info.user_role);
              localStorage.setItem('url', data.info.url);
              window.location.href = "./a_dashboard.html";
          } else {
              localStorage.setItem('id', data.info.user_id);
              localStorage.setItem('username', data.info.name);
              localStorage.setItem('email', data.info.email);
              localStorage.setItem('password', data.info.password);
              localStorage.setItem('userrole', data.info.user_role);
              localStorage.setItem('url', data.info.url);
              window.location.href = "./u_dashboard.html";
          }
      } else {
          console.error('Error fetching data:', response.statusText);
          // Handle the error as needed, e.g., display a message to the user
      }
  } catch (error) {
      console.error('An error occurred:', error);
  }
}
function picture() {
  let url = localStorage.getItem('url');
  const side = document.getElementById("premium-imager");
  const top = document.getElementById("name-image");
  side.src = url;
  top.src = url;
}

function signup(){
  const nameInput = document.getElementById('signup-name');
  const emailInput = document.getElementById('signup-email');
  const passwordInput = document.getElementById('signup-password');
  const passwordConfirmation = document.getElementById('signup-password2');
  const emailErrorMessage = document.querySelector('#p-one');
  const passwordErrorMessage = document.querySelector('#p-two');
  const passwordConfirmErrorMessage = document.querySelector('#p-three');
  const nameErrorMessage = document.querySelector('#p-zero');
  let flager = 0;
  const role = 'admin';
  
  
    if (nameInput.value === '') {
      nameErrorMessage.innerHTML = 'please enter your name';
      nameErrorMessage.style.color = 'red';
    } else if(nameInput.value.trim().length < 3){
      nameErrorMessage.innerHTML = 'please enter a valid name';
      nameErrorMessage.style.color = 'red';
    }else{
      flager++;
      nameErrorMessage.innerHTML = 'valid name';
      nameErrorMessage.style.color = 'green';
    }
  

      if (emailInput.value ===  '') {
          emailErrorMessage.innerHTML = 'please enter a valid email';
          emailErrorMessage.style.color = 'red';
      }else if (emailInput.value !== ''){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let result = emailRegex.test(emailInput.value);
        if(result == true){
          emailErrorMessage.innerHTML = ' valid email';
          flager++;
          emailErrorMessage.style.color = 'green';
        }else if(result == false){
          emailErrorMessage.innerHTML = 'please enter a valid email';
          emailErrorMessage.style.color = 'red';
        }
      }
  
  
       if(passwordInput.value === ''){
          passwordErrorMessage.innerHTML = 'please enter a valid password';
          passwordErrorMessage.style.color = 'red';
      }else if (passwordInput.value != ''){
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let passwordResult = passwordRegex.test(passwordInput.value);
  
        if (passwordResult == true) {
          passwordErrorMessage.innerHTML = ' valid password';
          passwordErrorMessage.style.color = 'green';
          flager++;
        } else if(passwordResult == false){
          passwordErrorMessage.innerHTML = ' please enter a valid password';
          passwordErrorMessage.style.color = 'red';
        }
      } 
  
  
  
      if (passwordConfirmation.value === '') {
        passwordConfirmErrorMessage.innerHTML = 'Confirm password';
        passwordConfirmErrorMessage.style.color = 'red';
      }else if(passwordConfirmation.value != ''){
        const passwordRegex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let passwordResult2 = passwordRegex2.test(passwordConfirmation.value);
  
        if (passwordResult2 == true) {
          passwordConfirmErrorMessage.innerHTML = ' valid password';
          passwordConfirmErrorMessage.style.color = 'green';
          flager++;
        } else if(passwordResult2 == false){
          passwordConfirmErrorMessage.innerHTML = ' please enter a valid password';
          passwordConfirmErrorMessage.style.color = 'red';
        }
      }
      if (passwordConfirmation.value != passwordInput.value) {
        passwordConfirmErrorMessage.innerText = 'Confirm password again';
        passwordConfirmErrorMessage.style.color = 'red';
     }
     if(flager == 4){
      const name = nameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
      console.log(nameInput.value, emailInput.value, passwordInput.value, role);
      signupchecker(name, email, password, role);
     }

}
async function signupchecker(p1, p2, p3, p4) {
    const backendURL = 'http://localhost:5050/';
    let data;
    try {
        const response = await fetch(`${backendURL}users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: p1, email: p2, password: p3, user_role: p4})
        });
        if (response.ok) {
            data = await response.json();
            //console.log('Data from the backend:', data);
            //return data;
          } else {
            console.error('Error fetching data:', response.statusText);
            // Handle the error as needed, e.g., display a message to the user
          }
          console.log(data);
          alert("");
    } catch (error) {
    console.error('An error occurred:', error);
    }
}

async function deleteUser() {
  const errors = document.getElementById("node-error-message");
  const  userId = document.getElementById("mode-input").value;
  const  valuer = document.getElementById("mode-input");
 // const valuer = userId.value;
  if (valuer == '') {
    errors.innerHTML = "please enter a user id";
  }else{
    errors.innerHTML = "";
    valuer.value = '';
    const backendURL = 'http://localhost:5050/';
    console.log(userId);
    const response = await fetch(`${backendURL}users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
        const data = await response.json();
       console.log(data);
       errors.style.color = "green";
       errors.innerHTML = data.message;
    } else {
      console.error('Error deleting user:', response);
      errors.innerHTML = data.message;
      // Handle the error as needed, e.g., display a message to the user
    }
 }
 
  
}

async function deleteOrg() {
  const errors = document.getElementById("node-error-message");
  const  userId = document.getElementById("mode-input").value;
  const  valuer = document.getElementById("mode-input");
 // const valuer = userId.value;
  if (valuer == '') {
    errors.innerHTML = "please enter an organization id";
  }else{
    errors.innerHTML = "";
    valuer.value = '';
    const backendURL = 'http://localhost:5050/';
    console.log(userId);
    const response = await fetch(`${backendURL}campaigns/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
        const data = await response.json();
       console.log(data);
       errors.style.color = "green";
       errors.innerHTML = data.message;
    } else {
      console.error('Error deleting user:', response);
      errors.innerHTML = data.message;
      // Handle the error as needed, e.g., display a message to the user
    }
 }
 
  
}

async function revoke() {
  const errors = document.getElementById("node-error-message");
  const  userId = document.getElementById("mode-input").value;
  const  valuer = document.getElementById("mode-input");
 // const valuer = userId.value;
  if (valuer == '') {
    errors.innerHTML = "please enter a user id";
  }else{
    errors.innerHTML = "";
    valuer.value = '';
    const backendURL = 'http://localhost:5050/';
    console.log(userId);
    const response = await fetch(`${backendURL}users/revoke/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
        const data = await response.json();
       console.log(data);
       errors.style.color = "green";
       errors.innerHTML = data.message;
    } else {
      console.error('Error making user:', response);
      errors.innerHTML = data.message;
      // Handle the error as needed, e.g., display a message to the user
    }
  }
 
  // Replace with your actual backend API endpoint
  // fetch(`${backendURL}users/deleteUser/${userId}`, {
  //   method: 'DELETE',
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     alert(data.message);
  //   })
  //   .catch(error => console.error('Error deleting user:', error));
}

async function makeadmin() {
  const errors = document.getElementById("node-error-message");
  const  userId = document.getElementById("mode-input").value;
  const  valuer = document.getElementById("mode-input");
 // const valuer = userId.value;
  if (valuer == '') {
    error.innerHTML = "please enter a user id";
  }else{
    errors.innerHTML = "";
    valuer.value = '';
    const backendURL = 'http://localhost:5050/';
    console.log(userId);
    const response = await fetch(`${backendURL}users/makeadmin/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
        const data = await response.json();
       console.log(data);
       errors.style.color = "green";
       errors.innerHTML = data.message;
    } else {
      console.error('Error Elevating user:', response);
      errors.innerHTML = data.message;
      // Handle the error as needed, e.g., display a message to the user
    }
  }
}

//fetch and display all users
async function fetchAndDisplayAllUsers() {
    const backendURL = 'http://localhost:5050/';
    let data;
    try {
        const response = await fetch(`${backendURL}users/getalluser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            data = await response.json();
            //console.log('Data from the backend:', data);
            //return data;
          } else {
            console.error('Error fetching data:', response.statusText);
            // Handle the error as needed, e.g., display a message to the user
          }
       const users = data.users.rows;
        // Get the div element where donations will be displayed
        const profileContainer = document.getElementById('displayer-main');
        const userHead = document.getElementById('user-head');
        
        //header
        const header = document.createElement('h2');
        header.innerText = 'All Users';
        header.style.color = '#D49451';
        header.style.marginBottom = '2%';
        header.style.marginLeft = '37%';
        header.style.fontSize = '190%';
        // Clear existing content in the div
        profileContainer.innerHTML = '';
        userHead.innerHTML = '';
        userHead.appendChild(header);
        

         profileContainer.style.gridTemplateColumns = 'auto auto';
        // Display each donation in the div
        users.forEach((users) => {

            //main card
            const user = document.createElement('div');
            user.style.width = '140%';
            user.style.height = 'auto';
            user.style.border = '2px solid #D49451'
            user.style.borderRadius = '9px';
            user.style.padding = '2% 2%';
            user.style.backgroundColor = '#E2E1E1';
            user.style.marginBottom = '3%';
          

            //profile picture
            const userPicture = document.createElement('img');
            userPicture.style.height = '70px';
            userPicture.style.width = '70px';
            userPicture.style.borderRadius = '70px';
            userPicture.style.backgroundColor = '#D49451';
            userPicture.style.marginLeft = '40%';
            userPicture.style.marginTop = '5%';

            //id line
            const usertag = document.createElement('p');
            const usertagp = document.createElement('p');
            usertag.innerHTML = 'ID:';
            usertag.style.fontSize = '13px';
            usertag.style.marginTop = '6%'; 
            usertagp.style.height = '24px';
            usertagp.style.width = '100%';
            usertagp.style.marginBottom = '2%';
            usertagp.style.borderBottom = '1px solid #D49451';
            const userActualName = document.createElement('div');

            //username
            const userName = document.createElement('p');
            const userNamep = document.createElement('p');
            userNamep.style.height = '24px';
            userNamep.style.width = '100%';
            userNamep.style.marginBottom = '2%';
            userNamep.style.borderBottom = '1px solid #D49451';
            userName.innerHTML = 'UserName:';


            // //password
            // const userPassword = document.createElement('p');
            // const userPasswordp = document.createElement('p');
            // userPasswordp.style.height = '24px';
            // userPasswordp.style.width = '129px';
            // userPasswordp.style.marginBottom = '2%';
            // userPasswordp.style.borderBottom = '1px solid #D49451';
            // userPassword.innerHTML = 'Password:';


            //email
            const userEmail = document.createElement('p');
            const userEmailp = document.createElement('p');
            userEmailp.style.height = '29px';
            userEmailp.style.width = '100%';
            userEmailp.style.marginBottom = '2%';
            userEmailp.style.borderBottom = '1px solid #D49451';
            userEmail.innerHTML = 'Email';

            //role
            const userRole = document.createElement('p');
            const userRolep = document.createElement('p');
            userRolep.style.height = '29px';
            userRolep.style.width = '100%';
            userRolep.style.borderBottom = '1px solid #D49451';
            userRole.innerHTML = 'Role';
           
            // Appending the all element to the div
            user.appendChild(userPicture);
            user.appendChild(usertag);
            usertag.appendChild(usertagp);
            user.appendChild(userName);
            userName.appendChild(userNamep);
            //user.appendChild(userPassword);
            //userPassword.appendChild(userPasswordp);
            user.appendChild(userEmail);
            userEmail.appendChild(userEmailp);
            user.appendChild(userRole);
            userRole.appendChild(userRolep);
            profileContainer.appendChild(user);
            

            //adding contents
            userPicture.src = `${users.url}`;
            usertagp.textContent = `${users.user_id}`;
            userNamep.textContent = `${users.name}`;
            //userPasswordp.textContent = `${users.password}`;
            userEmailp.textContent = `${users.email}`;
            userRolep.textContent = `${users.user_role}`;

        });
    } catch (error) {
        console.error('Error displaying users:', error);
    }
}

//display all donations
async function fetchAndDisplayAllDonations() {
    try {
      const backendURL = 'http://localhost:5050/';
      let data;
          const response = await fetch(`${backendURL}donations/getgendonation`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
          });
          if (response.ok) {
              data = await response.json();
              console.log('Data from the backend:', data);
    
            } else {
              console.error('Error fetching data:', response.statusText);
              // Handle the error as needed, e.g., display a message to the user
            }
            const Donations = data.output;
            console.log(Donations);
        // Get the div element where donations will be displayed
        const profileContainer = document.getElementById('displayer-main');
        const userHead = document.getElementById('user-head');
        profileContainer.style.gridTemplateColumns = 'auto';
        // Clear existing content in the div
        userHead.innerHTML = '';
        profileContainer.innerHTML = ' ';

         //header
         const header = document.createElement('h2');
         header.innerText = 'All Donations';
         header.style.color = '#D49451';
         header.style.marginBottom = '2%';
         header.style.marginLeft = '37%';
         header.style.fontSize = '140%';


         //header appender
           profileContainer.appendChild(header);

        // Display each donation in the div
        Donations.forEach((Donations) => {
            //main card
            const DonateCard = document.createElement('div');
            DonateCard.style.width = '110%';
            DonateCard.style.height = 'auto';
            DonateCard.style.border = '2px solid #D49451'
            DonateCard.style.borderRadius = '9px';
            DonateCard.style.padding = '2% 2%';
            DonateCard.style.backgroundColor = '#E2E1E1';
            DonateCard.style.marginBottom = '3%';

            //id line
            const Donationtag = document.createElement('p');
            const Donationtagp = document.createElement('p');
            Donationtag.innerHTML = 'Donation ID:';
            Donationtag.style.fontSize = '74%';
            Donationtag.style.marginTop = '3%';
            Donationtagp.style.height = '24px';
            Donationtagp.style.width = '129px';
            Donationtagp.style.marginBottom = '2%';
            Donationtagp.style.borderBottom = '1px solid #D49451';
            Donationtagp.innerText = `${Donations.donation_id}`;
           
            //userid line
            const Donationusertag = document.createElement('p');
            const Donationusertagp = document.createElement('p');
            Donationusertag.innerHTML = 'User ID:';
            Donationusertag.style.fontSize = '74%';
            Donationusertag.style.marginTop = '3%';
            Donationusertagp.style.height = '24px';
            Donationusertagp.style.width = '100%';
            Donationusertagp.style.marginBottom = '2%';
            Donationusertagp.style.borderBottom = '1px solid #D49451';
            Donationusertagp.innerText = `${Donations.user_id}`;

            //donation date
            const DonationDate = document.createElement('p');
            const DonationDatep = document.createElement('p');
            DonationDate.innerHTML = 'Donation date:';
            DonationDate.style.fontSize = '74%';
            DonationDate.style.marginTop = '3%';
            DonationDatep.style.height = '24px';
            DonationDatep.style.width = '100%';
            DonationDatep.style.marginBottom = '2%';
            DonationDatep.style.borderBottom = '1px solid #D49451';
            DonationDatep.innerText = `${Donations.donation_date}`;

            //donation type
            const DonationType = document.createElement('p');
            const DonationTypep = document.createElement('p');
            DonationType.innerHTML = 'Donation type:';
            DonationType.style.fontSize = '74%';
            DonationType.style.marginTop = '3%';
            DonationTypep.style.height = 'auto';
            DonationTypep.style.width = '100%';
            DonationTypep.style.marginBottom = '2%';
            DonationTypep.style.borderBottom = '1px solid #D49451';
            DonationTypep.innerText = `${Donations.donation_type}`;

            //donation ammount
            const Donationamt = document.createElement('p');
            const Donationamtp = document.createElement('p');
            Donationamt.innerHTML = 'Donation Ammount:';
            Donationamt.style.fontSize = '74%';
            Donationamt.style.marginTop = '3%';
            Donationamtp.style.height = 'auto';
            Donationamtp.style.width = '100%';
            Donationamtp.style.marginBottom = '2%';
            Donationamtp.style.borderBottom = '1px solid #D49451';
            Donationamtp.innerText = `${Donations.amount}`;

            //donation item name
            const Donationitem = document.createElement('p');
            const Donationitemp = document.createElement('p');
            Donationitem.innerHTML = 'Donation Item Name:';
            Donationitem.style.fontSize = '74%';
            Donationitem.style.marginTop = '3%';
            Donationitemp.style.height = '24px';
            Donationitemp.style.width = '100%';
            Donationitemp.style.marginBottom = '2%';
            Donationitemp.style.borderBottom = '1px solid #D49451';
            Donationitemp.innerText = `${Donations.item_name}`;

            //donation description
            const Donationdesc = document.createElement('p');
            const Donationdescp = document.createElement('p');
            Donationdesc.innerHTML = 'Donation Description:';
            Donationdesc.style.fontSize = '74%';
            Donationdesc.style.marginTop = '3%';
            Donationdescp.style.height = 'auto';
            Donationdescp.style.width = '100%';
            Donationdescp.style.marginBottom = '2%';
            Donationdescp.style.borderBottom = '1px solid #D49451';
            Donationdescp.innerText = `${Donations.description}`;

            //donation campaign
            const Donationcamp = document.createElement('p');
            const Donationcampp = document.createElement('p');
            Donationcamp.innerHTML = 'Donation Campaign:';
            Donationcamp.style.fontSize = '74%';
            Donationcamp.style.marginTop = '3%';
            Donationcampp.style.height = 'auto';
            Donationcampp.style.width = '100%';
            Donationcampp.style.marginBottom = '2%';
            Donationcampp.style.borderBottom = '1px solid #D49451';
            Donationcampp.innerText = `${Donations.campaign_name}`;


           // Appending the all element to the div

          
           //DONATION ID
            DonateCard.appendChild(Donationtag);
            DonateCard.appendChild(Donationtagp);
            //DONATION USER ID
            DonateCard.appendChild(Donationusertag);
            DonateCard.appendChild(Donationusertagp);
            //donation date
            DonateCard.appendChild(DonationDate);
            DonateCard.appendChild(DonationDatep);
            //donation type
            DonateCard.appendChild(DonationType);
            DonateCard.appendChild(DonationTypep);
            //donation ammount
            DonateCard.appendChild(Donationamt);
            DonateCard.appendChild(Donationamtp);
            //donation item name
            DonateCard.appendChild(Donationitem);
            DonateCard.appendChild(Donationitemp);
            //donation description
            DonateCard.appendChild(Donationdesc);
            DonateCard.appendChild(Donationdescp);
            //donation campaign
            DonateCard.appendChild(Donationcamp);
            DonateCard.appendChild(Donationcampp);
            // Append the donation element to the div
            profileContainer.appendChild(DonateCard);
        });
    } catch (error) {
        console.error('Error displaying users:', error);
    }
}

//total users function
async function totalUsers(params) {
    const backendURL = 'http://localhost:5050/';
    // Get the div element where donations will be displayed
    const DisplayTotalUsers = document.getElementById('display-total-users');

    // Clear existing content in the div
    DisplayTotalUsers.innerHTML = '';

    const response = await fetch(`${backendURL}users/gettotaluser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        data = await response.json();
        //console.log('Data from the backend:', data);
        //return data;
      } else {
        console.error('Error fetching data:', response.statusText);
        // Handle the error as needed, e.g., display a message to the user
      }
        setTimeout(function(){
            DisplayTotalUsers.innerText = `${data.totalUsers}`;
        }, 1000);
}

//total users function
async function totalDonations(params) {
    const backendURL = 'http://localhost:5050/';
    let data;
    // Get the div element where donations will be displayed
    const DisplayTotalDonations = document.getElementById('display-total-donations');

    // Clear existing content in the div
    DisplayTotalDonations.innerHTML = '';

    const response = await fetch(`${backendURL}donations/gettotaldonation`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if (response.ok) {
        data = await response.json();
        //console.log('Data from the backend:', data);
        //return data;
      } else {
        console.error('Error fetching data:', response.statusText);
        // Handle the error as needed, e.g., display a message to the user
      }
        setTimeout(function(){
            DisplayTotalDonations.innerText = `${data.totalDonation}`;
        }, 1000);
}

async function totalOrganization() {
    const backendURL = 'http://localhost:5050/';
    // Get the div element where donations will be displayed
    const DisplayTotalOrganizations = document.getElementById('display-total-organization');

    // Clear existing content in the div
    DisplayTotalOrganizations.innerHTML = '';
      let data;
      let count = 0;
          const response = await fetch(`${backendURL}campaigns/getallcampaigning`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
          });
          if (response.ok) {
              data = await response.json();
              console.log('Data from the backend:', data);
              const org = data.output;
              org.forEach((org) => {
                count++;
              });
            } else {
              console.error('Error fetching data:', response.statusText);
              // Handle the error as needed, e.g., display a message to the user
            }
    
    setTimeout(function () {
      DisplayTotalOrganizations.innerText = `${count}`;
    }, 1000);
}

function DisplayUserProfile() {
    try {
        // Get the div element where donations will be displayed
        const profileContainer = document.getElementById('displayer-main');
        const userHead = document.getElementById('user-head');
        profileContainer.innerHTML = '';
        userHead.innerHTML = '';
        profileContainer.style.gridTemplateColumns = 'auto';

            //main card
            const userMain = document.createElement('div');
            userMain.style.width = '210%';
            userMain.style.height = 'auto';
            userMain.style.border = '2px solid #D49451';
            userMain.style.borderRadius = '9px';
            userMain.style.padding = '2% 2%';
            userMain.style.backgroundColor = '#E2E1E1';
            userMain.style.marginBottom = '3%';

            //profile picture
            const userPicture = document.createElement('img');
            userPicture.style.height = '24%';
            userPicture.style.width = '24%';
            userPicture.style.borderRadius = '10%';
            userPicture.style.backgroundColor = '#D49451';
            userPicture.style.marginLeft = '40%';
            userPicture.style.marginTop = '5%';

            //id line
            const usertag = document.createElement('p');
            const usertagp = document.createElement('p');
            usertag.innerHTML = 'ID:';
            usertag.style.fontSize = '81%';
            usertag.style.marginTop = '6%';
            usertagp.style.height = '24px';
            usertagp.style.width = '129px';
            usertagp.style.marginBottom = '2%';
            usertagp.style.borderBottom = '1px solid #D49451';
            const userActualName = document.createElement('div');

            //username
            const userName = document.createElement('p');
            const userNamep = document.createElement('p');
            userNamep.style.height = '24px';
            userNamep.style.width = '190px';
            userNamep.style.marginBottom = '2%';
            userNamep.style.borderBottom = '1px solid #D49451';
            userName.innerHTML = 'UserName:';
            userName.style.fontSize = '81%';


            // //password
            // const userPassword = document.createElement('p');
            // const userPasswordp = document.createElement('p');
            // userPasswordp.style.height = '24px';
            // userPasswordp.style.width = '129px';
            // userPasswordp.style.marginBottom = '2%';
            // userPasswordp.style.borderBottom = '1px solid #D49451';
            // userPassword.innerHTML = 'Password:';


            //email
            const userEmail = document.createElement('p');
            const userEmailp = document.createElement('p');
            userEmailp.style.height = '29px';
            userEmailp.style.width = '220px';
            userEmailp.style.marginBottom = '2%';
            userEmailp.style.borderBottom = '1px solid #D49451';
            userEmail.innerHTML = 'Email';
            userEmail.style.fontSize = '81%';

            //role
            const userRole = document.createElement('p');
            const userRolep = document.createElement('p');
            userRolep.style.height = '29px';
            userRolep.style.width = '129px';
            userRolep.style.borderBottom = '1px solid #D49451';
            userRole.innerHTML = 'Role';
            userRole.style.fontSize = '81%';
            
            // Appending the all element to the div
            userMain.appendChild(userPicture);
            userMain.appendChild(usertag);
            usertag.appendChild(usertagp);
            userMain.appendChild(userName);
            userName.appendChild(userNamep);
            // userMain.appendChild(userPassword);
            // userPassword.appendChild(userPasswordp);
            userMain.appendChild(userEmail);
            userEmail.appendChild(userEmailp);
            userMain.appendChild(userRole);
            userRole.appendChild(userRolep);
            profileContainer.appendChild(userMain);
  
            let id = localStorage.getItem('id');
            let username = localStorage.getItem('username');
            let email = localStorage.getItem('email');
            //let password = localStorage.getItem('password');
            let userrole = localStorage.getItem('userrole');
            let url = localStorage.getItem('url');

            

            //adding contents
            usertagp.textContent = `${id}`;
            userNamep.textContent = `${username}`;
            //userPasswordp.textContent = `${password}`;
            userEmailp.textContent = `${email}`;
            userRolep.textContent = `${userrole}`;
            userPicture.src = `${url}`


              } catch (error) {
        console.error('Error displaying users:', error);
    }
}

//logout function
function logout(){
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "index.html";
}

async function fetchAndDisplayAllOrganizations() {
  try{
  const backendURL = 'http://localhost:5050/';
  let data;
      const response = await fetch(`${backendURL}campaigns/getallcampaigning`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });
      if (response.ok) {
          data = await response.json();
          console.log('Data from the backend:', data);

        } else {
          console.error('Error fetching data:', response.statusText);
          // Handle the error as needed, e.g., display a message to the user
        }
        const users = data.output;
        // Get the div element where donations will be displayed
        const profileContainer = document.getElementById('displayer-main');
        const userHead = document.getElementById('user-head');
        
        
        //header
        const header = document.createElement('h2');
        header.innerText = 'All Organizations';
        header.style.color = '#D49451';
        header.style.marginBottom = '2%';
        header.style.marginLeft = '37%';
        header.style.fontSize = '170%';
        // Clear existing content in the div
        profileContainer.innerHTML = '';
        userHead.innerHTML = '';

        userHead.appendChild(header);
        

         profileContainer.style.gridTemplateColumns = 'auto auto';
        // Display each donation in the div
        users.forEach((users) => {
            //main card
            const user = document.createElement('div');
            user.style.width = 'auto';
            user.style.height = 'auto';
            user.style.border = '2px solid #D49451'
            user.style.borderRadius = '9px';
            user.style.padding = '2% 2%';
            user.style.backgroundColor = '#E2E1E1';
            user.style.marginBottom = '3%';

            //profile picture
            const userPicture = document.createElement('img');
            userPicture.style.height = '21%';
            userPicture.style.width = '50%';
            userPicture.style.borderRadius = '70px';
            userPicture.style.backgroundColor = '#D49451';
            userPicture.style.marginLeft = '20%';
            userPicture.style.marginTop = '5%';
            userPicture.src = users.url;

            //id line
            const usertag = document.createElement('p');
            const usertagp = document.createElement('p');
            usertag.innerHTML = 'ID:';
            usertag.style.fontSize = '13px';
            usertag.style.marginTop = '6%';
            usertagp.style.height = '24px';
            usertagp.style.width = '100%';
            usertagp.style.marginBottom = '2%';
            usertagp.style.borderBottom = '1px solid #D49451';
            const userActualName = document.createElement('div');

            //username
            const userName = document.createElement('p');
            const userNamep = document.createElement('p');
            userNamep.style.height = '24px';
            userNamep.style.width = '100%';
            userNamep.style.marginBottom = '2%';
            userNamep.style.borderBottom = '1px solid #D49451';
            userName.innerHTML = 'UserName:';


            //phone
            const phone = document.createElement('p');
            const phonep = document.createElement('p');
            phonep.style.height = '29px';
            phonep.style.width = '100%';
            phonep.style.marginBottom = '2%';
            phonep.style.borderBottom = '1px solid #D49451';
            phone.innerHTML = 'Phone Number';

            
            //email
            const userEmail = document.createElement('p');
            const userEmailp = document.createElement('p');
            userEmailp.style.height = '29px';
            userEmailp.style.width = '100%';
            userEmailp.style.marginBottom = '2%';
            userEmailp.style.borderBottom = '1px solid #D49451';
            userEmail.innerHTML = 'Email';

            //address
            const address = document.createElement('p');
            const addressp = document.createElement('p');
            addressp.style.height = 'auto';
            addressp.style.width = '100%';
            addressp.style.marginBottom = '2%';
            addressp.style.flexWrap = 'wrap';
            addressp.style.borderBottom = '1px solid #D49451';
            address.innerHTML = 'Address';

            //about
            const about = document.createElement('p');
            const aboutp = document.createElement('p');
            aboutp.style.height = 'auto';
            aboutp.style.width = '100%';
            aboutp.style.marginBottom = '2%';
            aboutp.style.borderBottom = '1px solid #D49451';
            about.innerHTML = 'About'
            
            // Appending the all element to the div
            user.appendChild(userPicture);
            user.appendChild(usertag);
            usertag.appendChild(usertagp);
            user.appendChild(userName);
            userName.appendChild(userNamep);
            user.appendChild(userEmail);
            userEmail.appendChild(userEmailp);
            user.appendChild(phone);
            phone.appendChild(phonep);
            user.appendChild(address);
            address.appendChild(addressp);
            user.appendChild(about);
            about.appendChild(aboutp);
            profileContainer.appendChild(user);
            

            //adding contents
            usertagp.textContent = `${users.campaign_id}`;
            userNamep.textContent = `${users.name}`;
            phonep.textContent = `${users.phone_number}`;
            userEmailp.textContent = `${users.email}`;
            aboutp.textContent = `${users.about}`;
            addressp.textContent = `${users.address}`;
        });
    } catch (error) {
        console.error('Error displaying users:', error);
    }
}
function headerName() {
    const headName = document.getElementById('headings-name');
    const naming = document.createElement('p');
    headName.innerText = '';
    let template = localStorage.getItem('username');
    const word = template.split(' ');
    naming.innerText = `Hi, ${word[0]}`;

    headName.appendChild(naming);
}
function chart() {
    try {
        // Get the div element where donations will be displayed
        const profileContainer = document.getElementById('displayer-main');
        const userHead = document.getElementById('user-head');
        
        //header
        const header = document.createElement('h2');
        header.innerText = 'Chart';
        header.style.color = '#D49451';
        header.style.marginBottom = '2%';
        header.style.marginLeft = '43%';
        header.style.fontSize = '30px';

        // Clear existing content in the div
        profileContainer.innerHTML = '';
        userHead.innerHTML = '';
        userHead.appendChild(header);
        
         profileContainer.style.gridTemplateColumns = 'auto';

        // Display each donation in the div
            //main card
            const user = document.createElement('div');
            user.style.width = '590px';
            user.style.height = '380px';
            user.style.border = '2px solid #D49451';
            user.style.borderRadius = '9px';
            user.style.padding = '2% 2%';
            user.style.backgroundColor = '#E2E1E1';
            user.style.marginBottom = '3%';
            user.style.display = 'flex';
            user.style.alignItems = 'center';
            user.style.justifyContent = 'space-around';


            //edge
            const horizontalandvertical = document.createElement('div');
            horizontalandvertical.style.borderLeft = '2px solid #1D0B35';
            horizontalandvertical.style.borderBottom = '2px solid #1D0B35';
            horizontalandvertical.style.height = '84%';
            horizontalandvertical.style.width = '80%';

            //divider1
            const divide = document.createElement('p');
            divide.style.height = '1px';
            divide.style.width = '100%';
            divide.style.backgroundColor = 'white';
            divide.style.marginTop = '16%';

            //divider2
            const divide2 = document.createElement('p');
            divide2.style.height = '1px';
            divide2.style.width = '100%';
            divide2.style.backgroundColor = 'white';
            divide2.style.marginTop = '16%';

            //divider3
            const divide3 = document.createElement('p');
            divide3.style.height = '1px';
            divide3.style.width = '100%';
            divide3.style.backgroundColor = 'white';
            divide3.style.marginTop = '16%';

            horizontalandvertical.appendChild(divide);
            horizontalandvertical.appendChild(divide2);
            horizontalandvertical.appendChild(divide3);
            // horizontalandvertical.appendChild(divide);
            user.appendChild(horizontalandvertical);
            profileContainer.appendChild(user);
    } catch (error) {
        console.error('Error displaying users:', error);
    }
}
document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const navList = document.querySelector('.quick-links');

  burgerMenu.addEventListener('click', function () {
      navList.classList.toggle('show');
      if (navList.classList.contains('show')) {
        burgerMenu.innerHTML = '&times;';
    } else {
        burgerMenu.innerHTML = '&#9776;';
    }
  });
});

async function uploadOrg() {
  const imageInput = document.getElementById("imageUpload");
  const name = document.getElementById("organization-name").value;
  const email = document.getElementById("organization-email").value;
  const phoneno = document.getElementById("organization-number").value;
  const address = document.getElementById("organization-address").value;
  const about = document.getElementById("organization-about").value;
  const error = document.getElementById("organization-error");
  const displayer = document.getElementById("image-displayer");

  //valiidation
  let flager = 0;

  // //image validator
  // if (image == '') {
  //   error.innerHTML = 'Make sure you fill every detail correctly';
  //   error.style.color = 'red';
  //   return;
  // }else{
  //   flager++;
  // }

  //name validator
  if (name === '') {
    error.innerHTML = 'Make sure you fill every detail correctly';
    error.style.color = 'red';
    return;
  } else if(name.trim().length < 3){
    error.innerHTML = 'Make sure you fill every detail correctly';
    error.style.color = 'red';
    return;
  }else{
    flager++;
  }

  //email validator
    if (email ===  '') {
      error.innerHTML = 'Make sure you fill every detail correctly';
      error.style.color = 'red';
      return;
    }else if (email !== ''){
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      let result = emailRegex.test(email);
      if(result == true){
        flager++;
      }else if(result == false){
        error.innerHTML = 'Make sure you fill every detail correctly';
        error.style.color = 'red';
        return;
      }
    }
    //number validator
    if (phoneno < 11) {
      error.innerHTML = 'Make sure you fill every detail correctly';
      error.style.color = 'red';
      return;
    }else{
      flager++;
    }

    //address 
    if (address == '') {
      error.innerHTML = 'Make sure you fill every detail correctly';
      error.style.color = 'red';
      return;
    }else{
      flager++;
    }

    //about
    if (about == '') {
      error.innerHTML = 'Make sure you fill every detail correctly';
      error.style.color = 'red';
      return;
    }else{
      flager++;
    }
    if(flager < 5){
        const errorDisplay = document.getElementById("organization-error2");
        const errorDisplay2 = document.getElementById("organization-error");
        errorDisplay.style.display = "block";
        errorDisplay2.style.display = "none";
    }
    if (flager == 5) {
      const backendURL = 'http://localhost:5050/';
       let data;
       //let data2;
       const formData = new FormData();
       formData.append('file', imageInput.files[0]);
      try {
      const response = await fetch(`${backendURL}cloud/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
          data = await response.json();
          console.log('Data from the backend:', data);
          console.log(data.message);
          const url = data.result;
          let data3;
            const response2 = await fetch(`${backendURL}campaigns/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:name, email:email, phoneno:phoneno, address:address, about:about, url:url})
            });
            if (response2.ok) {
            data3 = await response2.json();
            console.log('Data from the backend:', data3.message);
            const errorDisplay = document.getElementById("organization-error");
            const errorDisplay3 = document.getElementById("organization-error");
            errorDisplay3.style.display = "none";
            errorDisplay.style.display = "block";
            errorDisplay.innerText = data3.message;
            //return data;
              } else {
            console.error('Error fetching data:', response.statusText);
             }
      } else {
          console.error('Error fetching data:', response.statusText);
      }
      } catch (error) {
          console.error('An error occurred:', error);
      }
    }
  
}

async function uploadPpicture() {
   const imageInput = document.getElementById("imageuploader");
   const backendURL = 'http://localhost:5050/';
       let data;
       let data2;
       const formData = new FormData();
       formData.append('file', imageInput.files[0]);
       if (imageInput.value == '') {
        const profileInfo = document.getElementById('dummy-message');
        profileInfo.innerText = 'Add image';
       }else{
        const profileInfo = document.getElementById('dummy-message');
        profileInfo.innerText = '';
        try {
          const response = await fetch(`${backendURL}cloud/upload`, {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
              data = await response.json();
              console.log('Data from the backend:', data.result);
              const url = data.result;
              let id = localStorage.getItem('id');
              console.log(url);
              console.log(id);
              try {
                const response2 = await fetch(`${backendURL}users/profile`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({id:id, url:url})
                });
        
                if (response2.ok) {
                    data2 = await response2.json();
                    console.log('Data from the backend:', data2);
                    const message = document.getElementById("dummy-message");
                    message.innerText = data2.message;
                } else {
                    console.error('Error fetching data:', response2.statusText);
                }
              } catch (error) {
                  console.error('An error occurred:', error);
              }  
          } else {
              console.error('Error fetching data:', response.statusText);
          }
        } catch (error) {
            console.error('An error occurred:', error);
        }
       }    
}

function displaynav() {
  const navi = document.getElementById("navigation");
  const close = document.getElementById("nav-close");
  const blur = document.getElementById("blur");
  
  navi.style.display = 'block';
  close.style.display = 'block';
  blur.style.display = 'block';
}

function navcloser() {
  const navi = document.getElementById("navigation");
  const blur = document.getElementById("blur");
  navi.style.display = 'none';
  blur.style.display = 'none';
}
function editoropen() {
  const editor = document.getElementById("God-mode");
  const editorClose = document.getElementById("editor-close");
  editor.style.display = 'block';
  editorClose.style.display = 'block';
}
function editclose() {
  const editor = document.getElementById("God-mode");
  editor.style.display = 'none';
}