
async function yourDonation() {
    try {
    var modal = document.getElementById("maked-Modal");
    var btn = document.getElementById("maked-actual-btn");
    var span = document.getElementsByClassName("maked-close")[0];


    async function donator() {
    let donation_type = document.getElementById("donation-type").value;
    let amount = document.getElementById("ammount").value;
    let item_name = document.getElementById("item-name").value;
    let description = document.getElementById("description").value;
    let campaign_name = document.getElementById("campaign-name").value;
    const currentDate = new Date();
    let donation_date = currentDate.toISOString().split('T')[0];
    let user_id = localStorage.getItem('id');
    
    const backendURL = 'http://localhost:5050/';
    let data;

      console.log(user_id, donation_date, donation_type, amount, item_name, description, campaign_name);
      const response = await fetch(`${backendURL}donations/create`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id, donation_date, donation_type, amount, item_name, description, campaign_name})
      });
      
      if (response.ok) {
          data = await response.json();
          console.log('Data from the backend:', data);
          //return data;
        } else {
          console.error('Error fetching data:', response.statusText);
          // Handle the error as needed, e.g., display a message to the user
        }
    
    }


    function showing() {
        modal.style.display = "block";
    }
    span.onclick = function dontDisplay() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
  }
  btn.addEventListener('click', donator);
        
  const backendURL = 'http://localhost:5050/';
  let user_id = localStorage.getItem('id');
    var Donations;
    var DonationsMain;
    const response = await fetch(`${backendURL}donations/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        DonationsMain = await response.json();
        console.log('Data from the backend:', DonationsMain);
      } else {
        console.error('Error fetching data:', response.statusText);
        // Handle the error as needed, e.g., display a message to the user
      }
        Donations = DonationsMain.donationDetails;
        console.log(DonationsMain.donationDetails);
        // Get the div element where donations will be displayed
        const profileContainer = document.getElementById('displayer-main');
        const userHead = document.getElementById('user-head');
        profileContainer.style.gridTemplateColumns = 'auto';
        // Clear existing content in the div
        userHead.innerHTML = '';
        profileContainer.innerHTML = ' ';

        //make donations button
        const makeDonation = document.createElement('button');
        makeDonation.innerText = 'make donation!';
        makeDonation.style.height = '30px';
        makeDonation.style.width = '120px';
        makeDonation.style.borderRadius = '9px';
        makeDonation.style.color = '#D49451';
        makeDonation.style.outline = 'none';
        makeDonation.style.marginLeft = '90%';
        makeDonation.style.backgroundColor = 'green';
        makeDonation.id = 'makeDonationButton';

        makeDonation.addEventListener('click', showing);
         //header
         const header = document.createElement('h2');
         header.innerText = 'All Your Donations';
         header.style.color = '#D49451';
         header.style.marginBottom = '2%';
         header.style.marginLeft = '33%';
         header.style.fontSize = '30px';


         //header appender
            profileContainer.appendChild(makeDonation)
           profileContainer.appendChild(header);

        // Display each donation in the div
        Donations.forEach((Donations) => {


            //main card
            const DonateCard = document.createElement('div');
            DonateCard.style.width = '600px';
            DonateCard.style.height = '500px';
            DonateCard.style.border = '2px solid #D49451'
            DonateCard.style.borderRadius = '9px';
            DonateCard.style.padding = '2% 2%';
            DonateCard.style.backgroundColor = '#E2E1E1';
            DonateCard.style.marginBottom = '3%';

            //donation date
            const DonationDate = document.createElement('p');
            const DonationDatep = document.createElement('p');
            DonationDate.innerHTML = 'Donation date:';
            DonationDate.style.fontSize = '13px';
            DonationDate.style.marginTop = '3%';
            DonationDatep.style.height = '24px';
            DonationDatep.style.width = '129px';
            DonationDatep.style.marginBottom = '2%';
            DonationDatep.style.borderBottom = '1px solid #D49451';
            DonationDatep.innerText = `${Donations.donation_date}`;

            //donation type
            const DonationType = document.createElement('p');
            const DonationTypep = document.createElement('p');
            DonationType.innerHTML = 'Donation type:';
            DonationType.style.fontSize = '13px';
            DonationType.style.marginTop = '3%';
            DonationTypep.style.height = '24px';
            DonationTypep.style.width = '129px';
            DonationTypep.style.marginBottom = '2%';
            DonationTypep.style.borderBottom = '1px solid #D49451';
            DonationTypep.innerText = `${Donations.donation_type}`;

            //donation ammount
            const Donationamt = document.createElement('p');
            const Donationamtp = document.createElement('p');
            Donationamt.innerHTML = 'Donation Ammount:';
            Donationamt.style.fontSize = '13px';
            Donationamt.style.marginTop = '3%';
            Donationamtp.style.height = '24px';
            Donationamtp.style.width = '129px';
            Donationamtp.style.marginBottom = '2%';
            Donationamtp.style.borderBottom = '1px solid #D49451';
            Donationamtp.innerText = `${Donations.amount}`;

            //donation item name
            const Donationitem = document.createElement('p');
            const Donationitemp = document.createElement('p');
            Donationitem.innerHTML = 'Donation Item Name:';
            Donationitem.style.fontSize = '13px';
            Donationitem.style.marginTop = '3%';
            Donationitemp.style.height = '24px';
            Donationitemp.style.width = '129px';
            Donationitemp.style.marginBottom = '2%';
            Donationitemp.style.borderBottom = '1px solid #D49451';
            Donationitemp.innerText = `${Donations.item_name}`;

            //donation description
            const Donationdesc = document.createElement('p');
            const Donationdescp = document.createElement('p');
            Donationdesc.innerHTML = 'Donation Description:';
            Donationdesc.style.fontSize = '13px';
            Donationdesc.style.marginTop = '3%';
            Donationdescp.style.height = '34px';
            Donationdescp.style.width = '229px';
            Donationdescp.style.marginBottom = '2%';
            Donationdescp.style.borderBottom = '1px solid #D49451';
            Donationdescp.innerText = `${Donations.description}`;

            //donation campaign
            const Donationcamp = document.createElement('p');
            const Donationcampp = document.createElement('p');
            Donationcamp.innerHTML = 'Donation Campaign:';
            Donationcamp.style.fontSize = '13px';
            Donationcamp.style.marginTop = '3%';
            Donationcampp.style.height = '24px';
            Donationcampp.style.width = '129px';
            Donationcampp.style.marginBottom = '2%';
            Donationcampp.style.borderBottom = '1px solid #D49451';
            Donationcampp.innerText = `${Donations.campaign_name}`;


           // Appending the all element to the div
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

async function fetchAndDisplayOurOrganizations() {
    try {

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
           
            // Get the div element where donations will be displayed
            const profileContainer = document.getElementById('displayer-main');
            const userHead = document.getElementById('user-head');
            
            const users = data.output;
            //header
            const header = document.createElement('h2');
            header.innerText = 'All Our Organizations';
            header.style.color = '#D49451';
            header.style.marginBottom = '2%';
            header.style.marginLeft = '28%';
            header.style.fontSize = '30px';
            // Clear existing content in the div
            profileContainer.innerHTML = '';
            userHead.innerHTML = '';
    
            userHead.appendChild(header);
            
    
             profileContainer.style.gridTemplateColumns = 'auto auto';
            // Display each donation in the div
            users.forEach((users) => {
                //main card
                const user = document.createElement('div');
                user.style.width = '290px';
                user.style.height = '280px';
                user.style.border = '2px solid #D49451'
                user.style.borderRadius = '9px';
                user.style.padding = '2% 2%';
                user.style.backgroundColor = '#E2E1E1';
                user.style.marginBottom = '3%';
    
                //profile picture
                const userPicture = document.createElement('div');
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
    
                //email
                const userEmail = document.createElement('p');
                const userEmailp = document.createElement('p');
                userEmailp.style.height = '29px';
                userEmailp.style.width = '220px';
                userEmailp.style.marginBottom = '2%';
                userEmailp.style.borderBottom = '1px solid #D49451';
                userEmail.innerHTML = 'Email';
    
    
                // user.textContent = `Id: ${users.id} - Name: ${users.username} - Email: ${users.email}- password: ${users.password} - User Role: ${users.userrole}`;
                
                // Appending the all element to the div
                user.appendChild(userPicture);
                user.appendChild(usertag);
                usertag.appendChild(usertagp);
                user.appendChild(userName);
                userName.appendChild(userNamep);
                user.appendChild(userEmail);
                userEmail.appendChild(userEmailp);
                profileContainer.appendChild(user);
                
    
                //adding contents
                usertagp.textContent = `${users.id}`;
                userNamep.textContent = `${users.username}`;
                userEmailp.textContent = `${users.email}`;
            });
        } catch (error) {
            console.error('Error displaying users:', error);
        }
    }

async function uploadImage(){
    const fileInput = document.getElementById('imageUpload');
    console.log(fileInput);
      const file = fileInput.files[0];
      console.log(file);

      if (!file) {
        alert('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      try {
        const response = await fetch('http://localhost:5050/cloud/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.url);
          //document.getElementById('result').innerHTML = `<p>File uploaded successfully. URL: ${data.url}</p>`;
        } else {
          console.error('Error uploading file:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
}