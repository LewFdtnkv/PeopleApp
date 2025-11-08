import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from '../../../App/providers/StoreProvider/index';
import { useEffect } from "react";
import { fetchUsers } from "../../../App/providers/StoreProvider/index";
import type { IPeopleProps } from "../../../App/providers/StoreProvider/index";
import { setPage } from "../../../App/providers/StoreProvider/index";
import UserCard from "../../../entities/UserCard/index";
import './UserList.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Loader from "../../../shared/Loader/index";
import ErrorModal  from "../../../shared/ErrorWindow/index";
import Button from '../../../shared/Button/index';
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const { pages, loading, error, page, limit, totalUsers, _persist  } = useSelector((state: RootState) => state.users);
  const users = pages[page] || [];
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (_persist?.rehydrated && (!users || users.length === 0)) {
      dispatch(fetchUsers({ page, limit }));
    }
  }, [page, users, dispatch, limit, _persist]);

  const handleChangePage = (index: number) => {
    dispatch(setPage(page + index));
  };

  const handleRedirect = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <>
      {!loading && !error &&
        <>  
        <div className="user-list">
          <div className="user-list__pagination">
            {page > 1 && <Button className="user-list__pagination-btn" onClick={() => handleChangePage(-1)} svg={<KeyboardArrowUpIcon />} />}
            {page < totalUsers / limit && <Button className="user-list__pagination-btn" onClick={() => handleChangePage(1)} svg={<KeyboardArrowDownIcon />} />}
          </div>
            <Button className="user-list__create" children=" Create new user" onClick={()=>handleRedirect(totalUsers  + 1)}/>          
        </div>
          <ul className="user-list__card">
            {users.map((user: IPeopleProps) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                avatar={user.avatar}
                email={user.email}
                description={user.description}
                createdAt={user.createdAt}
                onClick={() => handleRedirect(user.id)}
              />
            ))}
          </ul>
        </>
      }
      {loading && <Loader />}
      {error && <ErrorModal error={error} />}
    </>
  );
}
