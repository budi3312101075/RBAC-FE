import { useAuth } from "../store/auth";

const Dashboard = () => {
  const { loginResponse } = useAuth();
  return <div>Dashboard {loginResponse}</div>;
};

export default Dashboard;
