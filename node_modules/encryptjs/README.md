# encryptjs


A library to encrypt and decrypt a string

usuage:

          npm install encryptjs --save-dev     in your project folder

Import the module using require command

          var encrypt=require('encryptjs');

To encrypt the string , we need a plain text and a "secret key", the same "secret key" is used to decrypt the cipher text.

          var secretkey='ios';
          var plaintext='apple';
          var cipherText =encrypt.encrypt(plaintext,secretkey,256);
          console.log(cipherText+" ****************** ");
          var decipher=encrypt.decrypt(cipherText,secretkey,256);
          console.log("Deciphered Text is : "+decipher);
          
<b> To get the string from console , encrypt & write to a text file : </b>

          var secretkey='ios';
          var filePath="./encrypted.txt";
          encrypt.getTextEncryptAndSaveToTextFile(filePath,secretkey,256);
          
Enter the text to be encrypted in console prompt, ciphred text will be saved in your given file path as <b> ".txt" </b> format

<b> To get the string from console, encrypt & write to a JSON file : </b>

          var secretkey='ios';
          var filePath="./encryptedData.JSON";
          encrypt.getTextEncryptAndSaveToJSONFile(filePath,secretkey,256);
          
Enter the text to be encrypted in console.prompt, ciphred text will be saved in your given file path as <b> ".JSON" </b> format

Common method to decrypt the cipher text in both cases.

          var decipher=encrypt.decrypt(cipherText,secretkey,256);

          
<b> Available functions:</b>

          encrypt(plaintext,secretkey,bit): To encrypt the string 
          decrypt(ciphertext,secretkey,bit): To decrypt the string 
          getTextEncryptAndSaveToTextFile(filePath,secretkey,bit): Gets text from command line, encrypts & writes to Text file
          getTextEncryptAndSaveToJSONFile(filePath,secretkey,bit): Gets text from command line, encrypts & writes to JSON file 

Bit value can be <b> 128, 192 & 256 </b>