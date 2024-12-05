import StatCard from '@/components/stat-card';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-14">
      <header className="admin-header">
        <Link href={'/'} className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full1.svg"
            height={32}
            width={162}
            alt="Logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Painel do Gestor</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bem vindo, gestor!</h1>
          <p className="text-dark-700">
            Comece o dia gerenciando novas consultas
          </p>
        </section>

        {appointments ? (
          <>
            <section className="admin-stat">
              <StatCard
                type="appointments"
                count={appointments.scheduledCount}
                label="Consultas Agendadas"
                icon="/assets/icons/appointments.svg"
              />
              <StatCard
                type="pending"
                count={appointments.pendingCount}
                label="Consultas Pendentes"
                icon="/assets/icons/pending.svg"
              />
              <StatCard
                type="canceled"
                count={appointments.canceledCount}
                label="Consultas Canceladas"
                icon="/assets/icons/canceled.svg"
              />
            </section>

            <DataTable columns={columns} data={appointments.documents} />
          </>
        ) : (
          <p>No appointments were found</p>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
