'use client';

import CustomFormField, { FormFieldType } from '@/components/custom-form-field';
import FileUploader from '@/components/file-uploader';
import SubmitButton from '@/components/submit-button';
import { Form, FormControl } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SelectItem } from '@/components/ui/select';
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from '@/constants';
import { registerPatient } from '@/lib/actions/patient.actions';
import { PatientFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  user: User;
}

const RegisterForm = ({ user }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: '',
      email: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };
      // @ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="space-y-4">
          <h1 className="header">Bem vindo(a)!</h1>
          <p className="text-dark-700">
            Preencha as informações de quem receberá o atendimento
          </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações Pessoais</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Nome Completo"
          placeholder="Nome completo..."
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email..."
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Telefone"
            placeholder="(011) 96969-6969"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Data de Nascimento"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gênero"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label
                        htmlFor={option}
                        className="cursor-pointer capitalize"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Endereço"
            placeholder="Endereço Completo..."
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Comorbidade"
            placeholder="Autismo, TDAH..."
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Nome de Contato para Emergência"
            placeholder="Nome..."
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Número de Contato para Emergência"
            placeholder="(011) 96969-6969"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações Médicas</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Médico Primário"
          placeholder="Selecione um Médico"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className="rounded-full border border-dark-500"
                />
                <p className="">{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Convênio"
            placeholder="SUS, Hapvida, Unimed..."
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Número do Convênio"
            placeholder="Número..."
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Alergias (Se tiver)"
            placeholder="Alergias..."
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedications"
            label="Medicamentos Usados no Momentos (Se tiver)"
            placeholder="Ibuprofeno 200ml, Paracetamol 50mg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Histórico Médico Familiar (Informe o que souber)"
            placeholder="Mãe diabética, primo autista... "
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Indentificação</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Documento"
          placeholder="Select an identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              <p className="">{type}</p>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Número do Documento"
          placeholder="123456789"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Cópia digitalizada do documento de identificação"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consentimento e Privacidade</h2>
          </div>
        </section>

        <div className="space-y-4">
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="Eu concordo com o tratamento"
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="Eu concordo com a divulgação de informações"
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="Eu concordo com a política de privacidade"
          />
        </div>

        <SubmitButton isLoading={isLoading}>Continuar</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
