//extern modules
import chalk from 'chalk'
import inquirer from 'inquirer'
//intern modules
import fs from 'fs'

console.log('Starting the Accounts')
let accountLog=''

function operation(){
    inquirer// this function inquirer.prompt is used to create menus in the console
    .prompt([
        {
            type: 'list',//type of wich menu you want to create
            name: 'action',//saves the users answer
            message: 'What do you want ?',//message that will appear to the user in the console 
            
            choices: [
                'Create account',
                'Enter in your account',
                'Check balance',
                'Deposit',
                'Withdraw',
                'Exit'
            ]//the choices of the list, as declared befored.
        }
    ]).then((answer)=>{
        console.log(answer.action)
        if(answer.action === 'Create account'){
            console.log(chalk.bgGreen.black("Congrats, let's start the proccess"))
            console.log(chalk.green('First we need some informations:'))
            account_datas()

        }

        else if(answer.action==='Enter in your account'){
            console.log(chalk.green('First we need some informations:'))
            signIn()
        }


        else if(answer.action==='Check balance'){
            if(accountLog!=''){
                console.log(chalk.greenBright(`Checking balance of ${accountLog} account`))
            }
            else{
                console.log(chalk.bgRed.black('Please first enter in one account'))
                operation()
            }
            

        }

        else if(answer.action==='Deposit'){
            if(accountLog!=''){
                console.log(chalk.greenBright(chalk.bgWhite.black(`Starting deposit to ${accountLog} account`)))
                setTimeout(()=>{
                    deposit()
                },2000)
            }
            else{
                console.log(chalk.bgRed.black('Please first enter in one account'))
                operation()
            }

        }

        else if(answer.action==='Withdraw'){

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
            account_datas()
        }
        else{
            if(!fs.existsSync('accounts')){
                fs.mkdirSync('accounts')
            }
            if(fs.existsSync(`accounts/${answers.owner}(${answers.cpf}).json`)){
                console.log(chalk.bgRed.black('Erro this account already exist, please choose another name'))
                account_datas()
                
            }
            else {
                fs.writeFileSync(`accounts/${answers.owner}(${answers.cpf}).json`, '{"balance": 0}', (err)=>{
                    console.log(err)
                })
            console.log(chalk.bgCyan.blackBright('Succesfully registered, welcome to our bank'))
            operation()
        }
    }
        
    })
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
            signIn()
        }
        else{
            if(fs.existsSync(`accounts/${answers.owner}(${answers.cpf}).json`)){
                console.log(`Sign in procces succesfully, welcome: ${answers.owner}`)
                accountLog=`accounts/${answers.owner}(${answers.cpf}).json`
                operation()
            }
            else {
                console.log(chalk.bgRed.black('This account does not exist please restart the process'))
                operation()
        }
    }
        
    })
    .catch((err)=>{
        console.log(err)
    })
}

//Checking the account balance




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
        console.log(answer.amount)
        //add amount

    })
    .catch((err)=>{
        console.log(err)
    })
}


//add amount
function addAmount(accountName, amount){

}




operation()