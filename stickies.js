const fs = require('fs');
const { generateTag } = require('../generateTag.js');
const { parseCSV } = require('../parseCSV.js');

const randomNumber = (start, end) => {
  const difference = end - start;
  return Math.floor(Math.random() * difference) + start;
};

const color = () => {
  const rgb = Array(3).fill(0).map((element) => randomNumber(0, 150));
  return 'rgb(' + rgb.join(',') + ')';
};

const width = () => randomNumber(200, 300) + 'px';

const rotate = () => 'rotate(' + randomNumber(-30, 30) + 'deg)';

const generateSticky = function (sticky) {
  return generateTag('div', [
    { name: 'class', value: 'sticky' },
    {
      name: 'style', value: [
        { name: 'width', value: width() },
        { name: 'background-color', value: color() },
        { name: 'transform', value: rotate() }]
    }
  ], sticky.message);
};

const main = function (csvFile, templateFile) {
  const messages = parseCSV(fs.readFileSync(csvFile, 'utf8').split('\n'), '|');
  const template = fs.readFileSync(templateFile, 'utf8');

  const stickies = messages.map(generateSticky).join('');
  const html = template.replace('__STICKIES__', stickies);
  fs.writeFileSync('./index.html', html, 'utf8');
};

while (true) {
  main('./messages.csv', './template.html')
};
