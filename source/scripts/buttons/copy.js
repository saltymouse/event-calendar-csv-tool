import ClipboardJS from 'clipboard';

const copyButtons = new ClipboardJS('.copy');

copyButtons
  .on('success', (e) => {
    e.trigger.classList.add('btn-success');
  })
  .on('error', (e) => {
    e.trigger.classList.add('btn-error');
  });
