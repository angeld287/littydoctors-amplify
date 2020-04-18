export const updatePatientaddPatientHistory = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
        id
        patientHistory {
          nonPathologicalHistory {
              items {
                id
                frequency
                comment
                type {
                  id
                  name
                }
                owner
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
                }
              }
              patientMedications {
                items {
                  id
                  medications {
                    id
                    name
                    drug_concentration
                  }
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
                }
              }
          }
          familyHistory {
            items {
              id
              alive
              comment
              diseases {
                items {
                  diseases {
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
`;

export const createFamilyHistoryForGlobal = /* GraphQL */ `
  mutation CreateFamilyHistory(
    $input: CreateFamilyHistoryInput!
    $condition: ModelFamilyHistoryConditionInput
  ) {
    createFamilyHistory(input: $input, condition: $condition) {
      id
      relationship {
        id
        name
      }
      alive
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
      comment
      owner
      createdAt
    }
  }
`;

export const createFamilyDetailsDiseasesForGlobal = /* GraphQL */ `
  mutation CreateFamilyDetailsDiseases(
    $input: CreateFamilyDetailsDiseasesInput!
    $condition: ModelFamilyDetailsDiseasesConditionInput
  ) {
    createFamilyDetailsDiseases(input: $input, condition: $condition) {
      id
      diseases {
        id
        name
      }
    }
  }
`;

export const updateFamilyHistoryForGlobal = /* GraphQL */ `
  mutation UpdateFamilyHistory(
    $input: UpdateFamilyHistoryInput!
    $condition: ModelFamilyHistoryConditionInput
  ) {
    updateFamilyHistory(input: $input, condition: $condition) {
      id
      relationship {
        id
        name
      }
      alive
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
      comment
      owner
      createdAt
    }
  }
`;

export const deleteFamilyDetailsDiseasesForGlobal = /* GraphQL */ `
  mutation DeleteFamilyDetailsDiseases(
    $input: DeleteFamilyDetailsDiseasesInput!
    $condition: ModelFamilyDetailsDiseasesConditionInput
  ) {
    deleteFamilyDetailsDiseases(input: $input, condition: $condition) {
      id
      diseases {
        id
        name
      }
    }
  }
`;

export const createNonPathologicalHistoryForGlobal = /* GraphQL */ `
  mutation CreateNonPathologicalHistory(
    $input: CreateNonPathologicalHistoryInput!
    $condition: ModelNonPathologicalHistoryConditionInput
  ) {
    createNonPathologicalHistory(input: $input, condition: $condition) {
      id
      frequency
      comment
      type {
        id
        name
      }
      owner
      createdAt
    }
  }
`;

export const updateNonPathologicalHistoryForGlobal = /* GraphQL */ `
  mutation UpdateNonPathologicalHistory(
    $input: UpdateNonPathologicalHistoryInput!
    $condition: ModelNonPathologicalHistoryConditionInput
  ) {
    updateNonPathologicalHistory(input: $input, condition: $condition) {
      id
      frequency
      comment
      type {
        id
        name
      }
      owner
      createdAt
    }
  }
`;

export const updateMedicalConsultationForPCAGlobal = /* GraphQL */ `
  mutation UpdateMedicalConsultation(
    $input: UpdateMedicalConsultationInput!
    $condition: ModelMedicalConsultationConditionInput
  ) {
    updateMedicalConsultation(input: $input, condition: $condition) {
      id
      state
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
            medicalAnalysis{
              id
              name
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
`;

export const updatePostConsultActMedAnalysisForGlobal = /* GraphQL */ `
  mutation UpdatePostConsultActMedAnalysis(
    $input: UpdatePostConsultActMedAnalysisInput!
    $condition: ModelPostConsultActMedAnalysisConditionInput
  ) {
    updatePostConsultActMedAnalysis(input: $input, condition: $condition) {
      id
      state
      date
      results {
        items{
          id
          field {
            id
            name
          }
          value
        }
        nextToken
      }
      file
      pcActivities {
        id
        medicalpres {
          nextToken
        }
        medicalAnalysis {
          nextToken
        }
        surgicalIntervention {
          nextToken
        }
        doctor
        secretary
        patient
        createdAt
        owner
      }
      medicalAnalysis {
        id
        name
        code
        medicalAnalysis {
          nextToken
        }
        createdAt
        owner
      }
      createdAt
    }
  }
`;

export const createPhysicalExplorationForGlobal = /* GraphQL */ `
  mutation CreatePhysicalExploration(
    $input: CreatePhysicalExplorationInput!
    $condition: ModelPhysicalExplorationConditionInput
  ) {
    createPhysicalExploration(input: $input, condition: $condition) {
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
        createdAt
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
        createdAt
        owner
      }
      doctor
      secretary
      patient
      createdAt
      owner
    }
  }
`;

export const updatePhysicalExplorationForGlobal = /* GraphQL */ `
  mutation UpdatePhysicalExploration(
    $input: UpdatePhysicalExplorationInput!
    $condition: ModelPhysicalExplorationConditionInput
  ) {
    updatePhysicalExploration(input: $input, condition: $condition) {
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
        createdAt
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
        createdAt
        owner
      }
      doctor
      secretary
      patient
      createdAt
      owner
    }
  }
`;