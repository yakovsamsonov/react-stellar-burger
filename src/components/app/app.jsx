import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { data } from "../../utils/data";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          overflowY: "hidden",
        }}
      >
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
