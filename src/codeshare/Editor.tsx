import React, { useState, useEffect } from 'react';
import { basicSetup } from 'codemirror';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { getDocument } from './socket';
import { collabExtension } from './collabExtension';
import { IDirectory, ITextFile } from '../interfaces/dto';

const defaultEditor = (
  <div style={{
    height: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
    color: '#e06c75'
  }}>
    <h4>
      Connect to edit the document...
    </h4>
  </div>
);

interface EditorProps {
  file: ITextFile
  repository: IDirectory
  setFiles: React.Dispatch<React.SetStateAction<Map<string, ITextFile>>>
  files: Map<string, ITextFile>
}

const Editor: React.FC<EditorProps> = ({ file, repository, setFiles, files }) => {
  const [editor, setEditor] = useState(defaultEditor);

  useEffect(() => {
    getDocument(repository.id, file.id).then(({ version, doc }) => {
      setEditor(
        <CodeMirror
          height='500px'
          width='500px'
          theme='dark'
          value={doc}
          extensions={[basicSetup, langs.javascript(), collabExtension(version, repository.id, file.id)]}
        />
      );
    });
  }, [repository.id, file.id]);

  return editor;
};

export default Editor;