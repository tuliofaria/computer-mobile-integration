import { useRouter } from 'next/router'
import { useState } from 'react'

const SendPicture = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [isExpired, setIsExpired] = useState(false)
  const [success, setSuccess] = useState(false)
  const sendPicture = async () => {
    const res = await fetch('/api/send-picture', {
      method: 'POST',
      body: JSON.stringify({
        key: router.query.key,
        value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    if (data.isExpired) {
      setIsExpired(true)
    }
    if (data.success) {
      setSuccess(true)
    }
  }
  if (success) {
    return <p>Enviado com sucesso! Você pode fechar esta janela.</p>
  }
  if (isExpired) {
    return <p>Link expirou</p>
  }
  return (
    <div>
      <h1 className='font-semibold mb-2 text-xl leading-tight sm:leading-normal'>
        Sign up
      </h1>
      <p>
        <input
          className='border p-4 my-2'
          type='text'
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </p>
      <p>
        <button
          type='button'
          onClick={sendPicture}
          className='p-2 pl-5 pr-5 bg-transparent border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:border-4 focus:border-blue-300'
        >
          Click here the value
        </button>
      </p>
    </div>
  )
}
export default SendPicture
