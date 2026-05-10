import { observer } from 'mobx-react-lite';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { editorStore } from '../store/editorStore';
import { usePrint } from '../plugin/PrintPlugin';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Table,
  Printer,
} from 'lucide-react';
import { useState } from 'react';

const Toolbar = observer(() => {
  const [editor] = useLexicalComposerContext();
  const { handlePrint } = usePrint();
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const toggleFormat = (
    format: 'bold' | 'italic' | 'underline' | 'strikethrough',
  ) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    setActiveFormats((prev) => {
      const next = new Set(prev);
      if (next.has(format)) {
        next.delete(format);
      } else {
        next.add(format);
      }

      return next;
    });
  };

  const insertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      rows: '3',
      columns: '3',
    });
  };

  return (
    <div className="toolbar">
      <button
        onClick={() => toggleFormat('bold')}
        className={activeFormats.has('bold') ? 'active' : ''}
        title="굵게 (Ctrl+B)"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => toggleFormat('italic')}
        className={activeFormats.has('italic') ? 'active' : ''}
        title="기울임 (Ctrl+I)"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => toggleFormat('underline')}
        className={activeFormats.has('underline') ? 'active' : ''}
        title="밑줄 (Ctrl+U)"
      >
        <Underline size={16} />
      </button>
      <button
        onClick={() => toggleFormat('strikethrough')}
        className={activeFormats.has('strikethrough') ? 'active' : ''}
        title="취소선"
      >
        <Strikethrough size={16} />
      </button>

      <div className="toolbar-divider" />

      <button onClick={insertTable} title="테이블 삽입">
        <Table size={16} />
      </button>
      <button
        onClick={handlePrint}
        disabled={!editorStore.hasContent}
        title="인쇄"
      >
        <Printer size={16} />
      </button>
    </div>
  );
});

export default Toolbar;
