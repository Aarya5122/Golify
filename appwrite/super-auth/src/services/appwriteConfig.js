import { Client, Account } from "appwrite";

const client = new Client();
const account = new Account(client);

client
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('63845fedd7eff5e8ccd9') // Your project ID
;

 export default account;