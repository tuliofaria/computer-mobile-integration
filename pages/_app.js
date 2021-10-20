import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='max-w-4xl mx-auto my-6 shadow-lg rounded-lg px-6 py-4'>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
