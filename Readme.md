A simple Command-Line Banking System built with Node.js and Inquirer.
This project simulates a small bank, allowing users to create accounts, log in, deposit, withdraw, and check balances — all directly from the terminal.

✨ Features

📌 Create an account with name and CPF

🔑 Log into an existing account

💰 Deposit money

💸 Withdraw money

📊 Check account balance

🔄 Switch between accounts

🚪 Log out or exit safely

🛠️ Tech Stack

Node.js

Inquirer

FS (File System)
 for account storage in JSON format

📂 How It Works

Each account is saved as a JSON file containing owner name, CPF, and balance.

User interactions happen via Inquirer prompts.

Validations are included for numbers, CPF, and account existence.