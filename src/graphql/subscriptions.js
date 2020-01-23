/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMedicalAppointment = `subscription OnCreateMedicalAppointment(
  $doctorname: String
  $secretary: String
) {
  onCreateMedicalAppointment(doctorname: $doctorname, secretary: $secretary) {
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
      consultingroom {
        id
        secretary
      }
      image
    }
    doctorname
    patient {
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
      birthdate
      patientHistory {
        id
      }
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
    read_doctor
    read_client
    createdAt
  }
}
`;
export const onUpdateMedicalAppointment = `subscription OnUpdateMedicalAppointment(
  $read_secretary: Boolean
  $read_doctor: Boolean
  $read_client: Boolean
  $doctorname: String
  $secretary: String
) {
  onUpdateMedicalAppointment(
    read_secretary: $read_secretary
    read_doctor: $read_doctor
    read_client: $read_client
    doctorname: $doctorname
    secretary: $secretary
  ) {
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
      consultingroom {
        id
        secretary
      }
      image
    }
    doctorname
    patient {
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
      birthdate
      patientHistory {
        id
      }
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
    read_doctor
    read_client
    createdAt
  }
}
`;
export const onCreateConsultingRoom = `subscription OnCreateConsultingRoom {
  onCreateConsultingRoom {
    id
    modules {
      items {
        id
        name
        image
        description
      }
      nextToken
    }
    doctor {
      id
      name
      username
      email
      speciality
      sex
      consultingroom {
        id
        secretary
      }
      image
    }
    stripe {
      id
      source_token
      plan_id
      plan_name
      customer_id
      subscription_id
    }
    secretary
    location {
      id
      name
    }
  }
}
`;
export const onUpdateConsultingRoom = `subscription OnUpdateConsultingRoom {
  onUpdateConsultingRoom {
    id
    modules {
      items {
        id
        name
        image
        description
      }
      nextToken
    }
    doctor {
      id
      name
      username
      email
      speciality
      sex
      consultingroom {
        id
        secretary
      }
      image
    }
    stripe {
      id
      source_token
      plan_id
      plan_name
      customer_id
      subscription_id
    }
    secretary
    location {
      id
      name
    }
  }
}
`;
export const onDeleteConsultingRoom = `subscription OnDeleteConsultingRoom {
  onDeleteConsultingRoom {
    id
    modules {
      items {
        id
        name
        image
        description
      }
      nextToken
    }
    doctor {
      id
      name
      username
      email
      speciality
      sex
      consultingroom {
        id
        secretary
      }
      image
    }
    stripe {
      id
      source_token
      plan_id
      plan_name
      customer_id
      subscription_id
    }
    secretary
    location {
      id
      name
    }
  }
}
`;
export const onCreateLocation = `subscription OnCreateLocation {
  onCreateLocation {
    id
    name
  }
}
`;
export const onUpdateLocation = `subscription OnUpdateLocation {
  onUpdateLocation {
    id
    name
  }
}
`;
export const onDeleteLocation = `subscription OnDeleteLocation {
  onDeleteLocation {
    id
    name
  }
}
`;
export const onCreateStripe = `subscription OnCreateStripe {
  onCreateStripe {
    id
    source_token
    plan_id
    plan_name
    customer_id
    subscription_id
  }
}
`;
export const onUpdateStripe = `subscription OnUpdateStripe {
  onUpdateStripe {
    id
    source_token
    plan_id
    plan_name
    customer_id
    subscription_id
  }
}
`;
export const onDeleteStripe = `subscription OnDeleteStripe {
  onDeleteStripe {
    id
    source_token
    plan_id
    plan_name
    customer_id
    subscription_id
  }
}
`;
export const onCreateDoctor = `subscription OnCreateDoctor {
  onCreateDoctor {
    id
    name
    username
    email
    speciality
    sex
    consultingroom {
      id
      modules {
        nextToken
      }
      doctor {
        id
        name
        username
        email
        speciality
        sex
        image
      }
      stripe {
        id
        source_token
        plan_id
        plan_name
        customer_id
        subscription_id
      }
      secretary
      location {
        id
        name
      }
    }
    image
  }
}
`;
export const onUpdateDoctor = `subscription OnUpdateDoctor {
  onUpdateDoctor {
    id
    name
    username
    email
    speciality
    sex
    consultingroom {
      id
      modules {
        nextToken
      }
      doctor {
        id
        name
        username
        email
        speciality
        sex
        image
      }
      stripe {
        id
        source_token
        plan_id
        plan_name
        customer_id
        subscription_id
      }
      secretary
      location {
        id
        name
      }
    }
    image
  }
}
`;
export const onDeleteDoctor = `subscription OnDeleteDoctor {
  onDeleteDoctor {
    id
    name
    username
    email
    speciality
    sex
    consultingroom {
      id
      modules {
        nextToken
      }
      doctor {
        id
        name
        username
        email
        speciality
        sex
        image
      }
      stripe {
        id
        source_token
        plan_id
        plan_name
        customer_id
        subscription_id
      }
      secretary
      location {
        id
        name
      }
    }
    image
  }
}
`;
export const onCreateRejection = `subscription OnCreateRejection {
  onCreateRejection {
    id
    description
    doctor
    secretary
    patient
    createdAt
  }
}
`;
export const onUpdateRejection = `subscription OnUpdateRejection {
  onUpdateRejection {
    id
    description
    doctor
    secretary
    patient
    createdAt
  }
}
`;
export const onDeleteRejection = `subscription OnDeleteRejection {
  onDeleteRejection {
    id
    description
    doctor
    secretary
    patient
    createdAt
  }
}
`;
export const onCreateCancelation = `subscription OnCreateCancelation {
  onCreateCancelation {
    id
    description
  }
}
`;
export const onUpdateCancelation = `subscription OnUpdateCancelation {
  onUpdateCancelation {
    id
    description
  }
}
`;
export const onDeleteCancelation = `subscription OnDeleteCancelation {
  onDeleteCancelation {
    id
    description
  }
}
`;
export const onCreateNotification = `subscription OnCreateNotification {
  onCreateNotification {
    id
    state
    doctor
    secretary
    patient
    createdAt
  }
}
`;
export const onUpdateNotification = `subscription OnUpdateNotification {
  onUpdateNotification {
    id
    state
    doctor
    secretary
    patient
    createdAt
  }
}
`;
export const onDeleteNotification = `subscription OnDeleteNotification {
  onDeleteNotification {
    id
    state
    doctor
    secretary
    patient
    createdAt
  }
}
`;
export const onCreateConfirmation = `subscription OnCreateConfirmation {
  onCreateConfirmation {
    id
  }
}
`;
export const onUpdateConfirmation = `subscription OnUpdateConfirmation {
  onUpdateConfirmation {
    id
  }
}
`;
export const onDeleteConfirmation = `subscription OnDeleteConfirmation {
  onDeleteConfirmation {
    id
  }
}
`;
export const onCreateModule = `subscription OnCreateModule {
  onCreateModule {
    id
    name
    fields {
      items {
        id
        name
      }
      nextToken
    }
    image
    description
  }
}
`;
export const onUpdateModule = `subscription OnUpdateModule {
  onUpdateModule {
    id
    name
    fields {
      items {
        id
        name
      }
      nextToken
    }
    image
    description
  }
}
`;
export const onDeleteModule = `subscription OnDeleteModule {
  onDeleteModule {
    id
    name
    fields {
      items {
        id
        name
      }
      nextToken
    }
    image
    description
  }
}
`;
export const onCreateDoctorCustomModuleProps = `subscription OnCreateDoctorCustomModuleProps {
  onCreateDoctorCustomModuleProps {
    id
    active
    module {
      id
      name
      fields {
        nextToken
      }
      image
      description
    }
  }
}
`;
export const onUpdateDoctorCustomModuleProps = `subscription OnUpdateDoctorCustomModuleProps {
  onUpdateDoctorCustomModuleProps {
    id
    active
    module {
      id
      name
      fields {
        nextToken
      }
      image
      description
    }
  }
}
`;
export const onDeleteDoctorCustomModuleProps = `subscription OnDeleteDoctorCustomModuleProps {
  onDeleteDoctorCustomModuleProps {
    id
    active
    module {
      id
      name
      fields {
        nextToken
      }
      image
      description
    }
  }
}
`;
export const onCreateField = `subscription OnCreateField {
  onCreateField {
    id
    name
  }
}
`;
export const onUpdateField = `subscription OnUpdateField {
  onUpdateField {
    id
    name
  }
}
`;
export const onDeleteField = `subscription OnDeleteField {
  onDeleteField {
    id
    name
  }
}
`;
export const onCreateDoctorCustomFieldProps = `subscription OnCreateDoctorCustomFieldProps {
  onCreateDoctorCustomFieldProps {
    id
    name
    required
    visible
    field {
      id
      name
    }
  }
}
`;
export const onUpdateDoctorCustomFieldProps = `subscription OnUpdateDoctorCustomFieldProps {
  onUpdateDoctorCustomFieldProps {
    id
    name
    required
    visible
    field {
      id
      name
    }
  }
}
`;
export const onDeleteDoctorCustomFieldProps = `subscription OnDeleteDoctorCustomFieldProps {
  onDeleteDoctorCustomFieldProps {
    id
    name
    required
    visible
    field {
      id
      name
    }
  }
}
`;
export const onCreateMedicalHistory = `subscription OnCreateMedicalHistory {
  onCreateMedicalHistory {
    id
    reason
    patient {
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
      birthdate
      patientHistory {
        id
      }
    }
    physicalExploration {
      id
      general_exploration
      vitalsigns {
        id
        blood_pressure
        Breathing
        Pulse
        Temperature
        doctor
        secretary
        patient
      }
      regionalExploration {
        id
        head
        neck
        thorax
        abdomen
        members
        genitals
        others
        doctor
        secretary
        patient
      }
      doctor
      secretary
      patient
    }
    postConsultationsActivities {
      id
      medicalPrescriptions {
        nextToken
      }
      medicalAnalysis {
        nextToken
      }
      doctor
      secretary
      patient
    }
    doctor
    secretary
    patientname
  }
}
`;
export const onUpdateMedicalHistory = `subscription OnUpdateMedicalHistory {
  onUpdateMedicalHistory {
    id
    reason
    patient {
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
      birthdate
      patientHistory {
        id
      }
    }
    physicalExploration {
      id
      general_exploration
      vitalsigns {
        id
        blood_pressure
        Breathing
        Pulse
        Temperature
        doctor
        secretary
        patient
      }
      regionalExploration {
        id
        head
        neck
        thorax
        abdomen
        members
        genitals
        others
        doctor
        secretary
        patient
      }
      doctor
      secretary
      patient
    }
    postConsultationsActivities {
      id
      medicalPrescriptions {
        nextToken
      }
      medicalAnalysis {
        nextToken
      }
      doctor
      secretary
      patient
    }
    doctor
    secretary
    patientname
  }
}
`;
export const onDeleteMedicalHistory = `subscription OnDeleteMedicalHistory {
  onDeleteMedicalHistory {
    id
    reason
    patient {
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
      birthdate
      patientHistory {
        id
      }
    }
    physicalExploration {
      id
      general_exploration
      vitalsigns {
        id
        blood_pressure
        Breathing
        Pulse
        Temperature
        doctor
        secretary
        patient
      }
      regionalExploration {
        id
        head
        neck
        thorax
        abdomen
        members
        genitals
        others
        doctor
        secretary
        patient
      }
      doctor
      secretary
      patient
    }
    postConsultationsActivities {
      id
      medicalPrescriptions {
        nextToken
      }
      medicalAnalysis {
        nextToken
      }
      doctor
      secretary
      patient
    }
    doctor
    secretary
    patientname
  }
}
`;
export const onCreatePatient = `subscription OnCreatePatient {
  onCreatePatient {
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
    birthdate
    patientHistory {
      id
      nonPathologicalHistory {
        id
      }
      pathologicalHistory {
        id
      }
      familyHistory {
        id
      }
      gynecoObstetricHistory {
        id
        menarche
        sexual_development
        menstrual_rhythm
        sex_life
        deliveries
        abortions
        caesarean_sections
        contraceptive_method
      }
    }
  }
}
`;
export const onUpdatePatient = `subscription OnUpdatePatient {
  onUpdatePatient {
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
    birthdate
    patientHistory {
      id
      nonPathologicalHistory {
        id
      }
      pathologicalHistory {
        id
      }
      familyHistory {
        id
      }
      gynecoObstetricHistory {
        id
        menarche
        sexual_development
        menstrual_rhythm
        sex_life
        deliveries
        abortions
        caesarean_sections
        contraceptive_method
      }
    }
  }
}
`;
export const onDeletePatient = `subscription OnDeletePatient {
  onDeletePatient {
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
    birthdate
    patientHistory {
      id
      nonPathologicalHistory {
        id
      }
      pathologicalHistory {
        id
      }
      familyHistory {
        id
      }
      gynecoObstetricHistory {
        id
        menarche
        sexual_development
        menstrual_rhythm
        sex_life
        deliveries
        abortions
        caesarean_sections
        contraceptive_method
      }
    }
  }
}
`;
export const onCreatePatientHistory = `subscription OnCreatePatientHistory {
  onCreatePatientHistory {
    id
    nonPathologicalHistory {
      id
      alcohol {
        id
        active
        frequency
        comment
      }
      smoking {
        id
        active
        frequency
        comment
      }
      drugs {
        id
        active
        frequency
        comment
      }
      immunizations {
        id
        active
        frequency
        comment
      }
    }
    pathologicalHistory {
      id
      surgicalInterventions {
        nextToken
      }
      patientMedications {
        nextToken
      }
      patientAllergies {
        nextToken
      }
    }
    familyHistory {
      id
      father {
        id
        alive
        relationship
        comment
      }
      mother {
        id
        alive
        relationship
        comment
      }
      brothers {
        id
        alive
        relationship
        comment
      }
      grandfather {
        id
        alive
        relationship
        comment
      }
      grandmother {
        id
        alive
        relationship
        comment
      }
      other {
        id
        alive
        relationship
        comment
      }
    }
    gynecoObstetricHistory {
      id
      menarche
      sexual_development
      menstrual_rhythm
      sex_life
      deliveries
      abortions
      caesarean_sections
      contraceptive_method
    }
  }
}
`;
export const onUpdatePatientHistory = `subscription OnUpdatePatientHistory {
  onUpdatePatientHistory {
    id
    nonPathologicalHistory {
      id
      alcohol {
        id
        active
        frequency
        comment
      }
      smoking {
        id
        active
        frequency
        comment
      }
      drugs {
        id
        active
        frequency
        comment
      }
      immunizations {
        id
        active
        frequency
        comment
      }
    }
    pathologicalHistory {
      id
      surgicalInterventions {
        nextToken
      }
      patientMedications {
        nextToken
      }
      patientAllergies {
        nextToken
      }
    }
    familyHistory {
      id
      father {
        id
        alive
        relationship
        comment
      }
      mother {
        id
        alive
        relationship
        comment
      }
      brothers {
        id
        alive
        relationship
        comment
      }
      grandfather {
        id
        alive
        relationship
        comment
      }
      grandmother {
        id
        alive
        relationship
        comment
      }
      other {
        id
        alive
        relationship
        comment
      }
    }
    gynecoObstetricHistory {
      id
      menarche
      sexual_development
      menstrual_rhythm
      sex_life
      deliveries
      abortions
      caesarean_sections
      contraceptive_method
    }
  }
}
`;
export const onDeletePatientHistory = `subscription OnDeletePatientHistory {
  onDeletePatientHistory {
    id
    nonPathologicalHistory {
      id
      alcohol {
        id
        active
        frequency
        comment
      }
      smoking {
        id
        active
        frequency
        comment
      }
      drugs {
        id
        active
        frequency
        comment
      }
      immunizations {
        id
        active
        frequency
        comment
      }
    }
    pathologicalHistory {
      id
      surgicalInterventions {
        nextToken
      }
      patientMedications {
        nextToken
      }
      patientAllergies {
        nextToken
      }
    }
    familyHistory {
      id
      father {
        id
        alive
        relationship
        comment
      }
      mother {
        id
        alive
        relationship
        comment
      }
      brothers {
        id
        alive
        relationship
        comment
      }
      grandfather {
        id
        alive
        relationship
        comment
      }
      grandmother {
        id
        alive
        relationship
        comment
      }
      other {
        id
        alive
        relationship
        comment
      }
    }
    gynecoObstetricHistory {
      id
      menarche
      sexual_development
      menstrual_rhythm
      sex_life
      deliveries
      abortions
      caesarean_sections
      contraceptive_method
    }
  }
}
`;
export const onCreateNonPathologicalHistory = `subscription OnCreateNonPathologicalHistory {
  onCreateNonPathologicalHistory {
    id
    alcohol {
      id
      active
      frequency
      comment
    }
    smoking {
      id
      active
      frequency
      comment
    }
    drugs {
      id
      active
      frequency
      comment
    }
    immunizations {
      id
      active
      frequency
      comment
    }
  }
}
`;
export const onUpdateNonPathologicalHistory = `subscription OnUpdateNonPathologicalHistory {
  onUpdateNonPathologicalHistory {
    id
    alcohol {
      id
      active
      frequency
      comment
    }
    smoking {
      id
      active
      frequency
      comment
    }
    drugs {
      id
      active
      frequency
      comment
    }
    immunizations {
      id
      active
      frequency
      comment
    }
  }
}
`;
export const onDeleteNonPathologicalHistory = `subscription OnDeleteNonPathologicalHistory {
  onDeleteNonPathologicalHistory {
    id
    alcohol {
      id
      active
      frequency
      comment
    }
    smoking {
      id
      active
      frequency
      comment
    }
    drugs {
      id
      active
      frequency
      comment
    }
    immunizations {
      id
      active
      frequency
      comment
    }
  }
}
`;
export const onCreateNonPathologicalActivities = `subscription OnCreateNonPathologicalActivities {
  onCreateNonPathologicalActivities {
    id
    active
    frequency
    comment
  }
}
`;
export const onUpdateNonPathologicalActivities = `subscription OnUpdateNonPathologicalActivities {
  onUpdateNonPathologicalActivities {
    id
    active
    frequency
    comment
  }
}
`;
export const onDeleteNonPathologicalActivities = `subscription OnDeleteNonPathologicalActivities {
  onDeleteNonPathologicalActivities {
    id
    active
    frequency
    comment
  }
}
`;
export const onCreatePathologicalHistory = `subscription OnCreatePathologicalHistory {
  onCreatePathologicalHistory {
    id
    surgicalInterventions {
      items {
        id
        name
      }
      nextToken
    }
    patientMedications {
      items {
        id
      }
      nextToken
    }
    patientAllergies {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onUpdatePathologicalHistory = `subscription OnUpdatePathologicalHistory {
  onUpdatePathologicalHistory {
    id
    surgicalInterventions {
      items {
        id
        name
      }
      nextToken
    }
    patientMedications {
      items {
        id
      }
      nextToken
    }
    patientAllergies {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onDeletePathologicalHistory = `subscription OnDeletePathologicalHistory {
  onDeletePathologicalHistory {
    id
    surgicalInterventions {
      items {
        id
        name
      }
      nextToken
    }
    patientMedications {
      items {
        id
      }
      nextToken
    }
    patientAllergies {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onCreateFamilyHistory = `subscription OnCreateFamilyHistory {
  onCreateFamilyHistory {
    id
    father {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    mother {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    brothers {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    grandfather {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    grandmother {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    other {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
  }
}
`;
export const onUpdateFamilyHistory = `subscription OnUpdateFamilyHistory {
  onUpdateFamilyHistory {
    id
    father {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    mother {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    brothers {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    grandfather {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    grandmother {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    other {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
  }
}
`;
export const onDeleteFamilyHistory = `subscription OnDeleteFamilyHistory {
  onDeleteFamilyHistory {
    id
    father {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    mother {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    brothers {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    grandfather {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    grandmother {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
    other {
      id
      alive
      relationship
      diseases {
        id
        name
      }
      comment
    }
  }
}
`;
export const onCreateFamilyDetails = `subscription OnCreateFamilyDetails {
  onCreateFamilyDetails {
    id
    alive
    relationship
    diseases {
      id
      name
    }
    comment
  }
}
`;
export const onUpdateFamilyDetails = `subscription OnUpdateFamilyDetails {
  onUpdateFamilyDetails {
    id
    alive
    relationship
    diseases {
      id
      name
    }
    comment
  }
}
`;
export const onDeleteFamilyDetails = `subscription OnDeleteFamilyDetails {
  onDeleteFamilyDetails {
    id
    alive
    relationship
    diseases {
      id
      name
    }
    comment
  }
}
`;
export const onCreateDiseases = `subscription OnCreateDiseases {
  onCreateDiseases {
    id
    name
  }
}
`;
export const onUpdateDiseases = `subscription OnUpdateDiseases {
  onUpdateDiseases {
    id
    name
  }
}
`;
export const onDeleteDiseases = `subscription OnDeleteDiseases {
  onDeleteDiseases {
    id
    name
  }
}
`;
export const onCreateGynecoObstetricHistory = `subscription OnCreateGynecoObstetricHistory {
  onCreateGynecoObstetricHistory {
    id
    menarche
    sexual_development
    menstrual_rhythm
    sex_life
    deliveries
    abortions
    caesarean_sections
    contraceptive_method
  }
}
`;
export const onUpdateGynecoObstetricHistory = `subscription OnUpdateGynecoObstetricHistory {
  onUpdateGynecoObstetricHistory {
    id
    menarche
    sexual_development
    menstrual_rhythm
    sex_life
    deliveries
    abortions
    caesarean_sections
    contraceptive_method
  }
}
`;
export const onDeleteGynecoObstetricHistory = `subscription OnDeleteGynecoObstetricHistory {
  onDeleteGynecoObstetricHistory {
    id
    menarche
    sexual_development
    menstrual_rhythm
    sex_life
    deliveries
    abortions
    caesarean_sections
    contraceptive_method
  }
}
`;
export const onCreateAllergies = `subscription OnCreateAllergies {
  onCreateAllergies {
    id
    name
    patients {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onUpdateAllergies = `subscription OnUpdateAllergies {
  onUpdateAllergies {
    id
    name
    patients {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onDeleteAllergies = `subscription OnDeleteAllergies {
  onDeleteAllergies {
    id
    name
    patients {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onCreatePatientAllergies = `subscription OnCreatePatientAllergies {
  onCreatePatientAllergies {
    id
    pathologicalHistory {
      id
      surgicalInterventions {
        nextToken
      }
      patientMedications {
        nextToken
      }
      patientAllergies {
        nextToken
      }
    }
    allergies {
      id
      name
      patients {
        nextToken
      }
    }
  }
}
`;
export const onUpdatePatientAllergies = `subscription OnUpdatePatientAllergies {
  onUpdatePatientAllergies {
    id
    pathologicalHistory {
      id
      surgicalInterventions {
        nextToken
      }
      patientMedications {
        nextToken
      }
      patientAllergies {
        nextToken
      }
    }
    allergies {
      id
      name
      patients {
        nextToken
      }
    }
  }
}
`;
export const onDeletePatientAllergies = `subscription OnDeletePatientAllergies {
  onDeletePatientAllergies {
    id
    pathologicalHistory {
      id
      surgicalInterventions {
        nextToken
      }
      patientMedications {
        nextToken
      }
      patientAllergies {
        nextToken
      }
    }
    allergies {
      id
      name
      patients {
        nextToken
      }
    }
  }
}
`;
export const onCreatePatientMedications = `subscription OnCreatePatientMedications {
  onCreatePatientMedications {
    id
    pathologicalHistory {
      id
      surgicalInterventions {
        nextToken
      }
      patientMedications {
        nextToken
      }
      patientAllergies {
        nextToken
      }
    }
    medications {
      id
      name
      patients {
        nextToken
      }
      code
      drug_concentration
      chemical_composition
      mp {
        nextToken
      }
    }
  }
}
`;
export const onUpdatePatientMedications = `subscription OnUpdatePatientMedications {
  onUpdatePatientMedications {
    id
    pathologicalHistory {
      id
      surgicalInterventions {
        nextToken
      }
      patientMedications {
        nextToken
      }
      patientAllergies {
        nextToken
      }
    }
    medications {
      id
      name
      patients {
        nextToken
      }
      code
      drug_concentration
      chemical_composition
      mp {
        nextToken
      }
    }
  }
}
`;
export const onDeletePatientMedications = `subscription OnDeletePatientMedications {
  onDeletePatientMedications {
    id
    pathologicalHistory {
      id
      surgicalInterventions {
        nextToken
      }
      patientMedications {
        nextToken
      }
      patientAllergies {
        nextToken
      }
    }
    medications {
      id
      name
      patients {
        nextToken
      }
      code
      drug_concentration
      chemical_composition
      mp {
        nextToken
      }
    }
  }
}
`;
export const onCreateMedicines = `subscription OnCreateMedicines {
  onCreateMedicines {
    id
    name
    patients {
      items {
        id
      }
      nextToken
    }
    code
    drug_concentration
    chemical_composition
    mp {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onUpdateMedicines = `subscription OnUpdateMedicines {
  onUpdateMedicines {
    id
    name
    patients {
      items {
        id
      }
      nextToken
    }
    code
    drug_concentration
    chemical_composition
    mp {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onDeleteMedicines = `subscription OnDeleteMedicines {
  onDeleteMedicines {
    id
    name
    patients {
      items {
        id
      }
      nextToken
    }
    code
    drug_concentration
    chemical_composition
    mp {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onCreatePostConsultationsActivities = `subscription OnCreatePostConsultationsActivities {
  onCreatePostConsultationsActivities {
    id
    medicalPrescriptions {
      items {
        id
        state
        date
      }
      nextToken
    }
    medicalAnalysis {
      items {
        id
        state
        date
      }
      nextToken
    }
    doctor
    secretary
    patient
  }
}
`;
export const onUpdatePostConsultationsActivities = `subscription OnUpdatePostConsultationsActivities {
  onUpdatePostConsultationsActivities {
    id
    medicalPrescriptions {
      items {
        id
        state
        date
      }
      nextToken
    }
    medicalAnalysis {
      items {
        id
        state
        date
      }
      nextToken
    }
    doctor
    secretary
    patient
  }
}
`;
export const onDeletePostConsultationsActivities = `subscription OnDeletePostConsultationsActivities {
  onDeletePostConsultationsActivities {
    id
    medicalPrescriptions {
      items {
        id
        state
        date
      }
      nextToken
    }
    medicalAnalysis {
      items {
        id
        state
        date
      }
      nextToken
    }
    doctor
    secretary
    patient
  }
}
`;
export const onCreateMedicalPrescriptions = `subscription OnCreateMedicalPrescriptions {
  onCreateMedicalPrescriptions {
    id
    date
    frequency
    duration
    medications {
      items {
        id
      }
      nextToken
    }
    pca {
      items {
        id
        state
        date
      }
      nextToken
    }
    doctor
    secretary
    patient
  }
}
`;
export const onUpdateMedicalPrescriptions = `subscription OnUpdateMedicalPrescriptions {
  onUpdateMedicalPrescriptions {
    id
    date
    frequency
    duration
    medications {
      items {
        id
      }
      nextToken
    }
    pca {
      items {
        id
        state
        date
      }
      nextToken
    }
    doctor
    secretary
    patient
  }
}
`;
export const onDeleteMedicalPrescriptions = `subscription OnDeleteMedicalPrescriptions {
  onDeleteMedicalPrescriptions {
    id
    date
    frequency
    duration
    medications {
      items {
        id
      }
      nextToken
    }
    pca {
      items {
        id
        state
        date
      }
      nextToken
    }
    doctor
    secretary
    patient
  }
}
`;
export const onCreatePostConsultActMedicalPres = `subscription OnCreatePostConsultActMedicalPres {
  onCreatePostConsultActMedicalPres {
    id
    state
    date
    pcActivities {
      id
      medicalPrescriptions {
        nextToken
      }
      medicalAnalysis {
        nextToken
      }
      doctor
      secretary
      patient
    }
    medicalPrescriptions {
      id
      date
      frequency
      duration
      medications {
        nextToken
      }
      pca {
        nextToken
      }
      doctor
      secretary
      patient
    }
  }
}
`;
export const onUpdatePostConsultActMedicalPres = `subscription OnUpdatePostConsultActMedicalPres {
  onUpdatePostConsultActMedicalPres {
    id
    state
    date
    pcActivities {
      id
      medicalPrescriptions {
        nextToken
      }
      medicalAnalysis {
        nextToken
      }
      doctor
      secretary
      patient
    }
    medicalPrescriptions {
      id
      date
      frequency
      duration
      medications {
        nextToken
      }
      pca {
        nextToken
      }
      doctor
      secretary
      patient
    }
  }
}
`;
export const onDeletePostConsultActMedicalPres = `subscription OnDeletePostConsultActMedicalPres {
  onDeletePostConsultActMedicalPres {
    id
    state
    date
    pcActivities {
      id
      medicalPrescriptions {
        nextToken
      }
      medicalAnalysis {
        nextToken
      }
      doctor
      secretary
      patient
    }
    medicalPrescriptions {
      id
      date
      frequency
      duration
      medications {
        nextToken
      }
      pca {
        nextToken
      }
      doctor
      secretary
      patient
    }
  }
}
`;
export const onCreateMedicalPrescriptionsMedications = `subscription OnCreateMedicalPrescriptionsMedications {
  onCreateMedicalPrescriptionsMedications {
    id
    medicalPrescriptions {
      id
      date
      frequency
      duration
      medications {
        nextToken
      }
      pca {
        nextToken
      }
      doctor
      secretary
      patient
    }
    medications {
      id
      name
      patients {
        nextToken
      }
      code
      drug_concentration
      chemical_composition
      mp {
        nextToken
      }
    }
  }
}
`;
export const onUpdateMedicalPrescriptionsMedications = `subscription OnUpdateMedicalPrescriptionsMedications {
  onUpdateMedicalPrescriptionsMedications {
    id
    medicalPrescriptions {
      id
      date
      frequency
      duration
      medications {
        nextToken
      }
      pca {
        nextToken
      }
      doctor
      secretary
      patient
    }
    medications {
      id
      name
      patients {
        nextToken
      }
      code
      drug_concentration
      chemical_composition
      mp {
        nextToken
      }
    }
  }
}
`;
export const onDeleteMedicalPrescriptionsMedications = `subscription OnDeleteMedicalPrescriptionsMedications {
  onDeleteMedicalPrescriptionsMedications {
    id
    medicalPrescriptions {
      id
      date
      frequency
      duration
      medications {
        nextToken
      }
      pca {
        nextToken
      }
      doctor
      secretary
      patient
    }
    medications {
      id
      name
      patients {
        nextToken
      }
      code
      drug_concentration
      chemical_composition
      mp {
        nextToken
      }
    }
  }
}
`;
export const onCreatePostConsultActMedAnalysis = `subscription OnCreatePostConsultActMedAnalysis {
  onCreatePostConsultActMedAnalysis {
    id
    state
    date
    pcActivities {
      id
      medicalPrescriptions {
        nextToken
      }
      medicalAnalysis {
        nextToken
      }
      doctor
      secretary
      patient
    }
    medicalAnalysis {
      id
      name
      code
      medicalAnalysis {
        nextToken
      }
    }
  }
}
`;
export const onUpdatePostConsultActMedAnalysis = `subscription OnUpdatePostConsultActMedAnalysis {
  onUpdatePostConsultActMedAnalysis {
    id
    state
    date
    pcActivities {
      id
      medicalPrescriptions {
        nextToken
      }
      medicalAnalysis {
        nextToken
      }
      doctor
      secretary
      patient
    }
    medicalAnalysis {
      id
      name
      code
      medicalAnalysis {
        nextToken
      }
    }
  }
}
`;
export const onDeletePostConsultActMedAnalysis = `subscription OnDeletePostConsultActMedAnalysis {
  onDeletePostConsultActMedAnalysis {
    id
    state
    date
    pcActivities {
      id
      medicalPrescriptions {
        nextToken
      }
      medicalAnalysis {
        nextToken
      }
      doctor
      secretary
      patient
    }
    medicalAnalysis {
      id
      name
      code
      medicalAnalysis {
        nextToken
      }
    }
  }
}
`;
export const onCreateMedicalAnalysis = `subscription OnCreateMedicalAnalysis {
  onCreateMedicalAnalysis {
    id
    name
    code
    medicalAnalysis {
      items {
        id
        state
        date
      }
      nextToken
    }
  }
}
`;
export const onUpdateMedicalAnalysis = `subscription OnUpdateMedicalAnalysis {
  onUpdateMedicalAnalysis {
    id
    name
    code
    medicalAnalysis {
      items {
        id
        state
        date
      }
      nextToken
    }
  }
}
`;
export const onDeleteMedicalAnalysis = `subscription OnDeleteMedicalAnalysis {
  onDeleteMedicalAnalysis {
    id
    name
    code
    medicalAnalysis {
      items {
        id
        state
        date
      }
      nextToken
    }
  }
}
`;
export const onCreateSurgicalIntervention = `subscription OnCreateSurgicalIntervention {
  onCreateSurgicalIntervention {
    id
    name
  }
}
`;
export const onUpdateSurgicalIntervention = `subscription OnUpdateSurgicalIntervention {
  onUpdateSurgicalIntervention {
    id
    name
  }
}
`;
export const onDeleteSurgicalIntervention = `subscription OnDeleteSurgicalIntervention {
  onDeleteSurgicalIntervention {
    id
    name
  }
}
`;
export const onCreatePhysicalExploration = `subscription OnCreatePhysicalExploration {
  onCreatePhysicalExploration {
    id
    general_exploration
    vitalsigns {
      id
      blood_pressure
      Breathing
      Pulse
      Temperature
      doctor
      secretary
      patient
    }
    regionalExploration {
      id
      head
      neck
      thorax
      abdomen
      members
      genitals
      others
      doctor
      secretary
      patient
    }
    doctor
    secretary
    patient
  }
}
`;
export const onUpdatePhysicalExploration = `subscription OnUpdatePhysicalExploration {
  onUpdatePhysicalExploration {
    id
    general_exploration
    vitalsigns {
      id
      blood_pressure
      Breathing
      Pulse
      Temperature
      doctor
      secretary
      patient
    }
    regionalExploration {
      id
      head
      neck
      thorax
      abdomen
      members
      genitals
      others
      doctor
      secretary
      patient
    }
    doctor
    secretary
    patient
  }
}
`;
export const onDeletePhysicalExploration = `subscription OnDeletePhysicalExploration {
  onDeletePhysicalExploration {
    id
    general_exploration
    vitalsigns {
      id
      blood_pressure
      Breathing
      Pulse
      Temperature
      doctor
      secretary
      patient
    }
    regionalExploration {
      id
      head
      neck
      thorax
      abdomen
      members
      genitals
      others
      doctor
      secretary
      patient
    }
    doctor
    secretary
    patient
  }
}
`;
export const onCreateVitalSigns = `subscription OnCreateVitalSigns {
  onCreateVitalSigns {
    id
    blood_pressure
    Breathing
    Pulse
    Temperature
    doctor
    secretary
    patient
  }
}
`;
export const onUpdateVitalSigns = `subscription OnUpdateVitalSigns {
  onUpdateVitalSigns {
    id
    blood_pressure
    Breathing
    Pulse
    Temperature
    doctor
    secretary
    patient
  }
}
`;
export const onDeleteVitalSigns = `subscription OnDeleteVitalSigns {
  onDeleteVitalSigns {
    id
    blood_pressure
    Breathing
    Pulse
    Temperature
    doctor
    secretary
    patient
  }
}
`;
export const onCreateRegionalExploration = `subscription OnCreateRegionalExploration {
  onCreateRegionalExploration {
    id
    head
    neck
    thorax
    abdomen
    members
    genitals
    others
    doctor
    secretary
    patient
  }
}
`;
export const onUpdateRegionalExploration = `subscription OnUpdateRegionalExploration {
  onUpdateRegionalExploration {
    id
    head
    neck
    thorax
    abdomen
    members
    genitals
    others
    doctor
    secretary
    patient
  }
}
`;
export const onDeleteRegionalExploration = `subscription OnDeleteRegionalExploration {
  onDeleteRegionalExploration {
    id
    head
    neck
    thorax
    abdomen
    members
    genitals
    others
    doctor
    secretary
    patient
  }
}
`;
