// plugin/DevToolsPlugin.tsx
import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $getSelection, $getNodeByKey } from 'lexical';

declare global {
  interface Window {
    __lexical?: {
      editor: ReturnType<typeof useLexicalComposerContext>[0];
      getEditorState: () => string;
      getSelection: () => unknown;
      getRoot: () => unknown;
      getNodeByKey: (key: string) => unknown;
      logState: () => void;
    };
  }
}

export default function DevToolsPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    window.__lexical = {
      editor,
      getEditorState: () =>
        JSON.stringify(editor.getEditorState().toJSON(), null, 2),
      getSelection: () => editor.getEditorState().read(() => $getSelection()),
      getRoot: () => editor.getEditorState().read(() => $getRoot()),
      getNodeByKey: (key: string) =>
        editor.getEditorState().read(() => $getNodeByKey(key)),
      logState: () => {
        editor.getEditorState().read(() => {
          console.group('[Lexical DevTools]');
          console.log('EditorState JSON:', editor.getEditorState().toJSON());
          console.log('Root:', $getRoot());
          console.log('Selection:', $getSelection());
          console.groupEnd();
        });
      },
    };

    console.info(
      '%c[Lexical DevTools] window.__lexical 에 연결됨',
      'color: #6b5af6; font-weight: bold;',
    );

    return () => {
      delete window.__lexical;
    };
  }, [editor]);

  return null;
}
