import type { IPeopleProps } from "../../../App/providers/StoreProvider/index";
import Button from "../../../shared/Button/index";
import "./UserCard.scss";

export default function UserCard({id, name, avatar, email, createdAt, onClick }: IPeopleProps) {
    
    return (
    <div className="user-card" onClick={() => onClick && onClick(id)}>
      <img className="user-card__avatar" src={avatar} alt={name} />

      <div className="user-card__content">
        <h3 className="user-card__name">{name}</h3>

        <p className="user-card__email">{email}</p>


        <div className="user-card__footer">
          <span className="user-card__date">
            {new Date(createdAt).toLocaleDateString()}
          </span>

          <Button className="user-card__edit-btn" onClick={() => onClick && onClick(id)}>
            ✏ Редактировать
          </Button>
        </div>
      </div>
    </div>
  );
}
