import React, { Fragment, useState } from 'react';
import Message from './Message';
import FileDownload from './FileDownload';
import ipfs from '../ipfs';

const FileUpload = () => {
  const [hashValue, sethashValue] = useState("");
  
  const [upLoadingMsg, setupLoadingMsg] = useState("");
  const [docBuffer, setdocBuffer] = useState(null);
  const [filename, setFilename] = useState('Choose File');

 

  const onChange = e => {
    setFilename(e.target.files[0].name);
    e.preventDefault();
    
    const doc = e.target.files[0];
    const bufferdReader = new window.FileReader();
    bufferdReader.readAsArrayBuffer(doc);
    bufferdReader.onloadend = () => {
      setdocBuffer(Buffer(bufferdReader.result));
     
      setupLoadingMsg("File from local server loaded, press Upload Button.");
    };
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    setupLoadingMsg("in process...");

    for await (const result of ipfs.add(docBuffer)) {
      sethashValue(result.path);
    }
  }

  return (
    <Fragment>
      {hashValue ? <Message msg={hashValue} /> : upLoadingMsg}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>
        <input
          type='submit'
          value='Upload'
          className='btn btn-secondary btn-block mt-2'
        /> 
      </form>
      
      <FileDownload />
    </Fragment>
  );
};

export default FileUpload;
