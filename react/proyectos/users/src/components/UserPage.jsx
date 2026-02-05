import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserDetails } from "./UserDetails";


export function UserPage(){
    const{id} = useParams();
    const[user,setUser]=useState(null);
    const [loading, setLoading]=useState(true);
    
        useEffect(()=> {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => {
                if(!response.ok){
                    throw new Error("Error al traer los usarios");
                }
                return response.json();
            })
            .then(data =>  {
                setUser(data); 
                setLoading(false);
            })
        },[id])

        return( loading ? <p>Cargando...</p>  :  <UserDetails key={user.id} user={user} />  )
}