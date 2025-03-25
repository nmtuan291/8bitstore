import { usePagination } from "../../hooks/usePagination";
import "./Review.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface ReviewProps {
	userId: string,
	userName: string,
	score: number,
	comment: string
}
const Review: React.FC<ReviewProps> = ({ userId, userName, score, comment }) => {
	let remainStars = 5 - score;

	return (
		<div className="review-container">
			<div className="user-info-container">
				<div className="avatar">
					<img className="avatar-img"></img>
				</div>
				<div className="user-info">
					<div className="username">
						{userName}
					</div>
					<div className="user-score">
						{
							Array.from({ length: score }, (_, __) => 
								<FontAwesomeIcon 
									icon={faStar}
									style={{color: "yellow"}}
								/>
							)
						}
						{
							Array.from({ length: remainStars }, (_, __) => 
								<FontAwesomeIcon 
									icon={faStar}
								/>
							)
						}   
					</div>
				</div>
			</div>
			<p className="comment">
				{comment}
			</p>
		</div>
	)
}

export default Review;