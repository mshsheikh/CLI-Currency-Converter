#! /usr/bin/env node
import inquirer from "inquirer";
import fetch from "node-fetch";
console.log("Fetching current currency rates...");
const API_KEY = "448d756aa55af06f90ec5b55"; // Replace with your actual API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;
const currencies = ["PKR", "USD", "GBP", "CHF", "EUR", "KWD", "BHD", "OMR", "AUD", "JPY", "SGD"];
async function getExchangeRates(base) {
    try {
        const response = await fetch(`${API_URL}${base}`);
        if (!response.ok)
            throw new Error("Failed to fetch exchange rates");
        const data = await response.json();
        return data.conversion_rates;
    }
    catch (error) {
        console.error("Error fetching exchange rates:", error);
        return null;
    }
}
const answer = await inquirer.prompt([
    {
        type: "list",
        name: "from",
        choices: currencies,
        message: "Currency to convert from: ",
    },
    {
        type: "list",
        name: "to",
        choices: currencies,
        message: "Currency to convert to: ",
    },
    {
        type: "number",
        name: "amount",
        message: "Enter Amount: ",
    },
]);
const { from, to, amount } = answer;
const rates = await getExchangeRates(from);
if (rates && rates[to] && amount) {
    let result = rates[to] * amount;
    console.log(`Your conversion from ${from} to ${to} is ${result}`);
}
else {
    console.log("Invalid inputs or failed to fetch exchange rates");
}
