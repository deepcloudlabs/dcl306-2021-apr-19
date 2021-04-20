import CardHeader from "../bootstrap/CardHeader";
import {Link} from "react-router-dom";

export function UserWins(props){
    return (
      <div className="card">
          <CardHeader title="Tebrikler!"></CardHeader>
          <div className="card-body">
              <h1>Tebrikler! Kazandınız!</h1>
              <p></p>
              <Link to="/">Want to play again?</Link>
          </div>
      </div>
    );
}