import { useEffect, useState } from "react"
import { add } from "./api"
import UrlList from "./components/urlList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import Modal from "./components/modal";

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Text copied to clipboard!');
    })
    .catch((err) => {
      alert('Failed to copy! Please try again later')
      console.error('Failed to copy: ', err);
    });
}


export default function App(){
  const [scan,setScan] = useState(false)
  const [url,setUrl] = useState('')
  const [uuid,setUuid]=useState(null)
  const [savedUrls,setUrls]=useState(JSON.parse(localStorage.getItem('ids'))??[])
  useEffect(()=>{
    localStorage.setItem('ids',JSON.stringify(savedUrls))
  },[savedUrls])
  const scannedUrl = (url) =>{
    setUrl(url);
    setScan(!scan)
  }
  const removeUrl = (index) =>{
    const newUrls = savedUrls.filter((_, i) => i !== index); // Create a new array excluding the item at the given index
    setUrls(newUrls);
  }
  const storeUuid = (uuid)=>{
    console.log(uuid)
    setUuid(uuid)
    setUrls(prev=>[...prev,uuid])
  }
  const btnCss = {backgroundColor:'#2E294E',color:"#D499B9"}
  const btnStyle = 'p-2 flex gap-1 items-center bg-blue-600 rounded-lg text-white'
  return(
    <div
    style={{backgroundColor:'#011638'}}
    className="h-screen w-screen flex-col gap-2 flex items-center">
      <p
      style={{color:"#E8C1C5",fontSize:'4.5rem'}}
      className="h-1/5 sm:h-1/3 flex gap-2 items-center justify-center font-bold">
        <FontAwesomeIcon icon={faLink} />
        Wallet
      </p>
      <div className="form h-1/5 sm:h-auto p-2 flex flex-col gap-2 w-11/12 justify-center items-center">
        <div className="w-full flex gap-3 justify-center items-center">
          <input
          style={{backgroundColor:"#2E294E",color:"#E8C1C5"}}
          type="text" name="text" id="url" value={url}
            className="w-full border border-slate-400 p-2 rounded-lg"
            onChange={(e)=>{
              setUrl(e.target.value)
            }}
            placeholder="https://example.com" />
          <button
          onClick={()=>{setScan(true)}}
          style={btnCss}
          title="Scan QR"
          className={btnStyle}>
            <FontAwesomeIcon className="w-8 h-6 text-xl" icon={faQrcode} />
          </button>
        </div>
        {scan && <Modal setURL={scannedUrl} isOpen={scan} setIsOpen={setScan} />}
        <div
        style={{color:"#D499B9"}}
        className="w-11/12 text-center text-xs sm:text-lg font-bold items-center gap-1 flex justify-center">
          <a href={uuid}>{uuid}</a>
        </div>
        <div className="btns w-11/12 flex gap-2 justify-center items-center">
          <button
            style={btnCss}
            className={btnStyle}
            type="button"
            onClick={()=>add(url,setUuid)}>
              Convert
          </button>
          <button
            style={btnCss}
            className={btnStyle}
            type="submit"
            onClick={()=>{
              setUrl('')
              setUuid(null)
            }}>
              Clear
          </button>
          <button
            style={btnCss}
            className={btnStyle}
            type="submit"
            onClick={()=>{
              uuid?copyToClipboard(uuid):alert('Nothing to copy!')
            }}>
              Copy
              <span className="hidden sm:block">
                to clipboard
              </span>
          </button>
          <button
            style={btnCss}
            className={btnStyle}
            type="submit"
            onClick={()=>{
              uuid?storeUuid(uuid):alert('Convert to save!')
            }}>
              Save
          </button>
        </div>
      </div>
      <UrlList remove={removeUrl} urls={savedUrls} />
    </div>
  )
}