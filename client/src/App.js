import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import EditIncome from "./pages/income/EditIncome";
import EditExpense from "./pages/expense/EditExpense";
import AdminRoute from "./components/Navigation/AdminRoute";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";
import AddExpense from "./pages/expense/AddExpense";
import ExpensesList from "./pages/expense/ExpensesList";
import Home from "./pages/Home";
import AddIncome from "./pages/income/AddIncome";
import IncomeList from "./pages/income/IncomeList";
import DashboardData from "./pages/users/DashboardData";
import SignIn from "./pages/users/SignIn";
import Profile from "./pages/users/Profile";
import SignUp from "./pages/users/SignUp";
import UpdateProfile from "./pages/users/UpdateProfile";
import UserProfileExpList from "./pages/users/UserProfileExpList";
import UserProfileIncList from "./pages/users/UserProfileIncList";
import PageNotFound from "./utils/PageNotFound";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />


        <ProtectedRoute exact path="/incomes" component={IncomeList} />
        <ProtectedRoute exact path="/expenses" component={ExpensesList} />


        <ProtectedRoute exact path="/edit-income" component={EditIncome} />
        <ProtectedRoute exact path="/edit-expense" component={EditExpense} />
        <ProtectedRoute
          exact
          path="/update-profile"
          component={UpdateProfile}
        />
        <ProtectedRoute
          exact
          path="/user-expenses" component={UserProfileExpList}
        />
        <ProtectedRoute
          exact
          path="/user-income"
          component={UserProfileIncList}
        />
        <AdminRoute exact path="/dashboard" component={DashboardData} />
        <ProtectedRoute exact path="/add-income" component={AddIncome} />
        <ProtectedRoute exact path="/add-expense" component={AddExpense} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />

        <Route path="*" component={PageNotFound} />

      </Switch>

    </BrowserRouter>

  );
}

export default App;
