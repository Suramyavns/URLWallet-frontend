import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scanner } from "@yudiel/react-qr-scanner";
import PropTypes from "prop-types";
import { useState } from "react";

const Modal = ({ isOpen, setIsOpen, setURL }) => {
  const [isCameraAllowed, setIsCameraAllowed] = useState(false);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(false); 

  const handlePermissionRequest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraAllowed(true);
      setShowScanner(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      setError('Camera access denied. Please enable camera permissions in your device settings.');
      console.error(err);
    }
  };

  const checkPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'camera' });
      if (permission.state === 'granted') {
        setIsCameraAllowed(true);
        setShowScanner(true);
      } else if (permission.state === 'prompt') {
        // The permission is neither granted nor denied; show a prompt to the user.
        handlePermissionRequest();
      } else if (permission.state === 'denied') {
        setError('Camera access denied. Please enable camera permissions in your device settings.');
      }
    } catch (error) {
      console.error('Permission query error:', error);
      setError('An error occurred while checking camera permissions.');
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);

  // Check permission when modal opens
  if (isOpen && !isCameraAllowed) {
    checkPermission();
  }

  return (
    <div className="flex justify-center items-center">
      {isOpen && (
        <div
          style={{ color: "#D499B9" }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleModal}
        >
          <div
            style={{ backgroundColor: '#011638', height: '70%' }}
            className="flex flex-col justify-between p-8 rounded-xl shadow-lg w-11/12 sm:w-96 transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl flex items-center gap-2 font-semibold mb-4">
              <FontAwesomeIcon icon={faQrcode} />
              Scan to get URL
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            {!showScanner ? (
              <>
                <p className="text-gray-300 mb-2">Please allow camera access to scan QR codes.</p>
                <button
                  style={{ backgroundColor: '#2E294E', color: "#D499B9" }}
                  className="px-4 py-2 my-4 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handlePermissionRequest} type="button">
                  Enable Camera
                </button>
              </>
            ) : (
              <Scanner onScan={(result) => setURL(result.text)} />
            )}
            <button
              style={{ backgroundColor: '#2E294E', color: "#D499B9" }}
              className="px-4 py-2 my-4 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes for the Modal component
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setURL: PropTypes.func.isRequired,
};

export default Modal;