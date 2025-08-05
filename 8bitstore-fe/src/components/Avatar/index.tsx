import "./Avatar.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface AvatarProps {
  imgUrl?: string,
  height?: number,
  width?: number,
  userName?: string
}

const Avatar: React.FC<AvatarProps> = ({ 
  imgUrl, 
  height = 40, 
  width = 40, 
  userName = "User" 
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (name: string) => {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c',
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
      '#fa709a', '#fee140', '#a8edea', '#fed6e3',
      '#ffecd2', '#fcb69f', '#ff9a9e', '#fecfef'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div 
      className="avatar-container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: getRandomColor(userName)
      }}
    >
      {imgUrl ? (
        <img src={imgUrl} alt={userName} />
      ) : (
        <div className="avatar-fallback">
          <span className="avatar-initials">{getInitials(userName)}</span>
        </div>
      )}
    </div>
  )
}

export default Avatar;