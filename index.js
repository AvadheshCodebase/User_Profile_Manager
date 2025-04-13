document.addEventListener("DOMContentLoaded", initialize);


// When the page get load display all users
 function initialize(){
    const usersList=JSON.parse(localStorage.getItem('usersList')) || [];
    for(let i=0 ;i<usersList.length;i++){
        display(usersList[i]);
    }
    sessionStorage.removeItem('editId');
 }


// add new users in usersList array
function handleFormSubmit(event) {
    event.preventDefault();
    const username=event.target.username.value
    const email=event.target.email.value
    const phone=event.target.phone.value

    const userDetails={
        username,
        email,
        phone,
    };

    const usersList=JSON.parse(localStorage.getItem('usersList')) || [];

    const editId= sessionStorage.getItem('editId');

    if(editId){
       update(usersList,userDetails,editId);
     }else{
      add(usersList,userDetails); 
     }

     localStorage.setItem('usersList',JSON.stringify(usersList));
     event.target.reset();
}

function add(usersList,userDetails){
    userDetails.id=Date.now();
    usersList.push(userDetails);
    display(userDetails);
}
 // use this function to display user on screen
 function display(data) {
    console.log(data);
    console.log(data.username);
    const ul=document.querySelector('ul')
    const li=document.createElement('li')

    li.id=data.id;

    li.textContent=data.username+' '+data.email+' '+data.phone;
    ul.appendChild(li);

    const deleteBtn=document.createElement('button')
    deleteBtn.textContent='Delete';
    deleteBtn.addEventListener('click',()=>deleteData(data.id,li));
    li.appendChild(deleteBtn);

    const editBtn=document.createElement('button');
    editBtn.textContent='Edit'
    
    editBtn.addEventListener('click',()=>editData(data))
    li.appendChild(editBtn);

}
 // use this function to delete the user details from local store and DOM (screen)
 function deleteData(id,li) {
    const usersList=JSON.parse(localStorage.getItem('usersList')) || [];

    const updatedUsersList=[];
    for(const user of usersList){
        if(user.id !=id)
            updatedUsersList.push(user)
    }
    localStorage.setItem('usersList',JSON.stringify(updatedUsersList));
    li.remove();
 
 }

 function editData(data){
    const usernameInput=document.querySelector('#username')
    const emailInput=document.querySelector('#email')
    const phoneInput=document.querySelector('#phone')

    usernameInput.value = data.username;
     emailInput.value = data.email;
     phoneInput.value = data.phone;

    sessionStorage.setItem('editId',data.id);

    const updateBtn=document.querySelector('button[type="submit"]')
    updateBtn.textContent='Update';
 }

 function update(usersList,userDetails,editId){
    
    
        for(let i=0; i<usersList.length ;i++){
            if(usersList[i].id==editId){
                usersList[i].username=userDetails.username;
                usersList[i].email=userDetails.email;
                usersList[i].phone=userDetails.phone;
            }
            const li=document.getElementById(editId)
            li.firstChild.textContent=userDetails.username+' '+userDetails.email+' '+userDetails.phone;
            
            sessionStorage.removeItem('editId');
            const updateBtn=document.querySelector('button[type="submit"]')
            updateBtn.textContent='Submit';
        }

 }





