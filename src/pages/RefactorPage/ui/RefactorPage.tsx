import Footer from "../../../widgets/Footer/index";
import Header from "../../../widgets/Header/index";
import RefactorWindow from "../../../widgets/RefactorWindow/index";
import './RefactorPage.scss'
export default function RefactorPage() {
  return (
    <div className="refactor-page">
      <Header/>
        <RefactorWindow/>
      <Footer/>
    </div>
  )
}
