import { useNavigate } from 'react-router-dom';
import './ErrorModal.scss';
import type { IErrorModalProps } from './types/ErrorTypes';
import { useDispatch } from 'react-redux';
import { clearError } from '../../../App/providers/StoreProvider/slice/PeopleSlice';

export default function ErrorModal({ error }:IErrorModalProps){
  if (!error) return null;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleRedirect = () =>{
    dispatch(clearError());
    navigate('/')
  }

  return (
    <div className="error-modal-overlay" onClick={handleRedirect}>
      <div className="error-modal">
        <h2>Ошибка</h2>
        <p>{error}</p>
      </div>
    </div>
  );
};


