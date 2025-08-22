
import AdminDashboardClient from './admin-dashboard-client';

export const metadata = {
  title: 'Admin Dashboard | Dharma Treasury',
};

// In a real application, you would protect this route and only allow access to admins.
export default function AdminPage() {
    return <AdminDashboardClient />;
}
