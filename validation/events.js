const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateEventInput(data){
  
    let errors = {};

    data.name = validText(data.name)? data.name : "";

    if(Validator.isEmpty(data.name)){
        errors.name = "Create a name for your event! "
    };
    

    if(!Validator.isEmail(data.email)){
        errors.email = "That is not a valid email."
    };

    if(Validator.isEmpty(data.body)){
        errors.body = "Add a description for you event!"
    };

    if (Validator.isEmpty(data.time)) {
        errors.time = "Add a time and date for your event!";
    };
    
    
    data.location = validText(data.location)? data.location : "";
    if(Validator.isEmpty(data.location)){
        errors.location = "Add a location for your event!"
    };

    return { 
        errors, 
        isValid: Object.keys(errors).length === 0
    };
}