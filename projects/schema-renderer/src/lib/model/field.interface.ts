export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: any[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
  desc?: string;
  link?: any;
  show?: boolean;
  childOf?: string;
  number?: number;
  hasChild?: boolean;
}
export interface Settings {
  "activationRemindersToggle": string,
  "activationRemindersAfterSending": string,
  "activationRemindersFrequent": string,
  "activationRemindersTemplate": string,
  "activationRemindersSentBy": Array<string>,
  "activationInvitationToggle": string,
  "activationInvitationTemplate": string,
  "welcomeMessageToggle": string,
  "welcomeMessageTemplate": string,
  "activationInvitationSentBy": Array<string>,
  "welcomeMessageSentBy": Array<string>,
  "assignmentCreationToggle": string,
  "assignmentCreationTemplate": string,
  "assignmentCreationSentBy": Array<string>,
  "assignmentRemindersUpcomingDate": string,
  "assignmentRemindersUpcomingTemplate": string,
  "assignmentRemindersStartToggle": string,
  "assignmentRemindersStartTemplate": string,
  "assignmentRemindersBeforeCompletion": string,
  "assignmentRemindersCompletionFrequent": string,
  "assignmentRemindersCompletionTemplate": string,
  "assignmentRemindersExpiryToggle": string,
  "assignmentRemindersExpiryTemplate": string,
  "assignmentRemindersUpcomingSentBy": Array<string>,
  "assignmentRemindersStartSentBy": Array<string>,
  "assignmentRemindersCompletionSentBy": Array<string>,
  "assignmentRemindersExpirySentBy": Array<string>,
  "sendactivationRemindersMessage": string,
  "activationReminderscategory": Array<string>,
  "sendactivationRemindersContent": string,
  "sendactivationRemindersIntegar": number,
  "sendactivationRemindersNumber": number,
  "activationRemindersmultiSelect": Array<string>,
  "sendactivationRemindersDuration": string,
}
