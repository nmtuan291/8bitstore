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
	const renderStars = () => {
		return Array.from({ length: 5 }, (_, index) => (
			<FontAwesomeIcon 
				key={index}
				icon={faStar}
				className={`star ${index < score ? 'filled' : 'empty'}`}
			/>
		));
	};

	return (
		<div className="review-container">
			<div className="user-info-container">
				<div className="avatar">
					<Avatar imgUrl="" width={48} height={48} userName={userName} />
				</div>
				<div className="user-info">
					<div className="username">
						{userName}
					</div>
					<div className="user-score">
						{renderStars()}
						<span className="score-text">{score}/5</span>
					</div>
				</div>
			</div>
			<div className="comment-container">
				<p className="comment">
					{comment}
				</p>
			</div>
		</div>
	)
}

export default Review;