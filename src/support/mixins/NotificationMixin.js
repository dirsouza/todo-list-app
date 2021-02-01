import i18n from 'Plugin/i18n';

const dialogOkTitle = 'dialog-ok-title';
const dialogContent = 'dialog-content';
const confirmButtonClass = 'dialog-confirm-button-class';

/**
 * @type {{
 *  toast: boolean,
 *  showConfirmButton: boolean,
 *  timer: number,
 *  timerProgressBar: boolean,
 *  position: string,
 * }}
 */
const defaultToastProps = {
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  position: 'top-end',
};

/**
 * @param {String} title
 * @param {String} text
 */
function genHtml(title, text) {
  return `
    <div style="text-align: left; margin-left: 15px">
      <strong>${title}</strong><br>
      ${text}
    </div>
  `;
}

export default {
  methods: {
    showErrorToast({
      title = `${i18n.t('commons.error')}!`,
      text,
    }) {
      return this.$swal({
        ...defaultToastProps,
        html: genHtml(title, text),
        icon: 'error',
        customClass: {
          title: dialogOkTitle,
          content: dialogContent,
          confirmButton: confirmButtonClass,
        },
      });
    },
    showSuccessToast({
      title = `${i18n.t('commons.success')}!`,
      text,
    }) {
      return this.$swal({
        ...defaultToastProps,
        html: genHtml(title, text),
        icon: 'success',
        customClass: {
          title: dialogOkTitle,
          content: dialogContent,
          confirmButton: confirmButtonClass,
        },
      });
    },
    showConfirmDeleteDialog({
      title,
      text,
    }) {
      return this.showConfirmDialog({
        title,
        text,
      });
    },
    showConfirmDialog({
      title,
      text,
      confirmButtonText = 'Confirmar',
      cancelButtonText = 'Cancelar',
      confirmButtonColor = '#FFFFFF',
      cancelButtonColor = '#FFFFFF',
      customClassTitle = 'dialog-confirm-title',
      contentClass = dialogContent,
      headerClass = 'dialog-header',
      actionsClass = 'dialog-actions',
      input,
      inputPlaceholder,
      inputValidator,
      width = '27em',
    }) {
      return this.$swal({
        title,
        text,
        confirmButtonText,
        cancelButtonText,
        confirmButtonColor,
        cancelButtonColor,
        showCancelButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width,
        input,
        inputPlaceholder,
        inputValidator,
        customClass: {
          title: customClassTitle,
          header: headerClass,
          content: contentClass,
          actions: actionsClass,
          confirmButton: confirmButtonClass,
          cancelButton: 'dialog-cancel-button-class',
        },
      });
    },
  },
};
