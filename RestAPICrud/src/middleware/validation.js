export function checkEmail(mail)
{
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(mail.match(mailformat))
{
    //erremail.textContent='Enter a valid email address'
    return true;
}
else {
    // erremail.textContent='Enter a valid email address'
    return false;
}
}