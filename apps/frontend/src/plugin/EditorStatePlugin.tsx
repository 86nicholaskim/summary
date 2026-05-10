import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { editorStore } from '../store/editorStore';
import type { SerializedEditorState } from 'lexical';

export default function EditorStatePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorStore.setAST(editorState.toJSON() as SerializedEditorState);
    });
  }, [editor]);

  return null;
}