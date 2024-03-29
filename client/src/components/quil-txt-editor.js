import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillTextEditor = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(value);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    setEditorState(value);
  }, [value]);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      });

      const quill = quillRef.current;

      quill.on('text-change', handleTextChange);

      return () => {
        quill.off('text-change', handleTextChange);
        quillRef.current = null;
      };
    }
  }, []);

  const handleTextChange = () => {
    const html = editorRef.current.querySelector('.ql-editor').innerHTML;
    setEditorState(html);
    onChange(html);
  };

  useEffect(() => {
    return () => {
      if (quillRef.current) {
        quillRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={editorRef} />
  );
};

export default QuillTextEditor;
