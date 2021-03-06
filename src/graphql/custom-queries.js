export const listConsultingRoomsSecretary = `query ListConsultingRooms(
  $filter: ModelConsultingRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listConsultingRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      doctor {
        id
        name
        username
        email
        speciality {
          id
          name
        }
        sex
        image
      }
      secretary
      location {
        id
        name
      }
    }
    nextToken
  }
}
`;

export const listMedicalAppointmentReports = `query listMedicalAppointments(
  $filter: ModelMedicalAppointmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listMedicalAppointments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      createdAt
    }
  }
}`;

export const listMedicalAppointments = `query listMedicalAppointments(
  $filter: ModelMedicalAppointmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listMedicalAppointments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      location {
        id
        name
      }
      doctor {
        id
        name
        username
        email
        speciality
        sex
      }
      doctorname
      patient {
        id
        name
        username
        email
        phone
        phone_id
      }
      rejection {
        items {
          id
          description
          doctor
          secretary
          patient
          createdAt
        }
        nextToken
      }
      cancelation {
        id
        description
      }
      notification {
        items {
          id
          state
          doctor
          secretary
          patient
          createdAt
        }
        nextToken
      }
      confirmation {
        id
      }
      secretary
      details
      date_created
      date_of_medical_appointment
      state
      position
      consult_cost
      read_secretary
      read_company
      createdAt
    }
    nextToken
  }
}
`;

export const getMedicalConsultation = /* GraphQL */ `
  query GetMedicalConsultation($id: ID!) {
    getMedicalConsultation(id: $id) {
      id
      state
      patient {
        id
        name
        owner
        approved_terms_conditions
        username
        email
        phone
        phone_id
        weight
        height
        size
        age
        sex
        id_card
        address
        marital_status
        birthdate
        religion {
          id
          name
        }
        patientHistory {
          items {
            id
            nonPathologicalHistory {
              items {
                id
                frequency
                comment
                risk_factor
                type {
                  id
                  name
                }
                owner
                createdAt
              }
              nextToken
            }
            pathologicalHistory {
              id
              surgicalInterventions {
                items {
                  id
                  surgicalIntervention {
                    id
                    name
                    description
                  }
                  createdAt
                }
              }
              patientMedications {
                items {
                  id
                  medications {
                    id
                    name
                  }
                  createdAt
                  drug_concentration
                }
              }
              patientAllergies {
                items {
                  id
                  allergies {
                    id
                    name
                    description
                  }
                  createdAt
                }
              }
            }
            familyHistory {
              items {
                id
                alive
                comment
                createdAt
                diseases {
                  items {
                    id
                    diseases {
                      id
                      name
                    }
                  }
                  nextToken
                }
                relationship {
                  id
                  name
                }
              }
              nextToken
            }
          }
        }
      }
      postConsultationsActivity {
        id
        medicalpres {
          items {
            id
            date
            frequency
            duration
            comment
            createdAt
            medications {
              id
              name
            }
          }
        }
        medicalAnalysis {
          items {
            id
            state
            date
            file
            medicalAnalysis{
              id
              name
              code
            }
          }
        }
        surgicalIntervention {
          items {
            id
            state
            date
            surgicalIntervention{
              id
              name
            }
          }
        }
      }
      medicalHistory {
        id
        reason
        diagnosis {
          id
          type {
            id
            name
          }
          evolution {
            id
            name
          }
          diagnosis {
            id
            name
          }
          commentary
          createdAt
        }
        physicalExploration {
          id
          general_exploration
          vitalsign {
              id
              blood_pressure
              breathing
              pulse
              temperature
              doctor
              secretary
              patient
              owner
          }
          regionalExploration {
              id
              head
              neck
              thorax
              abdomen
              members
              genitals
              others {
                items{
                  id
                  field {
                    id
                    name
                  }
                  value
                }
              }
              doctor
              secretary
              patient
              owner
            }
          doctor
          secretary
          patient
        }
      }
      createdAt
    }
  }
`;


export const listMedicalConsultationsForHistory = /* GraphQL */ `
  query ListMedicalConsultations(
    $filter: ModelMedicalConsultationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicalConsultations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        medicalHistory {
          id
          reason
          physicalExploration {
            id
            vitalsign {
              id
              blood_pressure
              breathing
              pulse
              temperature
            }
          }
        }
        state  
        createdAt 
        startedAt
        finalizedAt
        postConsultationsActivity {
          id
          medicalpres {
            items {
              id
              date
              frequency
              duration
              comment
              medications {
                id
                name
              }
            }
          }
          medicalAnalysis {
            items {
              id
              state
              date
              file
              results {
                items{
                  id
                  field {
                    id
                    name
                  }
                  value
                }
              }
              medicalAnalysis{
                id
                name
                code
              }
            }
          }
          surgicalIntervention {
            items {
              id
              state
              date
              surgicalIntervention{
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const listMedicalConsultations = /* GraphQL */ `
  query ListMedicalConsultations(
    $filter: ModelMedicalConsultationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicalConsultations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        patient {
          id
          name
          username
          phone
        }
        state
        createdAt
        startedAt
        finalizedAt
      }
    }
  }
`;

export const listConsultingRooms = /* GraphQL */ `
  query ListConsultingRooms(
    $filter: ModelConsultingRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConsultingRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        doctor {
          id
          name
          username
          email
          sex
          image
          owner
          specialities {
            items {
              id
              speciality {
                id
                name
                subSpeciality {
                  items {
                    id
                    name
                    subSpeciality {
                      items {
                        id
                        name
                      }
                    }
                  }
                }
              }
            }
          }
          subspecialities {
            items {
              id
              subspeciality {
                id
                name
              }
            }
          }
          subspecialitiessec {
            items {
              id
              subspecialitysec{
                id
                name
              }
            }
          }
        }
        secretary
        location {
          id
          name
          owner
        }
        owner
      }
      nextToken
    }
  }
`;

export const getPatientForGlobal = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      id
      name
      username
      email
      phone
      phone_id
      weight
      height
      size
      age
      sex
      id_card
      address
      marital_status
      birthdate
      religion {
        id
        name
      }
      patientHistory {
        items {
          id
          nonPathologicalHistory {
            items {
              id
              frequency
              comment
              risk_factor
              type {
                id
                name
              }
              owner
              createdAt
            }
            nextToken
          }
          pathologicalHistory {
            id
            surgicalInterventions {
              items {
                id
                surgicalIntervention {
                  id
                  name
                  description
                }
                createdAt
              }
            }
            patientMedications {
              items {
                id
                medications {
                  id
                  name
                }
                createdAt
                drug_concentration
              }
            }
            patientAllergies {
              items {
                id
                allergies {
                  id
                  name
                  description
                }
                createdAt
              }
            }
          }
          familyHistory {
            items {
              id
              alive
              comment
              createdAt
              diseases {
                items {
                  id
                  diseases {
                    id
                    name
                  }
                }
                nextToken
              }
              relationship {
                id
                name
              }
            }
            nextToken
          }
        }
      }
    }
  }
`;

export const listPatientsForAppjs = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        username
        email
        phone
        phone_id
        weight
        height
        size
        age
        sex
        image
        id_card
        religion {
          id
          name
          owner
        }
        address
        code
        temporary_password
        marital_status
        birthdate
        approved_terms_conditions
        createdAt
        owner
      }
      nextToken
    }
  }
`;

export const listSpecialitys = /* GraphQL */ `
  query ListSpecialitys(
    $filter: ModelSpecialityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpecialitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        code
        subSpeciality {
          items{
            id
            name
            subSpeciality {
              items {
                id
                name
              }
            }
          }
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;