/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery getExam($inviteId: ID!) {\n\t\texamByInvite(inviteId: $inviteId) {\n\t\t\t_id\n\t\t\tinviteId\n\t\t\tname\n\t\t\tdue\n\t\t\tcandidates {\n\t\t\t\t_id\n\t\t\t}\n\t\t\texaminer {\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temail\n\t\t\t\tprofilePicture\n\t\t\t}\n\t\t\tinviteId\n\t\t}\n\t}\n": types.GetExamDocument,
    "\n\tmutation ExamRegistrationMutation(\n\t\t$updateExamId: ID!\n\t\t$edits: UpdateExamArgs!\n\t) {\n\t\tupdateExam(id: $updateExamId, edits: $edits) {\n\t\t\tcandidatesId\n\t\t}\n\t}\n": types.ExamRegistrationMutationDocument,
    "\n\tquery userQuery($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofilePicture\n\t\t}\n\t}\n": types.UserQueryDocument,
    "\n\tmutation UpdateUserInfoMutation($updateUserId: ID!, $edits: UpdateUserArgs!) {\n\t\tupdateUser(id: $updateUserId, edits: $edits) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n": types.UpdateUserInfoMutationDocument,
    "\n\tquery ExaminerExams($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\texamsSet {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tdue\n\t\t\t\tinviteId\n\t\t\t\texaminer {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofilePicture\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.ExaminerExamsDocument,
    "\n\tquery getExaminerData($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\texamsRegisteredFor {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\tdue\n\t\t\t\tdescription\n\t\t\t\tinviteId\n\t\t\t\texaminer {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofilePicture\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t\texamsTaken {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\tdue\n\t\t\t\tdescription\n\t\t\t\tinviteId\n\t\t\t\texaminer {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofilePicture\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetExaminerDataDocument,
    "\nquery FetchExaminerExams($userId: ID!) {\n\tuser(id: $userId) {\n\t  examsSet {\n\t\t_id\n\t\tcandidatesId\n\t\tcreatedAt\n\t\tdue\n\t\tname\n\t\tinviteId\n\t  }\n\t}\n}": types.FetchExaminerExamsDocument,
    "\n        query GetResultsQuery($candidateId: ID!) {\n            results(candidateId: $candidateId) {\n              createdAt\n              exam {\n                name\n              }\n              candidate{\n                firstName\n                lastName\n              }\n              totalQuestions\n              status\n              score\n            }\n        }\n    ": types.GetResultsQueryDocument,
    "\n\tquery UserRole($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\trole\n\t\t}\n\t}\n": types.UserRoleDocument,
    "\n\tquery getUserData($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temail\n\t\t\trole\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n": types.GetUserDataDocument,
    "\n\tquery fetchUserInformation($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofilePicture\n\t\t\temail\n\t\t\trole\n\t\t}\n\t}\n": types.FetchUserInformationDocument,
    "\n\tmutation CreateExamMutation($edits: CreateExamArgs!) {\n\t\tcreateExam(edits: $edits) {\n\t\t\t_id\n\t\t\tinviteId\n\t\t}\n\t}\n": types.CreateExamMutationDocument,
    "\n\tquery fetchUserNames($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n": types.FetchUserNamesDocument,
    "\n\tquery fetchExam($examId: ID!) {\n\t\texam(id: $examId) {\n\t\t\tname\n\t\t\tdescription\n\t\t\tdue\n\t\t\tobjectiveQuestions {\n\t\t\t\tquestion\n\t\t\t\toptions\n\t\t\t}\n\t\t\ttheoryQuestions {\n\t\t\t\tquestion\n\t\t\t}\n\t\t\texaminer {\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t}\n\t\t}\n\t}\n": types.FetchExamDocument,
    "\n\tmutation submitExam($edits: CreateResultArgs!){\n\t\tcreateResult(edits: $edits) {\n    \t\tcandidateId\n    \t\tstatus\n  \t\t}\n\t}\n": types.SubmitExamDocument,
    "\n\tmutation CreateUserMutation($edits: CreateUserArgs!) {\n\t\tcreateUser(edits: $edits) {\n\t\t\t_id\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\trole\n\t\t}\n\t}\n": types.CreateUserMutationDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getExam($inviteId: ID!) {\n\t\texamByInvite(inviteId: $inviteId) {\n\t\t\t_id\n\t\t\tinviteId\n\t\t\tname\n\t\t\tdue\n\t\t\tcandidates {\n\t\t\t\t_id\n\t\t\t}\n\t\t\texaminer {\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temail\n\t\t\t\tprofilePicture\n\t\t\t}\n\t\t\tinviteId\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getExam($inviteId: ID!) {\n\t\texamByInvite(inviteId: $inviteId) {\n\t\t\t_id\n\t\t\tinviteId\n\t\t\tname\n\t\t\tdue\n\t\t\tcandidates {\n\t\t\t\t_id\n\t\t\t}\n\t\t\texaminer {\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temail\n\t\t\t\tprofilePicture\n\t\t\t}\n\t\t\tinviteId\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation ExamRegistrationMutation(\n\t\t$updateExamId: ID!\n\t\t$edits: UpdateExamArgs!\n\t) {\n\t\tupdateExam(id: $updateExamId, edits: $edits) {\n\t\t\tcandidatesId\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ExamRegistrationMutation(\n\t\t$updateExamId: ID!\n\t\t$edits: UpdateExamArgs!\n\t) {\n\t\tupdateExam(id: $updateExamId, edits: $edits) {\n\t\t\tcandidatesId\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery userQuery($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofilePicture\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery userQuery($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofilePicture\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateUserInfoMutation($updateUserId: ID!, $edits: UpdateUserArgs!) {\n\t\tupdateUser(id: $updateUserId, edits: $edits) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUserInfoMutation($updateUserId: ID!, $edits: UpdateUserArgs!) {\n\t\tupdateUser(id: $updateUserId, edits: $edits) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery ExaminerExams($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\texamsSet {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tdue\n\t\t\t\tinviteId\n\t\t\t\texaminer {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofilePicture\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery ExaminerExams($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\texamsSet {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tdue\n\t\t\t\tinviteId\n\t\t\t\texaminer {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofilePicture\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getExaminerData($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\texamsRegisteredFor {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\tdue\n\t\t\t\tdescription\n\t\t\t\tinviteId\n\t\t\t\texaminer {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofilePicture\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t\texamsTaken {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\tdue\n\t\t\t\tdescription\n\t\t\t\tinviteId\n\t\t\t\texaminer {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofilePicture\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getExaminerData($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\texamsRegisteredFor {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\tdue\n\t\t\t\tdescription\n\t\t\t\tinviteId\n\t\t\t\texaminer {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofilePicture\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t\texamsTaken {\n\t\t\t\t_id\n\t\t\t\tname\n\t\t\t\tdue\n\t\t\t\tdescription\n\t\t\t\tinviteId\n\t\t\t\texaminer {\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofilePicture\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery FetchExaminerExams($userId: ID!) {\n\tuser(id: $userId) {\n\t  examsSet {\n\t\t_id\n\t\tcandidatesId\n\t\tcreatedAt\n\t\tdue\n\t\tname\n\t\tinviteId\n\t  }\n\t}\n}"): (typeof documents)["\nquery FetchExaminerExams($userId: ID!) {\n\tuser(id: $userId) {\n\t  examsSet {\n\t\t_id\n\t\tcandidatesId\n\t\tcreatedAt\n\t\tdue\n\t\tname\n\t\tinviteId\n\t  }\n\t}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetResultsQuery($candidateId: ID!) {\n            results(candidateId: $candidateId) {\n              createdAt\n              exam {\n                name\n              }\n              candidate{\n                firstName\n                lastName\n              }\n              totalQuestions\n              status\n              score\n            }\n        }\n    "): (typeof documents)["\n        query GetResultsQuery($candidateId: ID!) {\n            results(candidateId: $candidateId) {\n              createdAt\n              exam {\n                name\n              }\n              candidate{\n                firstName\n                lastName\n              }\n              totalQuestions\n              status\n              score\n            }\n        }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery UserRole($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\trole\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery UserRole($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\trole\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getUserData($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temail\n\t\t\trole\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getUserData($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\temail\n\t\t\trole\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery fetchUserInformation($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofilePicture\n\t\t\temail\n\t\t\trole\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchUserInformation($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofilePicture\n\t\t\temail\n\t\t\trole\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateExamMutation($edits: CreateExamArgs!) {\n\t\tcreateExam(edits: $edits) {\n\t\t\t_id\n\t\t\tinviteId\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateExamMutation($edits: CreateExamArgs!) {\n\t\tcreateExam(edits: $edits) {\n\t\t\t_id\n\t\t\tinviteId\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery fetchUserNames($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchUserNames($id: ID!) {\n\t\tuser(id: $id) {\n\t\t\tfirstName\n\t\t\tlastName\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery fetchExam($examId: ID!) {\n\t\texam(id: $examId) {\n\t\t\tname\n\t\t\tdescription\n\t\t\tdue\n\t\t\tobjectiveQuestions {\n\t\t\t\tquestion\n\t\t\t\toptions\n\t\t\t}\n\t\t\ttheoryQuestions {\n\t\t\t\tquestion\n\t\t\t}\n\t\t\texaminer {\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchExam($examId: ID!) {\n\t\texam(id: $examId) {\n\t\t\tname\n\t\t\tdescription\n\t\t\tdue\n\t\t\tobjectiveQuestions {\n\t\t\t\tquestion\n\t\t\t\toptions\n\t\t\t}\n\t\t\ttheoryQuestions {\n\t\t\t\tquestion\n\t\t\t}\n\t\t\texaminer {\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation submitExam($edits: CreateResultArgs!){\n\t\tcreateResult(edits: $edits) {\n    \t\tcandidateId\n    \t\tstatus\n  \t\t}\n\t}\n"): (typeof documents)["\n\tmutation submitExam($edits: CreateResultArgs!){\n\t\tcreateResult(edits: $edits) {\n    \t\tcandidateId\n    \t\tstatus\n  \t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateUserMutation($edits: CreateUserArgs!) {\n\t\tcreateUser(edits: $edits) {\n\t\t\t_id\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\trole\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateUserMutation($edits: CreateUserArgs!) {\n\t\tcreateUser(edits: $edits) {\n\t\t\t_id\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\trole\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;