let quizQuestions = [
    {
        text: 'What is the index of the third value in an array?',
        options: ['0', '1', '2', '3'],
        answer: '2',
    },

    {
        text: 'Which of the following is a logical operator?',
        options: ['===', '&&', '!=', '<'],
        answer: '&&',
    },

    {
        text: 'The code block of a function is stored within which of the following?',
        options: ['parentheses', 'square brackets', 'quotation marks', 'curly brackets'],
        answer: 'curly brackets',
    },

    {
        text: 'What keyword would you use to declare a variable that will never change?',
        options: ['var', 'let', 'const', 'static'],
        answer: 'const',
    },

    {
        text: 'Which data type would you use to store a collection of properties?',
        options: ['function', 'object', 'array', 'none of the above'],
        answer: 'object',
    }
];
console.log(quizQuestions)
let optionsNode = document.createElement('button')
optionsNode.setAttribute('class','button')
optionsNode.setAttribute('value', options)

optionBtn.textContent = 1 + 1 + '.' + option
optionsId.appendChild(optionsNode)