#! /usr/bin/env node
import inquirer from "inquirer";
console.log("Currency rates are from 20-5-2024.");
let Convertion = {
    "PKR": {
        "USD": 0.0036,
        "GBP": 0.0028,
        "PKR": 1
    },
    "GBP": {
        "USD": 1.27,
        "PKR": 352.73,
        "GBP": 1
    },
    "USD": {
        "PKR": 277.63,
        "GBP": 0.79,
        "USD": 1
    }
};
const answer = await inquirer.prompt([
    {
        type: "list",
        name: "from",
        choices: ["PKR", "USD", "GBP"],
        message: "Currency to: "
    },
    {
        type: "list",
        name: "to",
        choices: ["PKR", "USD", "GBP"],
        message: "Currency in: "
    },
    {
        type: "number",
        name: "amount",
        message: "Enter Amount: "
    }
]);
const { from, to, amount } = answer;
if (from && to && amount) {
    let result = Convertion[from][to] * amount;
    console.log(`Your convertion from ${from} to ${to} is ${result}`);
}
else {
    console.log("Invalid inputs");
}
