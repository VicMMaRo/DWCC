import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";

export function Home(){
    const[users,setUsers]=useState([]);

    useEffect(()=> {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            if(!response.ok){
                throw new Error("Error al traer los usarios");
            }
            return response.json();
        })
        .then(data => setUsers(data))
    },[])
    console.log(users);

    //delvovemos un div para pintar una galeria
    return (
        <div className="container mt-4">
            <div className="d-flex flex-wrap gap-4 justify-content-start">
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
            </div>
        </div>
    );

}