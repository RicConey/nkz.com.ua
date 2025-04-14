// app/admin/page.js
import LogoutButton from './components/LogoutButton';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import FormCreateLink from './components/FormCreateLink';
import ListLinks from './components/ListLinks';
import RedirectLogs from './components/RedirectLogs';

export default async function AdminPage() {
    // Проверяем сессию на сервере
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/admin/auth/signin');
    }
    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Panel</h1>
                <LogoutButton />
            </div>
            <FormCreateLink />
            <hr style={{ margin: '40px 0' }} />
            <ListLinks />
            <hr style={{ margin: '40px 0' }} />
            <RedirectLogs />
        </div>
    );
}
