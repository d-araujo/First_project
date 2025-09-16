//extern modules
import chalk from 'chalk'
import inquirer from 'inquirer'
//intern modules
import fs from 'fs'

console.log('Starting Accounts')
let accountLog=''
let user=''







//sing up and login
function welcome(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do ?',

            choices: ['Create an account', 'Log into an account', 'Exit']
        }
    ])
    .then((answer)=>{
            console.log(answer.action)
            if(answer.action === 'Create an account'){
                console.log(chalk.bgGreen.black("Congrats, let's start the procces"))
                console.log(chalk.green('First we need some information:'))
                account_datas()

            }

            else if(answer.action==='Log into an account'){
                console.log(chalk.green('First we need some informations:'))
                signIn()

            }

            else if(answer.action==='Exit'){
                console.log(chalk.bgWhiteBright.black('Thanks for using our bank.'))
                process.exit()
            }
})
}










//menu
function operation(){
     console.log(`Welcome to your account: ${user}`),
    inquirer// this function inquirer.prompt is used to create menus in the console
    .prompt([
        {
            type: 'list',//type of wich menu you want to create
            name: 'action',//saves the users answer
            message: 'What would you like to do ?',//message that will appear to the user in the console 
            
            choices: [
                'Check balance',
                'Deposit',
                'Withdraw',
                'Switch account',
                'Exit'
            ]//the choices of the list, as declared befored.
        }
    ]).then((answer)=>{
       


         if(answer.action==='Check balance'){
                console.log(chalk.greenBright(`Checking balance of ${user} account`))
                setTimeout(()=>{
                    checkBalance()
                },2000)
            
        }

        else if(answer.action==='Deposit'){
                console.log(chalk.greenBright(chalk.bgWhite.black(`Starting deposit into ${user} account`)))
                setTimeout(()=>{
                    deposit()
                },2000)
            }


        else if(answer.action==='Withdraw'){
            console.log(chalk.greenBright(chalk.bgWhite.black(`Starting withdraw from ${user} account`)))
                setTimeout(()=>{
                    withdraw()
                },2000)

        }

        else if(answer.action==='Switch account'){
                console.log('Logging out of the account...')
                accountLog=''
                user=''
                welcome()
            }

        else if(answer.action==='Exit'){
                console.log(chalk.bgWhiteBright.black('Thanks for using our bank.'))
                process.exit()
            }

    })
    .catch((err)=> console.log(err))
}













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
            message: 'Enter your cpf number:'
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: (answers)=>
                `Do you confirm this information: name:${answers.owner} and cpf:${answers.cpf}`
                
            ,
            default: true

        }

    ])
    .then((answers)=>{
        if(!answers.confirm){
            console.log('So please correct your information')
            account_datas()
        }
        else{
            if(!fs.existsSync('accounts')){
                fs.mkdirSync('accounts')
            }
            if(fs.existsSync(`accounts/${answers.owner}(${answers.cpf}).json`)){
                console.log(chalk.bgRed.black('Error, this account already exist, please restart the procces'))
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
            setTimeout(()=>{
                operation()
            },2000)
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
            message: 'What is the account name ?', 

        },
        
        {
            type: 'input',
            name: 'cpf',
            message: 'Enter the account cpf number:'
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: (answers)=>
                `Do you confirm this information: name:${answers.owner} and cpf:${answers.cpf}`
                
            ,
            default: true

        }

    ])
    .then((answers)=>{
        if(!answers.confirm){
            console.log(chalk.bgRed.black('Ok so please correct your information.'))
            signIn()
        }
        else{
            if(fs.existsSync(`accounts/${answers.owner}(${answers.cpf}).json`)){
                console.log(`Sign in successful, welcome: ${answers.owner}`)
                accountLog=`accounts/${answers.owner}(${answers.cpf}).json`
                user=answers.owner
            setTimeout(()=>{
                operation()
            },2000)
            }
            else {
                console.log(chalk.bgRed.black('This account does not exist please restart the process'))
            setTimeout(()=>{
                welcome()
            },2000)
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
    setTimeout(()=>{
        operation()
    },2000)

}











//Deposit function
function deposit() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'How much would you like to deposit:'
        }
    ])
    .then((answer)=>{
        if(isNaN(answer.amount)===true || parseFloat(answer.amount)<0){
            console.log('Please type a positive number')
            deposit()
        }
        else{
            addAmount(answer.amount)
            console.log('Deposited successful')
            setTimeout(()=>{
                operation()
            },2000)
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
            message:'How much would you like to withdraw ?'
        }
    ])
    .then((answer)=>{
        if(isNaN(answer.amount)===true){
            console.log('Please type a number')
            withdraw()
        }
        else{
            removeAmount(answer.amount)
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
    if(amount>account.balance){
        console.log('Insuficient balance, please enter a valid one.')
        withdraw()
    }
    else{
        account.balance-=parseFloat(amount)
        //saving the new value into the file
        fs.writeFileSync(accountLog, JSON.stringify(account))
        console.log('Withdraw successful')
         setTimeout(()=>{
                operation()
            },2000)
    }
}

welcome()