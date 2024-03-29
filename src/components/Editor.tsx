import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { useCodeSharingHub } from '../hooks';

import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { IDirectory, ITextFile } from '../interfaces/dto';

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
}

const Editor: React.FC<EditorProps> = ({ file, repository, setFiles, files }) => {
  const codeHub = useCodeSharingHub();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(file.text);
  }, [file, file.text]);

  const handleChange = (newValue: string) => {
    // codeHub.change(newValue, repository.id, file.id);
    setValue(newValue);

    const text = newValue;
    const newFile: ITextFile = {
      ...file,
      text
    };
    setFiles(prev => new Map(prev).set(file.id.toString(), newFile));
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