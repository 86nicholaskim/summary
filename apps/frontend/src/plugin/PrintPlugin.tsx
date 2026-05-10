import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import printJS from 'print-js';

export function usePrint() {
  const [editor] = useLexicalComposerContext();

  const handlePrint = () => {
    editor.getEditorState().read(() => {
      const html = $generateHtmlFromNodes(editor);

      const containerId = '__lexical_print_target__';
      let container = document.getElementById(containerId);

      if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.style.display = 'none';
        document.body.appendChild(container);
      }

      container.innerHTML = html;

      printJS({
        printable: containerId,
        type: 'html',
        scanStyles: true,
        onPrintDialogClose: () => {
          container!.innerHTML = '';
        },
      });
    });
  };

  return { handlePrint };
}