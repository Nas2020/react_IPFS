import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileDownload = () => {

    const [hash, setHash] = useState('');
    const [waiting, setWaiting] = useState(false);

    const onChange = e => {
        setHash(e.target.value);
        console.log(e.target.value)
      };

      //Limitation: File downloaded thorugh Axios is .jpeg format and saved into yuor computer's download folder.
      //Please change the file extension to your appropriate file extension. Still yet to find out how to download all types of extension.
    const onSubmit =  e => {
    e.preventDefault();
    setWaiting(true);
    console.log(hash);
    const method = 'GET';
    const url = `https://gateway.ipfs.io/ipfs/${hash}`;
    axios
    .request({
      url,
      method,
      responseType: 'blob', //important
    })
    .then(({ data }) => {
      setWaiting(false);
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'file.jpeg'); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(function (error) {
        setWaiting(false);
        console.log(error);
    });
  };

  

  return (
    <Fragment>
   

    <div className="input-group mb-3 mt-4">
        <input type="text" className="form-control" placeholder="Key in Hash of the file" 
        aria-label="HashValue" aria-describedby="basic-addon2" onChange={onChange} />
        <div className="input-group-append">
    <button className="btn btn-outline-secondary" type="button" onClick={onSubmit}>
        FileDownload</button>
        </div>
        <div>{waiting && <p><b>Downloading...please wait </b></p>}</div>
  </div>
    </Fragment>
  );
};

export default FileDownload;