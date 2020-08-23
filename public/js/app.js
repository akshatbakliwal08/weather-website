
const weatherform=document.querySelector('form');
const search=document.querySelector('input');
const msg1=document.querySelector('#msg1');
const msg2=document.querySelector('#msg2');
//msg1.textContent='From JavaScript';
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    msg1.textContent='Loading...';
    msg2.textContent='';
    fetch('/weather?address='+location).then((response)=>{
    
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent='Error';
            msg2.textContent='';
        }
        else{
            msg1.textContent=data.loc;
            msg2.textContent=data.dat;
        }
    }); 
});
    //console.log(location);
})