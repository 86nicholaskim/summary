import { makeAutoObservable } from 'mobx';
import type { SerializedEditorState, SerializedElementNode  } from 'lexical';

class EditorStore {
  docAST: SerializedEditorState | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAST(ast: SerializedEditorState) {
    this.docAST = ast;
  }

get hasContent(): boolean {
  const children = this.docAST?.root?.children;
  if (!children || children.length === 0) return false;
  return !(children.length === 1 && (children[0] as SerializedElementNode ).children?.length === 0);
}
}

export const editorStore = new EditorStore();