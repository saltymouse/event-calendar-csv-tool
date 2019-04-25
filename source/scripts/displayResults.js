import Papa from 'papaparse';

// ページ内の要素
const jsonBox = document.querySelector('#json');
const csvBox = document.querySelector('#csv');

/**
 * ページ内の入力欄に結果を表示する
 * @param {string} data - 結果になるJSONデーター
 */
export default function displayResults(data) {
  const jsonOutput = JSON.stringify(data, null, 2);
  jsonBox.value = jsonOutput;

  const csvOutput = Papa.unparse(jsonOutput);
  csvBox.value = csvOutput;
}

// export default 'displayResults';
