import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { ChangeDTO, IDirectory, ITextFile } from '../hubs/CodeSharingHub';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';

import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { version } from 'os';

const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css'
];

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal'
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

interface EditorProps {
  file: ITextFile
  repository: IDirectory
  setFiles: React.Dispatch<React.SetStateAction<Map<string, ITextFile>>>
  files: Map<string, ITextFile>
  fileVersionControl: Map<number, any[]>
}

const Editor: React.FC<EditorProps> = ({ file, repository, setFiles, files, fileVersionControl }) => {
  const codeHub = useCodeSharingHub();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(file.text);
  }, [file, file.text]);

  const handleChange = (newValue: string) => {
    const dto: ChangeDTO = { 
      directoryId: repository.id,
      fileId: file.id,
      change: 
    }
    codeHub.change(dto);
    setValue(newValue);

    const text = newValue;
    const newFile: ITextFile = {
      ...file,
      text
    };
    setFiles(prev => new Map(prev).set(file.id.toString(), newFile));

    function CreateChange(){
      let versionId = (fileVersionControl.get(file.id) as any[])[0];
      

    };
  };

  return (
    <AceEditor
      mode='python'
      theme='monokai'
      value={value}
      onChange={handleChange}
      fontSize={14}
      highlightActiveLine={true}
      enableBasicAutocompletion={true}
      enableLiveAutocompletion={true}
      enableSnippets={true}
      setOptions={{ useWorker: false }}
      showGutter={true}
      showPrintMargin={false}
      style={{ display: 'flex', flexGrow: 1, height: '100%' }}
    />
  );
}


export default Editor;