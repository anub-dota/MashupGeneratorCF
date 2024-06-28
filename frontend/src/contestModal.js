import React from 'react';
import './modal.css';
function SuccessModal({link }) {

  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Success!</h2>
        <p>The contest has been successfully created.</p>
        <div>
        <button onClick={() => window.open(link, '_blank')} className='btn-goto'>Go to Contest</button>
        <button style={{ marginLeft: '10px' }} className='btn-goto' onClick={refreshPage}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
