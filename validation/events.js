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
    }
    
    
    data.location = validText(data.location)? data.location : "";
    if(Validator.isEmpty(data.location)){
        errors.location = "Add a location for your event!"
    }

    return { 
        errors, 
        isValid: Object.keys(errors).length === 0
    };
}