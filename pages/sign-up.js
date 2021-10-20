import { useEffect, useState } from 'react'
import useSWR from 'swr'
import QRCode from 'react-qr-code'

const fetcher = (url) => fetch(url).then((r) => r.json())

const SignUp = () => {
  const [pictureKey, setPictureKey] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  const { data, error } = useSWR(
    pictureKey ? '/api/picture-request?key=' + pictureKey : null,
    fetcher,
    {
      refreshInterval: 10000,
    }
  )

  useEffect(() => {
    if (data && data.pictureValue && data.pictureValue !== '') {
      setPictureUrl(data.pictureValue)
      setPictureKey('')
    }
    // TODO: handle this better
    if (data && data.isExpired) {
      setPictureKey('')
    }
  }, [data])

  const uploadMobile = async () => {
    const res = await fetch('/api/picture-request', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {},
    })
    const data = await res.json()
    setPictureKey(data.id)
  }

  const url =
    process.env.NEXT_PUBLIC_VERCEL_URL + '/send-picture?key=' + pictureKey

  return (
    <div>
      <h1 className='font-semibold mb-2 text-xl leading-tight sm:leading-normal'>
        Sign up
      </h1>
      <p>
        <button
          type='button'
          onClick={uploadMobile}
          className='p-2 pl-5 pr-5 bg-transparent border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:border-4 focus:border-blue-300'
        >
          Click here to upload a picture from your mobile.
        </button>
      </p>
      {pictureKey && (
        <div className='my-4'>
          <QRCode value={url} />
          <p>{url}</p>
        </div>
      )}
      <h2 className='font-semibold mb-2 text-xl leading-tight sm:leading-normal mt-4'>
        Output / debug:
      </h2>
      <pre>
        Picture key: {pictureKey}
        {'\n'}
        Picture URL: {pictureUrl}
        {JSON.stringify(data, null, 2)}
        {JSON.stringify(error, null, 2)}
      </pre>
    </div>
  )
}
export default SignUp
