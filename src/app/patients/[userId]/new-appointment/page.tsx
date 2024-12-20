import AppointmentForm from '@/components/forms/appointment-form';
import { getPatient } from '@/lib/actions/patient.actions';
import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  if (!patient) return notFound();

  Sentry.metrics.set('user_view_new-appointment', patient.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full1.svg"
            height={100}
            width={100}
            alt="Logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright py-12">© 2024 MoodCare</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="Appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
