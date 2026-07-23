import chalk from 'chalk';
import { argv } from 'process';

const isGreet = argv.includes('--greet');

if (isGreet) {
    console.log(chalk.blue('Hello, welcome to the program!'))
} else {
    console.log(chalk.green('Berhasil!'));
    console.log(chalk.red('Error!'));
    console.log(chalk.blue('Info!'));
}
