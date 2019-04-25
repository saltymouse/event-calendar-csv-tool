import fileDownload from 'js-file-download';

const jsonBox = document.querySelector('#json');
const csvBox = document.querySelector('#csv');
const downloadButtons = document.querySelectorAll('.download');

// JSONダウンロードボタン
downloadButtons[0].addEventListener('click', () => {
  fileDownload(jsonBox.value, 'event-calendar-mt.json');
});

// CSVダウンロードボタン
downloadButtons[1].addEventListener('click', () => {
  fileDownload(csvBox.value, 'event-calendar-mt.csv');
});
