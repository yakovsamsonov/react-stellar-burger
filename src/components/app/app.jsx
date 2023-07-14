import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { data } from "../../utils/data";

function App() {
  return (
    <>
      <AppHeader />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
}

export default App;
