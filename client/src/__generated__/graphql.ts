/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

export type CreateExamArgs = {
  candidatesId?: InputMaybe<Array<Scalars['ID']['input']>>;
  description: Scalars['String']['input'];
  due: Scalars['Date']['input'];
  examinerId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  objectiveQuestions?: InputMaybe<Array<ObjInput>>;
  theoryQuestions?: InputMaybe<Array<TheoryInput>>;
};

export type CreateUserArgs = {
  _id: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  role: Role;
};

export type Exam = {
  __typename?: 'Exam';
  _id: Scalars['ID']['output'];
  candidates?: Maybe<Array<User>>;
  candidatesId?: Maybe<Array<Scalars['ID']['output']>>;
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  due: Scalars['Date']['output'];
  examiner: User;
  examinerId: Scalars['ID']['output'];
  inviteId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  objectiveQuestions?: Maybe<Array<ObjQuestion>>;
  submittedCandidates?: Maybe<Array<User>>;
  submittedIds?: Maybe<Array<Scalars['ID']['output']>>;
  theoryQuestions?: Maybe<Array<TheoryQuestion>>;
  updatedAt: Scalars['Date']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExam?: Maybe<Exam>;
  createUser?: Maybe<User>;
  deleteExam?: Maybe<Exam>;
  deleteUser?: Maybe<User>;
  updateExam?: Maybe<Exam>;
  updateUser?: Maybe<User>;
};


export type MutationCreateExamArgs = {
  edits: CreateExamArgs;
};


export type MutationCreateUserArgs = {
  edits: CreateUserArgs;
};


export type MutationDeleteExamArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateExamArgs = {
  edits: UpdateExamArgs;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  edits: UpdateUserArgs;
  id: Scalars['ID']['input'];
};

export type ObjInput = {
  answer: Scalars['Int']['input'];
  options: Array<Scalars['String']['input']>;
  question: Scalars['String']['input'];
};

export type ObjQuestion = {
  __typename?: 'ObjQuestion';
  answer: Scalars['Int']['output'];
  options: Array<Scalars['String']['output']>;
  question: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  exam?: Maybe<Exam>;
  examByInvite?: Maybe<Exam>;
  user?: Maybe<User>;
};


