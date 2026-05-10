import { observer } from 'mobx-react-lite';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { editorStore } from '../store/editorStore';
import { usePrint } from '../plugin/PrintPlugin';
import { Table, Printer } from 'lucide-react';

const Toolbar = observer(() => {
  const [editor] = useLexicalComposerContext();
  const { handlePrint } = usePrint();

  const insertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      rows: '3',
      columns: '3',
    });
  };

  return (
    <div className="toolbar">
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