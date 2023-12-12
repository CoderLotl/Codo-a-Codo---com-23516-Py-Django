import { DataAccess } from "../classes/DataAccess.js"; // Import of the DataAccess class, which interacts with the JSON file.
import { urlTarget } from "../config/config.js"; // Import of the config file.

let nombre;
let email;
let mensaje;
let errorMessageField;
let dataAccess = new DataAccess();

//#region [ EVENT LISTENER ]
document.addEventListener('DOMContentLoaded', async ()=>
{
    errorMessageField = document.getElementById('errorMessage');

    btnClose.addEventListener('click', function()
    {
        dialog.style.display = '';
        dialog.close();
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    });

    document.getElementById('formContacto').addEventListener('submit', async (e)=>
    {
        e.preventDefault();
        const dialog = document.getElementById('dialog');        
        const btnClose = document.getElementById('btnClose');
    
        
        nombre = document.getElementById('name').value;
        email = document.getElementById('email').value;
        mensaje = document.getElementById('message').value;
        if(!ValidateFields())
        {
            errorMessageField.style.visibility = 'unset';
        }
        else
        {
            errorMessageField.style.visibility = 'hidden';            
            // -----
            let payload = {'nombre': nombre, 'email': email, 'mensaje': mensaje}
            console.log(payload);
            let serverResponse = await dataAccess.PostData('http://localhost:8000/enviar_contacto', payload);
            
            let dialogMessage = document.getElementById('dialogMessage');

            if(serverResponse)
            {
                dialogMessage.innerHTML = `Muchas gracias por enviarnos sus comentarios. <br> A la brevedad nos pondremos en contacto con usted :)`;
            }
            else
            {
                dialogMessage.innerHTML = 'No se pudo contactar con el servidor.';
                console.error('No se pudo contactar con el servidor.');
            }
            document.getElementById('dialog').style.display = 'flex';
            dialog.open = true;
        }
    });
});
//#endregion [ EVENT LISTENER ]

//#region [ FUNCTIONS ]
/**
 * Uses a regular expresion to test the value of the variable 'nombre'.
 * Returns true if passes, false if not.
 * @return {bool} 
 */
function ValidateName()
{
    return /^[A-Za-z]+$/.test(nombre);
}

/**
 * Uses a regular expresion to test the value of the variable 'email', using the standard structure of an email address.
 * Returns true if passes, false if not.
 * @return {bool} 
 */
function ValidateEmail()
{
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Trims the content of the variable 'mensaje' and checks if the content is blank.
 * Returns true if it's not blank, false if it is.
 * @return {bool} 
 */
function ValidateMessage()
{
    return mensaje.trim() === '' ? false : true;
}

/**
 * Runs the validation on every field and collects the amount of errors. Clears any previous error message content and fills it again
 * with the messages of the current errors.
 * Returns true if there are no errors, and false if there's an error at any of the fields.
 * @return {bool} 
 */
function ValidateFields()
{
    let errors = [];
    errors.push(ValidateName());
    errors.push(ValidateEmail());
    errors.push(ValidateMessage());

    errorMessageField.innerHTML = '';
    let errorList = document.createElement('ul');
    errorMessageField.appendChild(errorList);

    if(errors[0] === false)
    {
        errorList.appendChild(document.createElement('li')).textContent = 'Error: debe ingresar un nombre válido.';
    }
    if(errors[1] === false)
    {
        errorList.appendChild(document.createElement('li')).textContent = 'Error: debe ingresar un mail válido.';
    }
    if(errors[2] === false)
    {
        errorList.appendChild(document.createElement('li')).textContent = 'Error: debe ingresar algún mensaje.';
    }

    return errors.every(error => error);
}
//#endregion [ FUNCTIONS ]