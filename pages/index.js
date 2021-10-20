import Link from 'next/link'
const Home = () => {
  return (
    <div>
      <h1>Computer - Mobile Integration with Polling</h1>
      <p className='mt-6'>
        <Link href='/sign-up'>
          <a className='p-2 pl-5 pr-5 bg-transparent border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:border-4 focus:border-blue-300'>
            Sign Up
          </a>
        </Link>
      </p>
    </div>
  )
}
export default Home
