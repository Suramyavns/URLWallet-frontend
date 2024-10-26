import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const UrlList = ({urls,remove}) => {
    useEffect(()=>{},[urls])
  return (
    <div
    className={`w-full h-3/5 mb-4 overflow-auto ${urls.length>0?'flex':'hidden'} flex-col justify-center items-center gap-2`}>
        <h1
            className='text-2xl w-11/12 font-bold'
            style={{color:"#E8C1C5"}}>
                Your URLs
        </h1>
        <div
        style={{backgroundColor:'#2E294E'}}
        className={`p-2 rounded-xl w-11/12 ${urls.length>0?'flex':'hidden'} flex-col gap-2 overflow-auto`}>
        {
            urls && urls.map((url,index) => {
                return(
                    <div
                    style={{color:"#E8C1C5"}}
                    className='flex items-center justify-between p-1 hover:cursor-pointer text-white font-bold rounded-lg border-blue-800'
                    key={index}>
                        <a className='w-full m-0'>{url}</a>
                        <button
                        onClick={()=>{remove(index)}}
                        className='mx-4 opacity-80 hover:opacity-100 bg-red-500 aspect-square w-10 rounded-lg border-2 border-red-800' type="button">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

UrlList.propTypes = {
    urls: PropTypes.arrayOf(PropTypes.string).isRequired,
    remove:PropTypes.func.isRequired
}

export default UrlList
