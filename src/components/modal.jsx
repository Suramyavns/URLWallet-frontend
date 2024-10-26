import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scanner } from "@yudiel/react-qr-scanner";
import PropTypes from "prop-types";


const Modal = ({ isOpen, setIsOpen, setURL }) => {
  const toggleModal = ()=>{
    setIsOpen(!isOpen);
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
            <Scanner onScan={(result)=>setURL(result.text)} onError={(err)=>alert(err)}/>
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