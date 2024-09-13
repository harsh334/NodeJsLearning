const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const calculate = (num1, num2, operator) => {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      return 'Invalid operator';
  }
};


const promptUser = () => {
  rl.question('Enter first number: ', (firstInput) => {
    const num1 = parseFloat(firstInput);

    rl.question('Enter operator (+, -, *, /): ', (operator) => {
      rl.question('Enter second number: ', (secondInput) => {
        const num2 = parseFloat(secondInput);

        const result = calculate(num1, num2, operator);
        console.log(`Result: ${num1} ${operator} ${num2} = ${result}`);

        rl.question('Do you want to perform another calculation? (y/n): ', (answer) => {
          if (answer.toLowerCase() === 'y') {
            promptUser();
          } else {
            rl.close();
          }
        });
      });
    });
  });
};

promptUser();
