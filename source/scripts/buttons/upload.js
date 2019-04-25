const inputBox = document.querySelector('#svg');
const uploadButton = document.querySelector('#upload-file');

// アップロードボタン
uploadButton.addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.readAsText(file);
  reader.onloadend = () => {
    inputBox.value = reader.result;
  };
});
