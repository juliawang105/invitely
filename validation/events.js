const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateEventInput(data){
    let errors = {};

    data.name = validText(data.name)? data.text : "";

    if(Validator.isEmpty(data.name)){
        errors.name = "Create a name for your event! "
    };

    for (let i = 0; i < data.guest_emails.emails.length; i ++ ) {
        let email = data.guest_emails.emails[i];
        if(!validText(email) && data.guest_emails.emails.length > 0 ){
            errors.email = "Make sure this is a valid email."
        }
    };
    
    validText(data.guest_emails.emails)? data.guest_emails : "";
    
    data.location = validText(data.location)? data.text : "";
    if(Validator.isEmpty(data.location)){
        errors.location = "Add a location for your event!"
    }
}