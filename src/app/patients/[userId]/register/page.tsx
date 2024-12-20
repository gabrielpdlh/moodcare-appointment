import RegisterForm from '@/components/forms/register-form';
import { getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';

interface Props {
  params: {
    userId: string;
  };
}

const UserRegisterPage = async ({ params: { userId: userId } }: Props) => {
  const user = await getUser(userId);

  if (!user) return notFound();

  Sentry.metrics.set('user_view_register', user.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full1.svg"
            height={100}
            width={100}
            alt="Logo"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 MoodCare</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img1.png"
        height={1000}
        width={1000}
        alt="Patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default UserRegisterPage;
