import parseContent from '../parseContent';
import displayResults from '../displayResults';

const inputBox = document.querySelector('#svg');
const convertButton = document.querySelector('#convert');

convertButton.addEventListener('click', () => {
  displayResults(
    parseContent(inputBox.value),
  );
});
