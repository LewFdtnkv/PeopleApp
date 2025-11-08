import UserList from "../../../widgets/UserList/index";
import Header from '../../../widgets/Header/index';
import './UserPage.scss'
import Footer from "../../../widgets/Footer/index";

export default function UserPage() {
  return (
    <div className="user-page">
      <Header/>
      <UserList/>
      <Footer/>
    </div>
  )
}
