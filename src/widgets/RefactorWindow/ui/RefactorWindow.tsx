import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../App/providers/StoreProvider/index';
import { createUser, editUser, fetchUsers } from '../../../App/providers/StoreProvider/index';
import Button from '../../../shared/Button/index';
import type { IPeopleProps } from '../../../App/providers/StoreProvider/index';
import './RefactorWindow.scss';

export default function RefactorWindow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { pages, page, limit } = useSelector((state: RootState) => state.users);

  const user = Object.values(pages ?? {})
    .flat()
    .find((u) => (u as IPeopleProps).id === id) as IPeopleProps | undefined;

  const [form, setForm] = useState({
    name: '',
    email: '',
    description: '',
    avatar: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        description: user.description,
        avatar: user.avatar,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (user && user.id) {
      await dispatch(editUser({id: user.id, 
  data: form }));
    } else {
      await dispatch(
        createUser({
          ...form,
          avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
        })
      );
      await dispatch(fetchUsers({ page, limit }))
    }

    navigate('/');
  };

  return (
    <div className="refactor-container">
      <div className="refactor-card">
        <h2 className="refactor-title">
          {user ? 'Refactor User' : 'Create User'}
        </h2>

        <div className="refactor-avatar-block">
          {form.avatar && (
            <img src={form.avatar} alt={form.name} className="refactor-avatar" />
          )}
        </div>

        <div className="refactor-form">
          <label>Имя</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />

          <label>Описание</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        <div className="refactor-buttons">
          <Button className='refactor-buttons__btn' onClick={handleSave}>Save</Button>
          <Button className="refactor-buttons__btn"onClick={() => navigate('/')}>Back</Button>
        </div>
      </div>
    </div>
  );
}
