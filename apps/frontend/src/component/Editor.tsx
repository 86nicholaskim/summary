import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

export default function Editor() {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'ArchitectEditor',
        onError: (e) => console.error(e),
      }}
    >
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
      </div>
    </LexicalComposer>
  );
}
