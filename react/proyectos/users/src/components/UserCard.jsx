import { Link } from "react-router-dom"

export function UserCard({user}){
    return (
        <div className="card" style={{ width: "18rem" }}>
            <h5 className="card-header">{user.name}</h5>

            <div className="card-body">
            <p className="card-title">{user.name}</p>
            <p className="card-text">{user.company.name}</p>
            </div>

            <div className="card-footer text-center">
            <Link to={`/user/${user.id}`} className="btn btn-outline-primary btn-sm">
                Link details
            </Link>
            </div>
        </div>
    );

}
