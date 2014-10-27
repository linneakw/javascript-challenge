/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

var signUpForm = document.getElementById('signup');

// I used this from the Javascripts form example, I hope that's okay.
function validateRequiredField(field) {
    var fieldObject = document.getElementById(field);
    var value = fieldObject.value;
    if (value) {
        value = value.trim(); // removes spaces from front and end, will return empty if all strings
    }

    var valid = value.length > 0;
    if (field == 'birthdate') {
        // check if older than 13
        var age = calcAge(value);
        if (age < 13) {
            valid = false;
            document.getElementById('birthdateMessage').innerHTML = 'You have to be 13 years or older to sign up.';
        }
    }

    if(field == 'zip') {
        var zipRegExp = new RegExp('^\\d{5}$');
        valid = zipRegExp.test(value);
        /*
        if (value.length != 5 || isNaN(value)) {
            valid = false;
        }*/
    }

    if (valid) {
        fieldObject.className = 'form-control'; //className refers to class attribute on that element
    } else {
        fieldObject.className = 'form-control invalid-field';
    }
    return valid;
}

function calcAge(birthdate) {
    return moment().diff(birthdate, 'years');
}

document.addEventListener('DOMContentLoaded', function() {
    for(i = 0; i < usStates.length; i++) {
        var node = document.createElement('OPTION');
        node.text = usStates[i].name;
        node.value = usStates[i].code;
        // var name = document.createTextNode(usStates[i].name.value);
        document.getElementById('state').appendChild(node);
        // console.log(usStates[i]);
    }

    document.addEventListener('change', function() {
        // if the value of the option is other, then show the css
        var val = document.getElementById('occupation').value;
        var elem = document.getElementsByName('occupationOther')[0];
        if (val == 'other') {
          // then set it
            elem.style.display = 'block';
        } else {
            elem.style.display = 'none';
        }
        //console.log();
    });

    // ask to explain modal
    var cancelButt = document.getElementById('cancelButton');
    cancelButt.addEventListener("click", function() {
        // if confirm is yes, window.location is google
        if (confirm('Do you really want to leave? I thought we had something special...')) {
            window.location = 'http://www.google.com';
        }
    });

    var submitButt = document.getElementById('submit');
    signUpForm.addEventListener('submit', function() {
        var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
        if (document.getElementById('occupation').value == 'other') {
            requiredFields.push('occupationOther');
        }

        var valid = true;

        for (i = 0; i < requiredFields.length; i++) {
            // check if each required field is valid
            var field = requiredFields[i];
            valid &= validateRequiredField(field);
        }
        if (!valid) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            event.returnValue = false;
            return false;
        }
        /*
        if (valid){
            submit;
        } else {
            event.preventDefault();
        }*/
    });


});