let url = 'http://localhost:1337/graphql'
let option = 0
let opt = window.location.href.split('q=');
let loader = $('#myloader');
let submit = $('#send-message-btn');
if(opt.length>1){
    //query has been passed
    switch (opt[1]){
        case 'optiona1':{
            option = 1
            break;
        }
        case 'optiona2':{
            option = 2
            break;
        }
        case 'optiona3':{
            option = 3
            break;
        }
        default:{
            option = 0;
            break;
        }
    }
}

function submitInfo(){
    // e.preventDefault();
    loadSubmitButton();
let displayname = $('#displayname').val();
let email = $('#email').val();
let password = $('#password').val();
let optin =  $('#opt-in').val();
    if(displayname.length<5||!email.includes('@')||email.length<5||password.length<8||!email.includes('.')){
        unloadSubmitButton()
        return;
    }
    let username ='_' + Math.random().toString(36).substr(2, 9);
let form = new FormData();
    form.append('email',email)
    form.append('username',username)
    form.append('optin',optin)
    form.append('password',password)
    form.append('displayName',displayname)
    let query=`
mutation{
  createUser(input:{
    data:{
      username:"${username}",
      displayName:"${displayname}",
      password:"${password}",
      optin:"${optin}"
    }
  })
}
    `
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(query)
    })
        .then(r => r.json())
        .then(data => console.log('data returned:', data));

}
function loadSubmitButton(){
    loader.css('display','inline-block');
    submit.attr('disabled')
}

function unloadSubmitButton(){
    loader.css('display','none');
    submit.removeAttr('disabled')
}