export type QueryExamArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExamByInviteArgs = {
  inviteId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export enum Role {
  Examiner = 'EXAMINER',
  Student = 'STUDENT'
}

export type TheoryInput = {
  answers: Array<Scalars['String']['input']>;
  question: Scalars['String']['input'];
};

export type TheoryQuestion = {
  __typename?: 'TheoryQuestion';
  answers: Array<Scalars['String']['output']>;
  question: Scalars['String']['output'];
};

export type UpdateExamArgs = {
  candidatesId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  submit?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  examsRegisteredFor?: Maybe<Array<Exam>>;
  examsSet?: Maybe<Array<Exam>>;
  examsSetId?: Maybe<Array<Scalars['ID']['output']>>;
  examsTaken?: Maybe<Array<Exam>>;
  examsTakenId?: Maybe<Array<Scalars['ID']['output']>>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
  role: Role;
  updatedAt: Scalars['Date']['output'];
};

export type GetExamQueryVariables = Exact<{
  inviteId: Scalars['ID']['input'];
}>;


export type GetExamQuery = { __typename?: 'Query', examByInvite?: { __typename?: 'Exam', _id: string, inviteId: string, name: string, due: any, candidates?: Array<{ __typename?: 'User', _id: string }> | null, examiner: { __typename?: 'User', firstName: string, lastName: string, email: string, profilePicture?: string | null } } | null };

export type ExamRegistrationMutationMutationVariables = Exact<{
  updateExamId: Scalars['ID']['input'];
  edits: UpdateExamArgs;
}>;


export type ExamRegistrationMutationMutation = { __typename?: 'Mutation', updateExam?: { __typename?: 'Exam', candidatesId?: Array<string> | null } | null };

export type UserQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQueryQuery = { __typename?: 'Query', user?: { __typename?: 'User', firstName: string, lastName: string, profilePicture?: string | null } | null };

export type FetchUserRoleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FetchUserRoleQuery = { __typename?: 'Query', user?: { __typename?: 'User', role: Role, firstName: string, lastName: string } | null };

export type UpdateUserInfoMutationMutationVariables = Exact<{
  updateUserId: Scalars['ID']['input'];
  edits: UpdateUserArgs;
}>;


export type UpdateUserInfoMutationMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', firstName: string, lastName: string } | null };

export type ExaminerExamsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ExaminerExamsQuery = { __typename?: 'Query', user?: { __typename?: 'User', examsSet?: Array<{ __typename?: 'Exam', _id: string, name: string, description: string, due: any, inviteId: string, examiner: { __typename?: 'User', firstName: string, lastName: string, profilePicture?: string | null, createdAt: any } }> | null } | null };

export type GetExaminerDataQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetExaminerDataQuery = { __typename?: 'Query', user?: { __typename?: 'User', examsRegisteredFor?: Array<{ __typename?: 'Exam', _id: string, name: string, due: any, description: string, inviteId: string, examiner: { __typename?: 'User', firstName: string, lastName: string, profilePicture?: string | null, createdAt: any } }> | null, examsTaken?: Array<{ __typename?: 'Exam', _id: string, name: string, due: any, description: string, inviteId: string, examiner: { __typename?: 'User', firstName: string, lastName: string, profilePicture?: string | null, createdAt: any } }> | null } | null };

export type UserRoleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserRoleQuery = { __typename?: 'Query', user?: { __typename?: 'User', role: Role } | null };

export type GetUserDataQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserDataQuery = { __typename?: 'Query', user?: { __typename?: 'User', firstName: string, lastName: string, email: string, role: Role, createdAt: any, updatedAt: any } | null };

export type FetchUserInformationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FetchUserInformationQuery = { __typename?: 'Query', user?: { __typename?: 'User', firstName: string, lastName: string, profilePicture?: string | null, email: string, role: Role } | null };

export type CreateExamMutationMutationVariables = Exact<{
  edits: CreateExamArgs;
}>;


export type CreateExamMutationMutation = { __typename?: 'Mutation', createExam?: { __typename?: 'Exam', _id: string, inviteId: string } | null };

export type FetchUserNamesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FetchUserNamesQuery = { __typename?: 'Query', user?: { __typename?: 'User', role: Role, firstName: string, lastName: string } | null };

export type FetchExamQueryVariables = Exact<{
  examId: Scalars['ID']['input'];
}>;


export type FetchExamQuery = { __typename?: 'Query', exam?: { __typename?: 'Exam', name: string, description: string, due: any, objectiveQuestions?: Array<{ __typename?: 'ObjQuestion', question: string, options: Array<string> }> | null, theoryQuestions?: Array<{ __typename?: 'TheoryQuestion', question: string }> | null, examiner: { __typename?: 'User', firstName: string, lastName: string } } | null };

export type CreateUserMutationMutationVariables = Exact<{
  edits: CreateUserArgs;
}>;


export type CreateUserMutationMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', _id: string, firstName: string, lastName: string, role: Role } | null };


export const GetExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"examByInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"inviteId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"due"}},{"kind":"Field","name":{"kind":"Name","value":"candidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"examiner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inviteId"}}]}}]}}]} as unknown as DocumentNode<GetExamQuery, GetExamQueryVariables>;
export const ExamRegistrationMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExamRegistrationMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"edits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExamArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"edits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"edits"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidatesId"}}]}}]}}]} as unknown as DocumentNode<ExamRegistrationMutationMutation, ExamRegistrationMutationMutationVariables>;
export const UserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]} as unknown as DocumentNode<UserQueryQuery, UserQueryQueryVariables>;
export const FetchUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<FetchUserRoleQuery, FetchUserRoleQueryVariables>;
export const UpdateUserInfoMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserInfoMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"edits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"edits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"edits"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<UpdateUserInfoMutationMutation, UpdateUserInfoMutationMutationVariables>;
export const ExaminerExamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExaminerExams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"examsSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"due"}},{"kind":"Field","name":{"kind":"Name","value":"inviteId"}},{"kind":"Field","name":{"kind":"Name","value":"examiner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ExaminerExamsQuery, ExaminerExamsQueryVariables>;
export const GetExaminerDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getExaminerData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"examsRegisteredFor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"due"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"inviteId"}},{"kind":"Field","name":{"kind":"Name","value":"examiner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"examsTaken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"due"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"inviteId"}},{"kind":"Field","name":{"kind":"Name","value":"examiner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetExaminerDataQuery, GetExaminerDataQueryVariables>;
export const UserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<UserRoleQuery, UserRoleQueryVariables>;
export const GetUserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserDataQuery, GetUserDataQueryVariables>;
export const FetchUserInformationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchUserInformation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<FetchUserInformationQuery, FetchUserInformationQueryVariables>;
export const CreateExamMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExamMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"edits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExamArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"edits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"edits"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"inviteId"}}]}}]}}]} as unknown as DocumentNode<CreateExamMutationMutation, CreateExamMutationMutationVariables>;
export const FetchUserNamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchUserNames"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<FetchUserNamesQuery, FetchUserNamesQueryVariables>;
export const FetchExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"examId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"examId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"due"}},{"kind":"Field","name":{"kind":"Name","value":"objectiveQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"options"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theoryQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}}]}},{"kind":"Field","name":{"kind":"Name","value":"examiner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<FetchExamQuery, FetchExamQueryVariables>;
export const CreateUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"edits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"edits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"edits"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutationMutation, CreateUserMutationMutationVariables>;