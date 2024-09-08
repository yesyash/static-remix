import { useNavigate, useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";

type TGeo = {
  lat: string
  lng: string
}

type TAddress = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: TGeo
}

type TCompany = {
  name: string
  catchPhrase: string
  bs: string
}

type TUser = {
  id: number
  name: string
  username: string
  email: string
  address: TAddress
  phone: string
  website: string
  company: TCompany
}

const getUser = async (userId: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  const user: TUser = await res.json()
  return user
}


export default function User() {
  const params = useParams()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({ queryKey: ['getUser', params.userId], queryFn: () => getUser(params.userId as string), })

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="font-sans p-4">
      <div className="pb-4">
        <button onClick={goBack}>{"<- back"}</button>
      </div>

      <h1 className="text-3xl pb-2">User Profile :{params.userId} </h1>
      {isLoading ? <pre>loading...</pre> : isError ? <pre>something went wrong</pre> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}