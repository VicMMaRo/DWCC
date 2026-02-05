import { Link } from "react-router-dom"

export function UserDetails({user}){
    return(
        <>
            <div className="card">
                <h5 className="card-header">{user.name}</h5>
                <div className="card-body">
                    <p className="card-title">{user.name}</p>
                    <p className="card-text">{user.company.name}</p>
                    <p className="card-text">{user.website}</p>
                </div>
            </div>
            <div className="className="card-footer text-center">
                <Link to={"/"}>Volver</Link>
            </div>
             
        </>    
    )
}