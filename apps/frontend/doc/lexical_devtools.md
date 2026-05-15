# Lexical DevTools (`window.__lexical`)

개발 모드(`import.meta.env.DEV`)에서만 활성화되는 전역 디버깅 인터페이스입니다.

---

## 플러그인 설치

```tsx
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
```

```tsx
// Editor.tsx — 플러그인 등록
{
  import.meta.env.DEV && <DevToolsPlugin />;
}
```

> Vite는 빌드 시 `import.meta.env.DEV`를 `false`로 인라인하므로,  
> 프로덕션 번들에는 DevToolsPlugin 코드가 포함되지 않습니다.

---

## API 레퍼런스

### `editor`

raw editor 인스턴스를 그대로 노출한 것입니다.  
Lexical의 모든 API에 직접 접근할 수 있어서, 콘솔에서 `registerUpdateListener`, `dispatchCommand`, `focus` 등을 즉석으로 호출할 수 있습니다.

```js
window.__lexical.editor.focus();
window.__lexical.editor.isEditable();
```

---

### `getEditorState()`

현재 EditorState를 JSON 문자열로 직렬화해 반환합니다.  
내부적으로 `editor.getEditorState().toJSON()`을 호출하고 `JSON.stringify`로 pretty-print합니다.  
노드 트리 전체 구조를 한눈에 확인하거나, 상태를 복사해서 재현할 때 씁니다.

```js
window.__lexical.getEditorState();
// '{ "root": { "children": [...], "type": "root", ... } }'
```

---

### `getSelection()`

현재 선택 영역(커서 포함)의 Selection 객체를 반환합니다.  
`editorState.read()` 안에서 `$getSelection()`을 호출하므로 읽기 컨텍스트가 올바르게 보장됩니다.

반환 타입은 선택 방식에 따라 달라집니다.

| 타입             | 설명                  |
| ---------------- | --------------------- |
| `RangeSelection` | 일반 텍스트 범위 선택 |
| `NodeSelection`  | 노드 단위 선택        |
| `GridSelection`  | 테이블 셀 범위 선택   |
| `null`           | 선택 없음             |

```js
window.__lexical.getSelection();
// RangeSelection { anchor: {...}, focus: {...}, format: 0, ... }
```

---

### `getRoot()`

EditorState의 루트 노드(`RootNode`)를 반환합니다.  
모든 노드 트리의 시작점이며, 여기서 `getChildren()`을 타고 내려가며 트리 구조를 탐색할 수 있습니다.

```js
window.__lexical.getRoot();
// RootNode { __key: 'root', __children: ['1', '2', ...], ... }

window.__lexical.getRoot().getChildren();
// [ParagraphNode, HeadingNode, ...]
```

---

### `getNodeByKey(key)`

노드 `__key` 값으로 특정 노드를 바로 꺼냅니다.  
`getEditorState()`나 `getRoot()`로 트리를 훑다가 관심 있는 노드의 key를 발견했을 때 빠르게 집어오는 용도입니다.

```js
window.__lexical.getNodeByKey('3');
// ParagraphNode { __key: '3', __children: ['4'], __parent: 'root', ... }
```

---

### `logState()`

EditorState JSON, Root 노드, Selection 세 가지를 `console.group`으로 묶어서 한 번에 출력합니다.  
나머지 메서드가 개별 조회용이라면, 이건 현재 상태를 한 번에 스냅샷 찍을 때 쓰는 편의 메서드입니다.

```js
window.__lexical.logState();
// ▼ [Lexical DevTools]
//     EditorState JSON: { root: { ... } }
//     Root: RootNode { ... }
//     Selection: RangeSelection { ... }
```

---

## 주의사항

`getSelection()` / `getRoot()` / `getNodeByKey()`는 모두 `editorState.read()` 컨텍스트 안에서 실행되기 때문에  
반환된 노드 객체는 **읽기 전용 스냅샷**입니다.

노드를 직접 변경하려면 `editor.update()` 안에서 따로 조작해야 합니다.

```js
window.__lexical.editor.update(() => {
  const root = $getRoot();
  // 여기서 노드 변경
});
```
