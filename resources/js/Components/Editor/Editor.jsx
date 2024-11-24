import React, { useContext, useEffect, useState, useMemo, useLayoutEffect } from "react";
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from "./tools";

const getBlocks = (blocks) => {
  if (typeof blocks === "object") return blocks;

  const emptyBlocks = {
    blocks: [
      {
        id: "WjS0gyKv-U",
        type: "paragraph",
        data: {
          text: '',
        },
      },
    ],
  };
  let res;

  try {
    res = JSON.parse(blocks);
    if (typeof res !== "object") res = emptyBlocks;
    if (res?.blocks.length === 0) res = emptyBlocks; // editors.io bug, readonly mode when blocks is empty array
  } catch (e) {
    res = emptyBlocks;
  }
  return res;
};

export default function Editor({
  blocks,
  getEditorInstance,
  readOnly = false,
  holder = "editor_element"
}) {

  const memoizedHolder = React.useRef(holder);
  const editorJS = React.useRef(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: memoizedHolder.current,
      tools: EDITOR_JS_TOOLS,
      readOnly
    });
    editor.isReady.then(() => {
      editorJS.current = editor;
      if (typeof getEditorInstance === "function") {
        getEditorInstance(editor);
      }
      editorJS.current?.render(getBlocks(blocks));
      // console.log('editor ready',blocks)
    });

    return () => {
      editorJS.current?.destroy();
    };
  }, [holder]);

  return (
    <div className={"prose max-w-none"}>
      <div id={memoizedHolder.current} />
    </div>
  );
}
