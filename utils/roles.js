import { AccessControl } from 'accesscontrol'

// export const permissions = {
//   participant: ['acheter ticket', 'voir evenement'],
//   organisateur: [
//     'ajouter ticket',
//     'supprimer ticket',
//     'modifier ticket',
//     'voir ticket',
//     'ajouter evenement',
//     'modifier evenement',
//     'voir evenement',
//     'supprimer evenement',
//     'voir user',
//     ,
//   ],
//   distributeur: ['modifier', 'lire'],
//   superAdmin: ['ajouter', 'supprimer', 'modifier', 'acheter', 'lire'],
// }

const grantsObject = {
  participant: {
    user: {
      'create:any': ['*'],
      'read:own': ['*'],
      'delete:own': ['*'],
      'update:own': ['*'],
    },
    ticket: {
      'read:any': ['*'],
    },
    event: {
      'read:any': ['*'],
    },
  },
  organisateur: {
    user: {
      'read:any': ['*'],
    },
    ticket: {
      'read:own': ['*'],
      'delete:own': ['*'],
      'update:own': ['*'],
    },
    event: {
      'create:own': ['*'],
      'read:any': ['*'],
      'delete:own': ['*'],
      'update:own': ['*'],
    },
  },
  distributeur: {
    user: {
      'read:any': ['*'],
    },
    ticket: {
      'read:any': ['*'],
      'update:any': ['*'],
    },
    event: {
      'read:any': ['*'],
      'update:any': ['*'],
    },
  },
}

const ac = new AccessControl(grantsObject)
ac.grant('superAdmin').extend(['participant', 'organisateur', 'distributeur'])

export default ac
