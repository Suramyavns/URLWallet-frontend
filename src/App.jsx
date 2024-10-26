import { useEffect, useState } from "react"
import { add, remove } from "./api"
import UrlList from "./components/urlList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import Modal from "./components/modal";
import { PacmanLoader } from "react-spinners";
import Header from "./components/header";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy'); // Still using execCommand for fallback
      document.body.removeChild(textarea);
      return true
    }
  } catch (err) {
    alert('Failed to copy! Please try again later');
    console.error('Failed to copy: ', err);
  }
}


export default function App(){
  const [loading,setLoading] = useState(false)
  const [scan,setScan] = useState(false)
  const [url,setUrl] = useState('')
  const [uuid,setUuid]=useState(null)
  const [copied,setCopied]=useState(false)
  const [savedUrls,setUrls]=useState(JSON.parse(localStorage.getItem('ids'))??[])
  useEffect(()=>{
    setCopied(false)
    localStorage.setItem('ids',JSON.stringify(savedUrls))
  },[savedUrls,uuid])
  const scannedUrl = (url) =>{
    setUrl(url);
    setScan(!scan)
  }
  const removeUrl = (index) =>{
    const url = savedUrls[index]
    const newUrls = savedUrls.filter((_, i) => i !== index); // Create a new array excluding the item at the given index
    setUrls(newUrls);
    remove(url)
  }
  const storeUuid = (uuid)=>{
    setUuid(uuid)
    setUrls(prev=>[...prev,uuid])
  }
  const btnCss = {backgroundColor:'#2E294E',color:"#D499B9"}
  const btnStyle = 'p-2 flex gap-1 items-center bg-blue-600 rounded-lg text-white'
  return(
    <div
    style={{backgroundColor:'#011638'}}
    className="h-screen w-screen flex-col gap-2 flex items-center">
      <Header />
      {/* form area */}
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
          className={btnStyle+' border border-slate-400'}>
            <FontAwesomeIcon className="w-8 h-6 text-xl" icon={faQrcode} />
          </button>
        </div>
        {scan && <Modal setURL={scannedUrl} isOpen={scan} setIsOpen={setScan} />}
        <div
        style={{color:"#D499B9"}}
        className="w-11/12 py-4 text-center text-xs sm:text-lg font-bold items-center gap-1 flex justify-center">
          {
            loading===true?
              <span className="flex flex-col gap-2 w-full justify-center items-center">
                <marquee className="text-xs w-full flex items-center justify-center">
                  <FontAwesomeIcon className="mx-1" icon={faInfoCircle} />
                  Please wait while we process the URL, it may take around 50 seconds if the servers have not been pinged in a while
                </marquee>
                <PacmanLoader color="#D499B9" size={20} />
              </span>
              :
              <a href={uuid}>{uuid}</a>
          }
        </div>
        <div className="btns w-11/12 flex gap-2 justify-center items-center">
          <button
            style={btnCss}
            className={btnStyle}
            type="button"
            onClick={()=>{
              if(url.length<=30){
                alert('URL is short enough')
              }
              else{
                setLoading(true)
                add(url,setUuid,setLoading)
              }
            }}>
              Shorten
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
              uuid?(
                copyToClipboard(uuid)?
                (setCopied(true)):{}
              ):alert('Nothing to copy!')
            }}>
              {
                !copied?(
                  <>
                  Copy
                  <span className="hidden sm:block">
                    to clipboard
                  </span>
                  </>
                ):<p>Copied!</p>
              }
          </button>
          <button
            style={btnCss}
            className={btnStyle}
            type="submit"
            onClick={()=>{
              if(url && url.length>0 && !uuid){
                storeUuid(url)
              }
              else if(uuid.length>0){
                storeUuid(uuid)
              }
              else{
                alert('Nothing to save!')
              }
            }}>
              Save
          </button>
        </div>
      </div>
      <UrlList remove={removeUrl} urls={savedUrls} />
    </div>
  )
}