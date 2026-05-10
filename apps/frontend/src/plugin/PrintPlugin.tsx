import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import printJS from 'print-js';

const PRINT_CONTAINER_ID = '__lexical_print_target__';

/**
 * 인쇄용 컨테이너를 가져오거나 생성합니다.
 * 초기 상태는 display: none으로 설정하여 렌더링 성능을 최적화합니다.
 */
const getPrintContainer = (): HTMLElement => {
  let container = document.getElementById(PRINT_CONTAINER_ID);

  if (!container) {
    container = document.createElement('div');
    container.id = PRINT_CONTAINER_ID;
    // 기본적으로 렌더링 트리에서 제외 (성능 최적화)
    container.style.display = 'none';
    // 만약의 노출을 대비해 위치도 화면 밖으로 고정
    container.style.position = 'fixed';
    container.style.top = '-9999px';
    document.body.appendChild(container);
  }

  return container;
};

export function usePrint() {
  const [editor] = useLexicalComposerContext();

  const handlePrint = () => {
    editor.getEditorState().read(() => {
      const html = $generateHtmlFromNodes(editor);
      const container = getPrintContainer();

      // 1. 컨테이너 준비: HTML 주입 및 렌더링 활성화
      container.innerHTML = html;
      container.style.display = 'block';

      printJS({
        printable: PRINT_CONTAINER_ID,
        type: 'html',
        scanStyles: true,
        // 인쇄 창이 뜨기까지의 시간을 고려해 약간의 여유를 두고 정리하는 콜백
        onPrintDialogClose: () => {
          // 2. 인쇄 완료 후 다시 렌더링 트리에서 제거 및 내용 비우기
          container.style.display = 'none';
          container.innerHTML = '';
        },
        onError: (err) => {
          console.error('Print failed:', err);
          container.style.display = 'none';
          container.innerHTML = '';
        },
      });
    });
  };

  return { handlePrint };
}
