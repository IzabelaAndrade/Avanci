import produce from 'immer';

const INITIAL_STATE = {
  name: null,
  rg: null,
  cpf: '',
  email: null,
  phone: '',
  voterTitle: null,
  birthday: '',
  education: null,
  hability: [],
  reference: null,

  maritalStatus: null,
  dependents: null,
  home: null,
  postalCode: null,
  neighborhood: null,
  address: null,
  transport: null,
  habilitation: null,

  lastJob: null,
  timeJob: null,
  descriptionJob: null,
  typeJob: null,

  bank: '',
  accountType: '',
  agency: null,
  operation: null,
  accountNumber: null,
  holder: null,
  holderCPF: '',

  shirt: null,
  pants: null,
  shoes: null,

  photo: null,
  docFront: null,
  docBack: null,
  imgVoterTitle: null,
  imgAddress: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@register/MODIFY_NAME': {
        draft.name = action.payload.name;
        break;
      }
      case '@register/MODIFY_RG': {
        draft.rg = action.payload.rg;
        break;
      }
      case '@register/MODIFY_CPF': {
        draft.cpf = action.payload.cpf;
        break;
      }
      case '@register/MODIFY_VOTER_TITLE': {
        draft.voterTitle = action.payload.voterTitle;
        break;
      }
      case '@register/MODIFY_EMAIL': {
        draft.email = action.payload.email;
        break;
      }
      case '@register/MODIFY_BIRTHDAY': {
        draft.birthday = action.payload.birthday;
        break;
      }
      case '@register/MODIFY_PHONE': {
        draft.phone = action.payload.phone;
        break;
      }
      case '@register/MODIFY_EDUCATION': {
        draft.education = action.payload.education;
        break;
      }
      case '@register/MODIFY_HABILITY': {
        draft.hability = action.payload.hability;
        break;
      }
      case '@register/MODIFY_REFERENCE': {
        draft.reference = action.payload.reference;
        break;
      }
      case '@register/MODIFY_MARITAL_STATUS': {
        draft.maritalStatus = action.payload.maritalStatus;
        break;
      }
      case '@register/MODIFY_DEPENDENTS': {
        draft.dependents = action.payload.dependents;
        break;
      }
      case '@register/MODIFY_HOME': {
        draft.home = action.payload.home;
        break;
      }
      case '@register/MODIFY_POSTAL_CODE': {
        draft.postalCode = action.payload.cep;
        break;
      }
      case '@register/MODIFY_NEIGHBORHOOD': {
        draft.neighborhood = action.payload.neighborhood;
        break;
      }
      case '@register/MODIFY_ADDRESS': {
        draft.address = action.payload.address;
        break;
      }
      case '@register/MODIFY_TRANSPORT': {
        draft.transport = action.payload.transport;
        break;
      }
      case '@register/MODIFY_HABILITATION': {
        draft.habilitation = action.payload.habilitation;
        break;
      }
      case '@register/MODIFY_LAST_JOB': {
        draft.lastJob = action.payload.lastJob;
        break;
      }
      case '@register/MODIFY_TIME_JOB': {
        draft.timeJob = action.payload.timeJob;
        break;
      }
      case '@register/MODIFY_DESCRIPTION_JOB': {
        draft.descriptionJob = action.payload.descriptionJob;
        break;
      }
      case '@register/MODIFY_TYPE_JOB': {
        draft.typeJob = action.payload.typeJob;
        break;
      }
      case '@register/MODIFY_BANK': {
        draft.bank = action.payload.bank;
        break;
      }
      case '@register/MODIFY_ACCOUNT_TYPE': {
        draft.accountType = action.payload.accountType;
        break;
      }
      case '@register/MODIFY_AGENCY': {
        draft.agency = action.payload.agency;
        break;
      }
      case '@register/MODIFY_OPERATION': {
        draft.operation = action.payload.operation;
        break;
      }
      case '@register/MODIFY_ACCOUNT_NUMBER': {
        draft.accountNumber = action.payload.accountNumber;
        break;
      }
      case '@register/MODIFY_HOLDER': {
        draft.holder = action.payload.holder;
        break;
      }
      case '@register/MODIFY_HOLDER_CPF': {
        draft.holderCPF = action.payload.holderCPF;
        break;
      }
      case '@register/MODIFY_SHIRT': {
        draft.shirt = action.payload.shirt;
        break;
      }
      case '@register/MODIFY_PANTS': {
        draft.pants = action.payload.pants;
        break;
      }
      case '@register/MODIFY_SHOES': {
        draft.shoes = action.payload.shoes;
        break;
      }
      case '@register/MODIFY_PHOTO': {
        draft.photo = action.payload.photo;
        break;
      }
      case '@register/MODIFY_DOCFRONT': {
        draft.docFront = action.payload.docFront;
        break;
      }
      case '@register/MODIFY_DOCBACK': {
        draft.docBack = action.payload.docBack;
        break;
      }
      case '@register/MODIFY_IMG_VOTER_TITLE': {
        draft.imgVoterTitle = action.payload.imgVoterTitle;
        break;
      }
      case '@register/MODIFY_IMG_ADDRESS': {
        draft.imgAddress = action.payload.imgAddress;
        break;
      }
      default:
    }
  });
}
