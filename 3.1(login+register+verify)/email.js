

function sendEmail(content) {
	const useremail=document.querySelector('input').value
	Email.send({
    Host : "smtp.gmail.com",
    Username:'him1920212@gmail.com',
    Password:'yilmcvhoxgebnthh',
	To : useremail,
	From : "him1920212@gmail.com",
	Subject : "smtpjs test",
	Body : content
	}).then(
		message => alert("mail sent successfully, the email is:"+useremail)
	);
}