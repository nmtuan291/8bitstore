import { usePagination } from "../../hooks/usePagination";
import "./Review.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";

interface ReviewProps {
	userId: string,
	userName: string,
	score: number,
	comment: string
}
const Review: React.FC<ReviewProps> = ({ userId, userName, score, comment }) => {
	let remainStars = 5 - score;
	console.log(score)

	return (
		<div className="review-container">
			<div className="user-info-container">
				<div className="avatar">
					<Avatar imgUrl="" width={0} height={0}></Avatar>
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
									style={{color: "#CFCFCF"}}
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