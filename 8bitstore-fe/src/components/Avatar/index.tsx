import "./Avatar.scss"
import image from "../../assets/images/banner2.jpg"

interface AvatarProps {
  imgUrl: string,
  height: number,
  width: number
}

const Avatar: React.FC<AvatarProps> = ({ imgUrl, height, width }) => {
  
  return (
    <div className="avatar-container">
      <img src={image}></img>
    </div>
  )
}

export default Avatar;