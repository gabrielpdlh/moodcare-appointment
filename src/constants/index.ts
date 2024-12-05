export const GenderOptions = ['Masculino', 'Feminino', 'Outro'];

export const PatientFormDefaultValues = {
  name: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: 'Masculino' as Gender,
  address: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  primaryPhysician: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  familyMedicalHistory: '',
  pastMedicalHistory: '',
  identificationType: 'Birth Certificate',
  identificationNumber: '',
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  'Carteira de Identidade (RG)',
  'Cartão de Seguro Saúde',
  'Certidão de Nascimento',
  'CPF',
  'Passaporte',
  'Carteira de Identificação do Autista (CIA)',
];

export const Doctors = [
  {
    image: '/assets/images/dr-green.png',
    name: 'João Santos - FISIOTERAPEUTA',
  },
  {
    image: '/assets/images/dr-cameron.png',
    name: 'Letícia Batista - ACOMPANHANTE TERAPÊUTICA',
  },
  {
    image: '/assets/images/dr-livingston.png',
    name: 'Samuel Santos - PSICOPEDIATRA',
  },
  {
    image: '/assets/images/dr-peter.png',
    name: 'Lucas Santos - FONOAUDIÓLOGO',
  },
  {
    image: '/assets/images/dr-powell.png',
    name: 'Brenda Cavalcante - PSICÓLOGA',
  },
  {
    image: '/assets/images/dr-remirez.png',
    name: 'Alex Medina - TERAPEUTA OCUPACIONAL',
  },
  {
    image: '/assets/images/dr-lee.png',
    name: 'Olivia Santana - FISIOTERAPEUTA',
  },
  {
    image: '/assets/images/dr-cruz.png',
    name: 'Maria das Graças - FONOAUDIÓLOGA',
  },
  {
    image: '/assets/images/dr-sharma.png',
    name: 'Gabriel Santos - PSICÓLOGO',
  },
];

export const StatusIcon = {
  scheduled: '/assets/icons/check.svg',
  pending: '/assets/icons/pending.svg',
  canceled: '/assets/icons/canceled.svg',
};
