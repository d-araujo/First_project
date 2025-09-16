export default {account_datas, signIn, checkBalance, deposit, withdraw, addAmount, removeAmount}


import fs from 'fs'
import chalk from 'chalk'
import inquirer from 'inquirer'




//defining the account datas
function account_datas(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'owner',
            message: 'What is your name ?', 

        },
        
        {
            type: 'input',
            name: 'cpf',
            message: 'Insert here your cpf number:'
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: (answers)=>
                `Do you confirm your datas: name:${answers.owner} and cpf:${answers.cpf}`
                
            ,
            default: true

        }

    ])
    .then((answers)=>{
        if(!answers.confirm){
            console.log('So please correct your datas')
            account_datas()
        }
        else{
            if(!fs.existsSync('accounts')){
                fs.mkdirSync('accounts')
            }
            if(fs.existsSync(`accounts/${answers.owner}(${answers.cpf}).json`)){
                console.log(chalk.bgRed.black('Erro this account already exist, please restart the procces'))
                welcome()
                
            }
            else {
                fs.writeFileSync(`accounts/${answers.owner}(${answers.cpf}).json`, '{"balance": 0}', (err)=>{
                    console.log(err)
                })
            console.log(chalk.bgCyan.blackBright('Succesfully registered, welcome to our bank'))
            accountLog=`accounts/${answers.owner}(${answers.cpf}).json`
            }
            user=answers.owner
            operation()
        }
    }
        
    )
    .catch((err)=>{
        console.log(err)
    })
}











//Enter in the account
function signIn(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'owner',
            message: 'What the account name ?', 

        },
        
        {
            type: 'input',
            name: 'cpf',
            message: 'Insert account cpf number:'
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: (answers)=>
                `Do you confirm your datas: name:${answers.owner} and cpf:${answers.cpf}`
                
            ,
            default: true

        }

    ])
    .then((answers)=>{
        if(!answers.confirm){
            console.log(chalk.bgRed.black('Ok so please correct your datas.'))
            signIn()
        }
        else{
            if(fs.existsSync(`accounts/${answers.owner}(${answers.cpf}).json`)){
                console.log(`Sign in procces succesfully, welcome: ${answers.owner}`)
                accountLog=`accounts/${answers.owner}(${answers.cpf}).json`
                user=answers.owner
                operation()
            }
            else {
                console.log(chalk.bgRed.black('This account does not exist please restart the process'))
                welcome()
        }
    }
        
    })
    .catch((err)=>{
        console.log(err)
    })
}











//Checking the account balance
function checkBalance(){
    //reading the file and encoding to utf8 to avoid errors
    const accountData = fs.readFileSync(accountLog, 'utf8');
    const account = JSON.parse(accountData);
    console.log(chalk.bgWhite.black(`Your account balance is:${account.balance}`))
    operation()

}











//Deposit function
function deposit() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'How much do you want to deposit:'
        }
    ])
    .then((answer)=>{
        if(isNaN(answer.amount)===true || parseFloat(answer.amount)<0){
            console.log('Please type a positive number')
            deposit()
        }
        else{
            addAmount(answer.amount)
            console.log('Deposited with success')
            operation()
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}









//withdraw
function withdraw(){
    inquirer
    .prompt([
        {
            type:'input',
            name:'amount',
            message:'How much do you want to withdraw ?'
        }
    ])
    .then((answer)=>{
        if(isNaN(answer.amount)===true){
            console.log('Please type a number')
            withdraw()
        }
        else{
            removeAmount(answer.amount)
            console.log('Withdraw with success')
            operation()
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}









//add amount
function addAmount(amount){
    //reading the file and encoding to utf8 to avoid errors
    const accountData = fs.readFileSync(accountLog, 'utf8');
    const account = JSON.parse(accountData);
    //adding the amount to the balance
    account.balance+=parseFloat(amount)
    //saving the new value into the file
    fs.writeFileSync(accountLog, JSON.stringify(account))
}







//remove amount
function removeAmount(amount){
    //reading the file and encoding to utf8 to avoid errors
    const accountData = fs.readFileSync(accountLog, 'utf8');
    const account = JSON.parse(accountData);//converting string to object
    //removing the amount to the balance
    account.balance-=parseFloat(amount)
    //saving the new value into the file
    fs.writeFileSync(accountLog, JSON.stringify(account))
}