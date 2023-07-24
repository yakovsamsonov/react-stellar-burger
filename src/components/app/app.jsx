import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import Order from "../order/order.jsx";
import { data } from "../../utils/data.js";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Order data={data} />
    </div>
  );
}

export default App;
