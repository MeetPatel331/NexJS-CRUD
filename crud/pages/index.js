import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function home() {
  const { data: session } = useSession()
  const route = useRouter()
  return (
    <div style={{
      height: '100vh', display: 'grid', placeContent: 'center'
    }}>
      {
        session ? <>
          <div className="grid place-content-center bg-gray-50 p-5 rounded-md">
            <h1 className="text-2xl">
              Hello!{" "}
              <span className="text-blue-400 font-bold ">
                {session.user.name}
              </span>
            </h1>
            <button
              className="p-2 mt-2 text-black hover:bg-gray-300 transition-all rounded-md bg-gray-200"
              onClick={() => signOut()}
            >
              Sign out
            </button>
            <button
              className="p-2 mt-2 text-black hover:bg-gray-300 transition-all rounded-md bg-gray-200"
              onClick={() => route.replace('/items')}
            >
              Dashboard
            </button>
          </div>
        </> : <>
          <div className="grid place-content-center bg-gray-50 p-5 rounded-md">
            <h1 className="text-2xl">Please SignIn</h1>
            <button className="p-2 mt-2 text-black hover:bg-gray-300 transition-all rounded-md bg-gray-200" onClick={() => route.replace('/user/login')}>signIn</button>
          </div></>
      }
    </div>
  )
}