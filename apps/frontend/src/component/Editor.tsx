import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/RichTextPlugin';
import { ContentEditable } from '@lexical/react/ContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

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
