import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg }) => {
  return (
    <div className='alert alert-info alert-dismissible fade show h6' role='alert'>
      <p style={{textAlign : 'center'}}>File Uploaded to Succefully. Hash Value Shown below!</p>
      <p style={{textAlign : 'center'}}><b>{msg}</b></p>
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
