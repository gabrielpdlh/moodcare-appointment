import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { getUser } from '@/lib/actions/patient.actions';
import { formatDateTime } from '@/lib/utils';
import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SuccessPage = async ({
  params: { userId },
  searchParams: { appointmentId },
}: SearchParamProps) => {
  const appointment = await getAppointment(appointmentId as string);
  const user = await getUser(userId);

  if (!(appointment && user)) return notFound();

  const doctor = Doctors.find(
    (doc) => doc.name === appointment?.primaryPhysician
  );

  Sentry.metrics.set('user_view_appointment-success', user.name);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href={'/'}>
          <Image
            src="/assets/icons/logo-full1.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center text-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Sua <span className="text-green-500">consulta </span>
            foi marcada!
          </h2>
          <p>Entraremos em contato em breve para confirmar</p>
        </section>

        <section className="request-details">
          <p>Detalhes da consulta:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>

          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="Calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant={'outline'} className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Nova Consulta
          </Link>
        </Button>

        <p className="copyright py-12">© 2024 MoodCare</p>
      </div>
    </div>
  );
};

export default SuccessPage;
