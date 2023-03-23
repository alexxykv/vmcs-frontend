import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { Change, ChangeDTO, IDirectory, ITextFile } from '../hubs/CodeSharingHub';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';

import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';

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
  const [incrementor, setIncrementor] = useState<number>(0);

  useEffect(() => {
    setValue(file.text);
  }, [file, file.text]);

  const handleChange = (newValue: string) => {
    let log = `SEND\n************************\nNew value: ${newValue}\nOld value: ${value}\nConnection id: ${codeHub.Connection.connectionId}\n`;

    const findChange: (oldText: string, newText: string) => Change = (oldText: string, newText: string) => {
      let difPos = 0;
      let maxLength = Math.max(oldText.length, newText.length);
      let fvc = fileVersionControl.get(file.id) as any[];
      let curVersion = fvc[0];
      let changeId = incrementor;
      setIncrementor(prev => prev + 1);
      for (var i = 0; i < maxLength; i++){
        if (i > oldText.length - 1 || i > newText.length - 1 || oldText[i] != newText[i]){
          difPos = i;
          break;
        }
      }

      let toTake = (newText.length - difPos) - (oldText.length - difPos);
      
      let change: Change = {
        position: difPos,
        versionId: curVersion,
        action: 0,
        charsDeleted: -1 * toTake,
        insertedString: "",
        changeId: changeId
      };
      if (oldText.length < newText.length){
        change.action = 1;
        change.insertedString = newText.substring(difPos, toTake + difPos);
        change.charsDeleted = -1;
      }

      let newChanges = fvc[1] as Array<Change>;
      newChanges.push(change);

      fileVersionControl.set(file.id, [curVersion, newChanges]);
      return change;
    };
    
    const dto: ChangeDTO = { 
      directoryId: repository.id,
      fileId: file.id,
      change: findChange(value, newValue),
      connectionId: codeHub.Connection.connectionId as string
    }

    log += `CHANGE:\n\tAction: ${dto.change.action}\n\tChangeId:${dto.change.changeId}\n\tCharsDeleted: ${dto.change.charsDeleted}\n\tInsertedString: ${dto.change.insertedString}\n\tPosition: ${dto.change.position}\n\tVersionId: ${dto.change.versionId}\n************************`;

    codeHub.change(dto);
    setValue(newValue);

    log += `\nКонечный текст: ${newValue}`

    const text = newValue;
    const newFile: ITextFile = {
      ...file,
      text
    };
    setFiles(prev => new Map(prev).set(file.id.toString(), newFile));

    console.log(log);
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