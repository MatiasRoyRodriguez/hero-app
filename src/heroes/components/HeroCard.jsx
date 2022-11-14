import { Link } from "react-router-dom";
import './HeroCard.css';

const CharactersByHero = ({ alter_ego, characters }) => {

	return (alter_ego === characters)
		? (<></>)
		: <p>{characters}</p>;
}

export const HeroCard = ({
	id,
	superhero,
	publisher,
	alter_ego,
	first_appearance,
	characters
}) => {
	const heroImageUrl = `/assets/${id}.jpg`;

	return (

		<Link to={`/hero/${id}`} className="my-card">
			<img src={`./assets/${id}.jpg`} className="img img-responsive" alt={superhero} />
			<div className="profile-name">{superhero}</div>
			<div className="profile-position">{alter_ego}</div>
			<div className="profile-overview">
				<div className="profile-overview">
					<div className="row">
						<div className="col-ms-4">
							<h3>{publisher}</h3>
							<CharactersByHero alter_ego={alter_ego} characters={characters} />
							<p className="card-text">
								<small className="text-muted">{first_appearance}</small>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
