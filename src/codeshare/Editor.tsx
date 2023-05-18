import React, { useState, useEffect, useCallback } from 'react';
import { basicSetup } from 'codemirror';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { getDocument } from './socket';
import { collabExtension } from './collabExtension';
import { IDirectory, ITextFile } from '../interfaces/dto';
import { useCodeSharingHub } from '../hooks';

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
  connected: boolean
}

const Editor: React.FC<EditorProps> = ({ file, repository, setFiles, files, connected }) => {
  const [editor, setEditor] = useState(defaultEditor);
  const codeHub = useCodeSharingHub();

  console.log(files)

  const handleChange = useCallback((value: string, viewUpdate: any) => {
    setFiles(prev => new Map(prev.set(file.id.toString(), { ...file, text: value })));
    codeHub.change(repository.id, file.id, value);
  }, [codeHub, file, repository.id, setFiles]);

  useEffect(() => {
    setEditor(defaultEditor);
    if (connected) {
      getDocument(repository.id, file.id).then(({ version, doc }) => {
        setFiles(prev => new Map(prev.set(file.id.toString(), { ...file, text: doc })));
        setEditor(
          <CodeMirror style={{
            display: 'flex',
            flexGrow: 1,
          }}
            width='100%'
            theme='dark'
            value={doc}
            onChange={handleChange}
            extensions={[basicSetup, langs.javascript(), collabExtension(version, repository.id, file.id)]}
          />
        );
      });
    }
  }, [repository, file, connected, setFiles, handleChange]);

  return editor;
};

export default Editor;