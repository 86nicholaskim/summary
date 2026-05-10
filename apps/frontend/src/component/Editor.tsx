import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { LinkNode, AutoLinkNode } from '@lexical/link';

import EditorStatePlugin from '../plugin/EditorStatePlugin';
import Toolbar from './Toolbar';

export default function Editor() {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'ArchitectEditor',
        onError: (e) => console.error(e),
        nodes: [
          HeadingNode,
          QuoteNode,
          ListNode,
          ListItemNode,
          CodeNode,
          CodeHighlightNode,
          TableNode,
          TableCellNode,
          TableRowNode,
          LinkNode,
          AutoLinkNode,
        ],
      }}
    >
      <Toolbar />
      <div className="editor-shell">
        <RichTextPlugin
          contentEditable={<ContentEditable className="content-editable" />}
          placeholder={
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                opacity: 0.5,
              }}
            >
              내용을 입력하세요...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <TablePlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <EditorStatePlugin />
      </div>
    </LexicalComposer>
  );
}
