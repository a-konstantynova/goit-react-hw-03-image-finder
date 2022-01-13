import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

export default function Spinner() {
  return (
    <div className={s.loader}>
      <Loader
        type="ThreeDots"
        color="#046d12"
        height={60}
        width={60}
        timeout={4000}
      />
    </div>
  );
}
