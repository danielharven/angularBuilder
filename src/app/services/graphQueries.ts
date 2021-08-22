export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** A time string with format: HH:mm:ss.SSS */
  Time: any
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** The `Long` scalar type represents 52-bit integers */
  Long: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Morph =
  | District
  | DistrictAggregator
  | DistrictConnection
  | DistrictConnectionCreatedAt
  | DistrictConnectionId
  | DistrictConnectionLabel
  | DistrictConnectionProvince
  | DistrictConnectionPublished_At
  | DistrictConnectionUpdatedAt
  | DistrictConnection_Id
  | DistrictGroupBy
  | Download
  | DownloadAggregator
  | DownloadConnection
  | DownloadConnectionCreatedAt
  | DownloadConnectionId
  | DownloadConnectionUpdatedAt
  | DownloadConnection_Id
  | DownloadGroupBy
  | Nrc
  | NrcAggregator
  | NrcConnection
  | NrcConnectionConfirmed
  | NrcConnectionCreatedAt
  | NrcConnectionDistrict
  | NrcConnectionDob
  | NrcConnectionDor
  | NrcConnectionGender
  | NrcConnectionId
  | NrcConnectionNames
  | NrcConnectionNrc
  | NrcConnectionPic_Id1
  | NrcConnectionPic_Id2
  | NrcConnectionUpdatedAt
  | NrcConnectionVillage
  | NrcConnection_Id
  | NrcGroupBy
  | Province
  | ProvinceAggregator
  | ProvinceConnection
  | ProvinceConnectionCreatedAt
  | ProvinceConnectionId
  | ProvinceConnectionName
  | ProvinceConnectionPublished_At
  | ProvinceConnectionUpdatedAt
  | ProvinceConnection_Id
  | ProvinceGroupBy
  | UploadFile
  | UploadFileAggregator
  | UploadFileAggregatorAvg
  | UploadFileAggregatorMax
  | UploadFileAggregatorMin
  | UploadFileAggregatorSum
  | UploadFileConnection
  | UploadFileConnectionAlternativeText
  | UploadFileConnectionCaption
  | UploadFileConnectionCreatedAt
  | UploadFileConnectionExt
  | UploadFileConnectionFormats
  | UploadFileConnectionHash
  | UploadFileConnectionHeight
  | UploadFileConnectionId
  | UploadFileConnectionMime
  | UploadFileConnectionName
  | UploadFileConnectionPreviewUrl
  | UploadFileConnectionProvider
  | UploadFileConnectionProvider_Metadata
  | UploadFileConnectionSize
  | UploadFileConnectionUpdatedAt
  | UploadFileConnectionUrl
  | UploadFileConnectionWidth
  | UploadFileConnection_Id
  | UploadFileGroupBy
  | UploadedDocuments
  | UploadedDocumentsAggregator
  | UploadedDocumentsConnection
  | UploadedDocumentsConnectionCreatedAt
  | UploadedDocumentsConnectionId
  | UploadedDocumentsConnectionPublished_At
  | UploadedDocumentsConnectionUpdatedAt
  | UploadedDocumentsConnection_Id
  | UploadedDocumentsGroupBy
  | UserPermissionsPasswordPayload
  | UsersPermissionsLoginPayload
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsRoleAggregator
  | UsersPermissionsRoleConnection
  | UsersPermissionsRoleConnectionDescription
  | UsersPermissionsRoleConnectionId
  | UsersPermissionsRoleConnectionName
  | UsersPermissionsRoleConnectionType
  | UsersPermissionsRoleConnection_Id
  | UsersPermissionsRoleGroupBy
  | UsersPermissionsUser
  | UsersPermissionsUserAggregator
  | UsersPermissionsUserConnection
  | UsersPermissionsUserConnectionBlocked
  | UsersPermissionsUserConnectionConfirmed
  | UsersPermissionsUserConnectionCreatedAt
  | UsersPermissionsUserConnectionEmail
  | UsersPermissionsUserConnectionId
  | UsersPermissionsUserConnectionProvider
  | UsersPermissionsUserConnectionRole
  | UsersPermissionsUserConnectionUpdatedAt
  | UsersPermissionsUserConnectionUsername
  | UsersPermissionsUserConnection_Id
  | UsersPermissionsUserGroupBy
  | CreateDistrictPayload
  | CreateDownloadPayload
  | CreateNrcPayload
  | CreateProvincePayload
  | CreateRolePayload
  | CreateUploadedDocumentPayload
  | CreateUserPayload
  | DeleteDistrictPayload
  | DeleteDownloadPayload
  | DeleteFilePayload
  | DeleteNrcPayload
  | DeleteProvincePayload
  | DeleteRolePayload
  | DeleteUploadedDocumentPayload
  | DeleteUserPayload
  | UpdateDistrictPayload
  | UpdateDownloadPayload
  | UpdateNrcPayload
  | UpdateProvincePayload
  | UpdateRolePayload
  | UpdateUploadedDocumentPayload
  | UpdateUserPayload

export type AdminUser = {
  __typename?: 'AdminUser'
  firstname: Scalars['String']
  id: Scalars['ID']
  lastname: Scalars['String']
  username?: Maybe<Scalars['String']>
}

export type District = {
  __typename?: 'District'
  _id: Scalars['ID']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  label?: Maybe<Scalars['String']>
  province?: Maybe<Province>
  published_at?: Maybe<Scalars['DateTime']>
  updatedAt: Scalars['DateTime']
}

export type DistrictAggregator = {
  __typename?: 'DistrictAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type DistrictConnection = {
  __typename?: 'DistrictConnection'
  aggregate?: Maybe<DistrictAggregator>
  groupBy?: Maybe<DistrictGroupBy>
  values?: Maybe<Array<Maybe<District>>>
}

export type DistrictConnectionCreatedAt = {
  __typename?: 'DistrictConnectionCreatedAt'
  connection?: Maybe<DistrictConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type DistrictConnectionId = {
  __typename?: 'DistrictConnectionId'
  connection?: Maybe<DistrictConnection>
  key?: Maybe<Scalars['ID']>
}

export type DistrictConnectionLabel = {
  __typename?: 'DistrictConnectionLabel'
  connection?: Maybe<DistrictConnection>
  key?: Maybe<Scalars['String']>
}

export type DistrictConnectionProvince = {
  __typename?: 'DistrictConnectionProvince'
  connection?: Maybe<DistrictConnection>
  key?: Maybe<Scalars['ID']>
}

export type DistrictConnectionPublished_At = {
  __typename?: 'DistrictConnectionPublished_at'
  connection?: Maybe<DistrictConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type DistrictConnectionUpdatedAt = {
  __typename?: 'DistrictConnectionUpdatedAt'
  connection?: Maybe<DistrictConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type DistrictConnection_Id = {
  __typename?: 'DistrictConnection_id'
  connection?: Maybe<DistrictConnection>
  key?: Maybe<Scalars['ID']>
}

export type DistrictGroupBy = {
  __typename?: 'DistrictGroupBy'
  _id?: Maybe<Array<Maybe<DistrictConnection_Id>>>
  createdAt?: Maybe<Array<Maybe<DistrictConnectionCreatedAt>>>
  id?: Maybe<Array<Maybe<DistrictConnectionId>>>
  label?: Maybe<Array<Maybe<DistrictConnectionLabel>>>
  province?: Maybe<Array<Maybe<DistrictConnectionProvince>>>
  published_at?: Maybe<Array<Maybe<DistrictConnectionPublished_At>>>
  updatedAt?: Maybe<Array<Maybe<DistrictConnectionUpdatedAt>>>
}

export type Download = {
  __typename?: 'Download'
  _id: Scalars['ID']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  updatedAt: Scalars['DateTime']
}

export type DownloadAggregator = {
  __typename?: 'DownloadAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type DownloadConnection = {
  __typename?: 'DownloadConnection'
  aggregate?: Maybe<DownloadAggregator>
  groupBy?: Maybe<DownloadGroupBy>
  values?: Maybe<Array<Maybe<Download>>>
}

export type DownloadConnectionCreatedAt = {
  __typename?: 'DownloadConnectionCreatedAt'
  connection?: Maybe<DownloadConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type DownloadConnectionId = {
  __typename?: 'DownloadConnectionId'
  connection?: Maybe<DownloadConnection>
  key?: Maybe<Scalars['ID']>
}

export type DownloadConnectionUpdatedAt = {
  __typename?: 'DownloadConnectionUpdatedAt'
  connection?: Maybe<DownloadConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type DownloadConnection_Id = {
  __typename?: 'DownloadConnection_id'
  connection?: Maybe<DownloadConnection>
  key?: Maybe<Scalars['ID']>
}

export type DownloadGroupBy = {
  __typename?: 'DownloadGroupBy'
  _id?: Maybe<Array<Maybe<DownloadConnection_Id>>>
  createdAt?: Maybe<Array<Maybe<DownloadConnectionCreatedAt>>>
  id?: Maybe<Array<Maybe<DownloadConnectionId>>>
  updatedAt?: Maybe<Array<Maybe<DownloadConnectionUpdatedAt>>>
}

export type Mutation = {
  __typename?: 'Mutation'
  createDistrict?: Maybe<CreateDistrictPayload>
  createDownload?: Maybe<CreateDownloadPayload>
  createNrc?: Maybe<CreateNrcPayload>
  createProvince?: Maybe<CreateProvincePayload>
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>
  createUploadedDocument?: Maybe<CreateUploadedDocumentPayload>
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>
  deleteDistrict?: Maybe<DeleteDistrictPayload>
  deleteDownload?: Maybe<DeleteDownloadPayload>
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>
  deleteNrc?: Maybe<DeleteNrcPayload>
  deleteProvince?: Maybe<DeleteProvincePayload>
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>
  deleteUploadedDocument?: Maybe<DeleteUploadedDocumentPayload>
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>
  login: UsersPermissionsLoginPayload
  multipleUpload: Array<Maybe<UploadFile>>
  register: UsersPermissionsLoginPayload
  resetPassword?: Maybe<UsersPermissionsLoginPayload>
  updateDistrict?: Maybe<UpdateDistrictPayload>
  updateDownload?: Maybe<UpdateDownloadPayload>
  updateFileInfo: UploadFile
  updateNrc?: Maybe<UpdateNrcPayload>
  updateProvince?: Maybe<UpdateProvincePayload>
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>
  updateUploadedDocument?: Maybe<UpdateUploadedDocumentPayload>
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>
  upload: UploadFile
}

export type MutationCreateDistrictArgs = {
  input?: Maybe<CreateDistrictInput>
}

export type MutationCreateDownloadArgs = {
  input?: Maybe<CreateDownloadInput>
}

export type MutationCreateNrcArgs = {
  input?: Maybe<CreateNrcInput>
}

export type MutationCreateProvinceArgs = {
  input?: Maybe<CreateProvinceInput>
}

export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>
}

export type MutationCreateUploadedDocumentArgs = {
  input?: Maybe<CreateUploadedDocumentInput>
}

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>
}

export type MutationDeleteDistrictArgs = {
  input?: Maybe<DeleteDistrictInput>
}

export type MutationDeleteDownloadArgs = {
  input?: Maybe<DeleteDownloadInput>
}

export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>
}

export type MutationDeleteNrcArgs = {
  input?: Maybe<DeleteNrcInput>
}

export type MutationDeleteProvinceArgs = {
  input?: Maybe<DeleteProvinceInput>
}

export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>
}

export type MutationDeleteUploadedDocumentArgs = {
  input?: Maybe<DeleteUploadedDocumentInput>
}

export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>
}

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']
}

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput
}

export type MutationMultipleUploadArgs = {
  field?: Maybe<Scalars['String']>
  files: Array<Maybe<Scalars['Upload']>>
  ref?: Maybe<Scalars['String']>
  refId?: Maybe<Scalars['ID']>
  source?: Maybe<Scalars['String']>
}

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput
}

export type MutationResetPasswordArgs = {
  code: Scalars['String']
  password: Scalars['String']
  passwordConfirmation: Scalars['String']
}

export type MutationUpdateDistrictArgs = {
  input?: Maybe<UpdateDistrictInput>
}

export type MutationUpdateDownloadArgs = {
  input?: Maybe<UpdateDownloadInput>
}

export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']
  info: FileInfoInput
}

export type MutationUpdateNrcArgs = {
  input?: Maybe<UpdateNrcInput>
}

export type MutationUpdateProvinceArgs = {
  input?: Maybe<UpdateProvinceInput>
}

export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>
}

export type MutationUpdateUploadedDocumentArgs = {
  input?: Maybe<UpdateUploadedDocumentInput>
}

export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>
}

export type MutationUploadArgs = {
  field?: Maybe<Scalars['String']>
  file: Scalars['Upload']
  ref?: Maybe<Scalars['String']>
  refId?: Maybe<Scalars['ID']>
  source?: Maybe<Scalars['String']>
}

export type Nrc = {
  __typename?: 'Nrc'
  _id: Scalars['ID']
  confirmed?: Maybe<Scalars['Boolean']>
  createdAt: Scalars['DateTime']
  district?: Maybe<District>
  dob?: Maybe<Scalars['Date']>
  dor?: Maybe<Scalars['Date']>
  gender?: Maybe<Scalars['String']>
  id: Scalars['ID']
  names?: Maybe<Scalars['String']>
  nrc?: Maybe<Scalars['String']>
  pic_id1?: Maybe<Scalars['String']>
  pic_id2?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  village?: Maybe<Scalars['String']>
}

export type NrcAggregator = {
  __typename?: 'NrcAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type NrcConnection = {
  __typename?: 'NrcConnection'
  aggregate?: Maybe<NrcAggregator>
  groupBy?: Maybe<NrcGroupBy>
  values?: Maybe<Array<Maybe<Nrc>>>
}

export type NrcConnectionConfirmed = {
  __typename?: 'NrcConnectionConfirmed'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['Boolean']>
}

export type NrcConnectionCreatedAt = {
  __typename?: 'NrcConnectionCreatedAt'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type NrcConnectionDistrict = {
  __typename?: 'NrcConnectionDistrict'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['ID']>
}

export type NrcConnectionDob = {
  __typename?: 'NrcConnectionDob'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['ID']>
}

export type NrcConnectionDor = {
  __typename?: 'NrcConnectionDor'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['ID']>
}

export type NrcConnectionGender = {
  __typename?: 'NrcConnectionGender'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['String']>
}

export type NrcConnectionId = {
  __typename?: 'NrcConnectionId'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['ID']>
}

export type NrcConnectionNames = {
  __typename?: 'NrcConnectionNames'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['String']>
}

export type NrcConnectionNrc = {
  __typename?: 'NrcConnectionNrc'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['String']>
}

export type NrcConnectionPic_Id1 = {
  __typename?: 'NrcConnectionPic_id1'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['String']>
}

export type NrcConnectionPic_Id2 = {
  __typename?: 'NrcConnectionPic_id2'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['String']>
}

export type NrcConnectionUpdatedAt = {
  __typename?: 'NrcConnectionUpdatedAt'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type NrcConnectionVillage = {
  __typename?: 'NrcConnectionVillage'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['String']>
}

export type NrcConnection_Id = {
  __typename?: 'NrcConnection_id'
  connection?: Maybe<NrcConnection>
  key?: Maybe<Scalars['ID']>
}

export type NrcGroupBy = {
  __typename?: 'NrcGroupBy'
  _id?: Maybe<Array<Maybe<NrcConnection_Id>>>
  confirmed?: Maybe<Array<Maybe<NrcConnectionConfirmed>>>
  createdAt?: Maybe<Array<Maybe<NrcConnectionCreatedAt>>>
  district?: Maybe<Array<Maybe<NrcConnectionDistrict>>>
  dob?: Maybe<Array<Maybe<NrcConnectionDob>>>
  dor?: Maybe<Array<Maybe<NrcConnectionDor>>>
  gender?: Maybe<Array<Maybe<NrcConnectionGender>>>
  id?: Maybe<Array<Maybe<NrcConnectionId>>>
  names?: Maybe<Array<Maybe<NrcConnectionNames>>>
  nrc?: Maybe<Array<Maybe<NrcConnectionNrc>>>
  pic_id1?: Maybe<Array<Maybe<NrcConnectionPic_Id1>>>
  pic_id2?: Maybe<Array<Maybe<NrcConnectionPic_Id2>>>
  updatedAt?: Maybe<Array<Maybe<NrcConnectionUpdatedAt>>>
  village?: Maybe<Array<Maybe<NrcConnectionVillage>>>
}

export type Province = {
  __typename?: 'Province'
  _id: Scalars['ID']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name: Scalars['String']
  published_at?: Maybe<Scalars['DateTime']>
  updatedAt: Scalars['DateTime']
}

export type ProvinceAggregator = {
  __typename?: 'ProvinceAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type ProvinceConnection = {
  __typename?: 'ProvinceConnection'
  aggregate?: Maybe<ProvinceAggregator>
  groupBy?: Maybe<ProvinceGroupBy>
  values?: Maybe<Array<Maybe<Province>>>
}

export type ProvinceConnectionCreatedAt = {
  __typename?: 'ProvinceConnectionCreatedAt'
  connection?: Maybe<ProvinceConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type ProvinceConnectionId = {
  __typename?: 'ProvinceConnectionId'
  connection?: Maybe<ProvinceConnection>
  key?: Maybe<Scalars['ID']>
}

export type ProvinceConnectionName = {
  __typename?: 'ProvinceConnectionName'
  connection?: Maybe<ProvinceConnection>
  key?: Maybe<Scalars['String']>
}

export type ProvinceConnectionPublished_At = {
  __typename?: 'ProvinceConnectionPublished_at'
  connection?: Maybe<ProvinceConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type ProvinceConnectionUpdatedAt = {
  __typename?: 'ProvinceConnectionUpdatedAt'
  connection?: Maybe<ProvinceConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type ProvinceConnection_Id = {
  __typename?: 'ProvinceConnection_id'
  connection?: Maybe<ProvinceConnection>
  key?: Maybe<Scalars['ID']>
}

export type ProvinceGroupBy = {
  __typename?: 'ProvinceGroupBy'
  _id?: Maybe<Array<Maybe<ProvinceConnection_Id>>>
  createdAt?: Maybe<Array<Maybe<ProvinceConnectionCreatedAt>>>
  id?: Maybe<Array<Maybe<ProvinceConnectionId>>>
  name?: Maybe<Array<Maybe<ProvinceConnectionName>>>
  published_at?: Maybe<Array<Maybe<ProvinceConnectionPublished_At>>>
  updatedAt?: Maybe<Array<Maybe<ProvinceConnectionUpdatedAt>>>
}

export type Query = {
  __typename?: 'Query'
  district?: Maybe<District>
  districts?: Maybe<Array<Maybe<District>>>
  districtsConnection?: Maybe<DistrictConnection>
  download?: Maybe<Download>
  downloads?: Maybe<Array<Maybe<Download>>>
  downloadsConnection?: Maybe<DownloadConnection>
  files?: Maybe<Array<Maybe<UploadFile>>>
  filesConnection?: Maybe<UploadFileConnection>
  me?: Maybe<UsersPermissionsMe>
  nrc?: Maybe<Nrc>
  nrcs?: Maybe<Array<Maybe<Nrc>>>
  nrcsConnection?: Maybe<NrcConnection>
  province?: Maybe<Province>
  provinces?: Maybe<Array<Maybe<Province>>>
  provincesConnection?: Maybe<ProvinceConnection>
  role?: Maybe<UsersPermissionsRole>
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>
  uploadedDocument?: Maybe<UploadedDocuments>
  uploadedDocuments?: Maybe<Array<Maybe<UploadedDocuments>>>
  uploadedDocumentsConnection?: Maybe<UploadedDocumentsConnection>
  user?: Maybe<UsersPermissionsUser>
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>
  usersConnection?: Maybe<UsersPermissionsUserConnection>
}

export type QueryDistrictArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryDistrictsArgs = {
  limit?: Maybe<Scalars['Int']>
  publicationState?: Maybe<PublicationState>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryDistrictsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryDownloadArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryDownloadsArgs = {
  limit?: Maybe<Scalars['Int']>
  publicationState?: Maybe<PublicationState>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryDownloadsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryFilesArgs = {
  limit?: Maybe<Scalars['Int']>
  publicationState?: Maybe<PublicationState>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryFilesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryNrcArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryNrcsArgs = {
  limit?: Maybe<Scalars['Int']>
  publicationState?: Maybe<PublicationState>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryNrcsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryProvinceArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryProvincesArgs = {
  limit?: Maybe<Scalars['Int']>
  publicationState?: Maybe<PublicationState>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryProvincesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryRoleArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryRolesArgs = {
  limit?: Maybe<Scalars['Int']>
  publicationState?: Maybe<PublicationState>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryRolesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryUploadedDocumentArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryUploadedDocumentsArgs = {
  limit?: Maybe<Scalars['Int']>
  publicationState?: Maybe<PublicationState>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryUploadedDocumentsConnectionArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryUserArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>
  publicationState?: Maybe<PublicationState>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryUsersConnectionArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UploadFile = {
  __typename?: 'UploadFile'
  _id: Scalars['ID']
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  ext?: Maybe<Scalars['String']>
  formats?: Maybe<Scalars['JSON']>
  hash: Scalars['String']
  height?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  mime: Scalars['String']
  name: Scalars['String']
  previewUrl?: Maybe<Scalars['String']>
  provider: Scalars['String']
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<Morph>>>
  size: Scalars['Float']
  updatedAt: Scalars['DateTime']
  url: Scalars['String']
  width?: Maybe<Scalars['Int']>
}

export type UploadFileRelatedArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator'
  avg?: Maybe<UploadFileAggregatorAvg>
  count?: Maybe<Scalars['Int']>
  max?: Maybe<UploadFileAggregatorMax>
  min?: Maybe<UploadFileAggregatorMin>
  sum?: Maybe<UploadFileAggregatorSum>
  totalCount?: Maybe<Scalars['Int']>
}

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg'
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
}

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax'
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
}

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin'
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
}

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum'
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
}

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection'
  aggregate?: Maybe<UploadFileAggregator>
  groupBy?: Maybe<UploadFileGroupBy>
  values?: Maybe<Array<Maybe<UploadFile>>>
}

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['String']>
}

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['String']>
}

export type UploadFileConnectionCreatedAt = {
  __typename?: 'UploadFileConnectionCreatedAt'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['String']>
}

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['JSON']>
}

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['String']>
}

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['Int']>
}

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['ID']>
}

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['String']>
}

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['String']>
}

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['String']>
}

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['String']>
}

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['JSON']>
}

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['Float']>
}

export type UploadFileConnectionUpdatedAt = {
  __typename?: 'UploadFileConnectionUpdatedAt'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['String']>
}

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['Int']>
}

export type UploadFileConnection_Id = {
  __typename?: 'UploadFileConnection_id'
  connection?: Maybe<UploadFileConnection>
  key?: Maybe<Scalars['ID']>
}

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy'
  _id?: Maybe<Array<Maybe<UploadFileConnection_Id>>>
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>
  createdAt?: Maybe<Array<Maybe<UploadFileConnectionCreatedAt>>>
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>
  updatedAt?: Maybe<Array<Maybe<UploadFileConnectionUpdatedAt>>>
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>
}

export type UploadedDocuments = {
  __typename?: 'UploadedDocuments'
  _id: Scalars['ID']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name?: Maybe<Array<Maybe<UploadFile>>>
  published_at?: Maybe<Scalars['DateTime']>
  updatedAt: Scalars['DateTime']
}

export type UploadedDocumentsNameArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UploadedDocumentsAggregator = {
  __typename?: 'UploadedDocumentsAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type UploadedDocumentsConnection = {
  __typename?: 'UploadedDocumentsConnection'
  aggregate?: Maybe<UploadedDocumentsAggregator>
  groupBy?: Maybe<UploadedDocumentsGroupBy>
  values?: Maybe<Array<Maybe<UploadedDocuments>>>
}

export type UploadedDocumentsConnectionCreatedAt = {
  __typename?: 'UploadedDocumentsConnectionCreatedAt'
  connection?: Maybe<UploadedDocumentsConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type UploadedDocumentsConnectionId = {
  __typename?: 'UploadedDocumentsConnectionId'
  connection?: Maybe<UploadedDocumentsConnection>
  key?: Maybe<Scalars['ID']>
}

export type UploadedDocumentsConnectionPublished_At = {
  __typename?: 'UploadedDocumentsConnectionPublished_at'
  connection?: Maybe<UploadedDocumentsConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type UploadedDocumentsConnectionUpdatedAt = {
  __typename?: 'UploadedDocumentsConnectionUpdatedAt'
  connection?: Maybe<UploadedDocumentsConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type UploadedDocumentsConnection_Id = {
  __typename?: 'UploadedDocumentsConnection_id'
  connection?: Maybe<UploadedDocumentsConnection>
  key?: Maybe<Scalars['ID']>
}

export type UploadedDocumentsGroupBy = {
  __typename?: 'UploadedDocumentsGroupBy'
  _id?: Maybe<Array<Maybe<UploadedDocumentsConnection_Id>>>
  createdAt?: Maybe<Array<Maybe<UploadedDocumentsConnectionCreatedAt>>>
  id?: Maybe<Array<Maybe<UploadedDocumentsConnectionId>>>
  published_at?: Maybe<Array<Maybe<UploadedDocumentsConnectionPublished_At>>>
  updatedAt?: Maybe<Array<Maybe<UploadedDocumentsConnectionUpdatedAt>>>
}

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload'
  ok: Scalars['Boolean']
}

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload'
  jwt?: Maybe<Scalars['String']>
  user: UsersPermissionsMe
}

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe'
  blocked?: Maybe<Scalars['Boolean']>
  confirmed?: Maybe<Scalars['Boolean']>
  email: Scalars['String']
  id: Scalars['ID']
  role?: Maybe<UsersPermissionsMeRole>
  username: Scalars['String']
}

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole'
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  type?: Maybe<Scalars['String']>
}

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission'
  _id: Scalars['ID']
  action: Scalars['String']
  controller: Scalars['String']
  enabled: Scalars['Boolean']
  id: Scalars['ID']
  policy?: Maybe<Scalars['String']>
  role?: Maybe<UsersPermissionsRole>
  type: Scalars['String']
}

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole'
  _id: Scalars['ID']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>
  type?: Maybe<Scalars['String']>
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>
}

export type UsersPermissionsRolePermissionsArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UsersPermissionsRoleUsersArgs = {
  limit?: Maybe<Scalars['Int']>
  sort?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection'
  aggregate?: Maybe<UsersPermissionsRoleAggregator>
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>
}

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription'
  connection?: Maybe<UsersPermissionsRoleConnection>
  key?: Maybe<Scalars['String']>
}

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId'
  connection?: Maybe<UsersPermissionsRoleConnection>
  key?: Maybe<Scalars['ID']>
}

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName'
  connection?: Maybe<UsersPermissionsRoleConnection>
  key?: Maybe<Scalars['String']>
}

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType'
  connection?: Maybe<UsersPermissionsRoleConnection>
  key?: Maybe<Scalars['String']>
}

export type UsersPermissionsRoleConnection_Id = {
  __typename?: 'UsersPermissionsRoleConnection_id'
  connection?: Maybe<UsersPermissionsRoleConnection>
  key?: Maybe<Scalars['ID']>
}

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy'
  _id?: Maybe<Array<Maybe<UsersPermissionsRoleConnection_Id>>>
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>
}

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser'
  _id: Scalars['ID']
  blocked?: Maybe<Scalars['Boolean']>
  confirmed?: Maybe<Scalars['Boolean']>
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  id: Scalars['ID']
  provider?: Maybe<Scalars['String']>
  role?: Maybe<UsersPermissionsRole>
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
}

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection'
  aggregate?: Maybe<UsersPermissionsUserAggregator>
  groupBy?: Maybe<UsersPermissionsUserGroupBy>
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>
}

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['Boolean']>
}

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['Boolean']>
}

export type UsersPermissionsUserConnectionCreatedAt = {
  __typename?: 'UsersPermissionsUserConnectionCreatedAt'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['String']>
}

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['ID']>
}

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['String']>
}

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['ID']>
}

export type UsersPermissionsUserConnectionUpdatedAt = {
  __typename?: 'UsersPermissionsUserConnectionUpdatedAt'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['DateTime']>
}

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['String']>
}

export type UsersPermissionsUserConnection_Id = {
  __typename?: 'UsersPermissionsUserConnection_id'
  connection?: Maybe<UsersPermissionsUserConnection>
  key?: Maybe<Scalars['ID']>
}

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy'
  _id?: Maybe<Array<Maybe<UsersPermissionsUserConnection_Id>>>
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>
  createdAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreatedAt>>>
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>
  updatedAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdatedAt>>>
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>
}

export type CreateDistrictPayload = {
  __typename?: 'createDistrictPayload'
  district?: Maybe<District>
}

export type CreateDownloadPayload = {
  __typename?: 'createDownloadPayload'
  download?: Maybe<Download>
}

export type CreateNrcPayload = {
  __typename?: 'createNrcPayload'
  nrc?: Maybe<Nrc>
}

export type CreateProvincePayload = {
  __typename?: 'createProvincePayload'
  province?: Maybe<Province>
}

export type CreateRolePayload = {
  __typename?: 'createRolePayload'
  role?: Maybe<UsersPermissionsRole>
}

export type CreateUploadedDocumentPayload = {
  __typename?: 'createUploadedDocumentPayload'
  uploadedDocument?: Maybe<UploadedDocuments>
}

export type CreateUserPayload = {
  __typename?: 'createUserPayload'
  user?: Maybe<UsersPermissionsUser>
}

export type DeleteDistrictPayload = {
  __typename?: 'deleteDistrictPayload'
  district?: Maybe<District>
}

export type DeleteDownloadPayload = {
  __typename?: 'deleteDownloadPayload'
  download?: Maybe<Download>
}

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload'
  file?: Maybe<UploadFile>
}

export type DeleteNrcPayload = {
  __typename?: 'deleteNrcPayload'
  nrc?: Maybe<Nrc>
}

export type DeleteProvincePayload = {
  __typename?: 'deleteProvincePayload'
  province?: Maybe<Province>
}

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload'
  role?: Maybe<UsersPermissionsRole>
}

export type DeleteUploadedDocumentPayload = {
  __typename?: 'deleteUploadedDocumentPayload'
  uploadedDocument?: Maybe<UploadedDocuments>
}

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload'
  user?: Maybe<UsersPermissionsUser>
}

export type UpdateDistrictPayload = {
  __typename?: 'updateDistrictPayload'
  district?: Maybe<District>
}

export type UpdateDownloadPayload = {
  __typename?: 'updateDownloadPayload'
  download?: Maybe<Download>
}

export type UpdateNrcPayload = {
  __typename?: 'updateNrcPayload'
  nrc?: Maybe<Nrc>
}

export type UpdateProvincePayload = {
  __typename?: 'updateProvincePayload'
  province?: Maybe<Province>
}

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload'
  role?: Maybe<UsersPermissionsRole>
}

export type UpdateUploadedDocumentPayload = {
  __typename?: 'updateUploadedDocumentPayload'
  uploadedDocument?: Maybe<UploadedDocuments>
}

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload'
  user?: Maybe<UsersPermissionsUser>
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW',
}

export type DistrictInput = {
  created_by?: Maybe<Scalars['ID']>
  label?: Maybe<Scalars['String']>
  province?: Maybe<Scalars['ID']>
  published_at?: Maybe<Scalars['DateTime']>
  updated_by?: Maybe<Scalars['ID']>
}

export type DownloadInput = {
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type FileInfoInput = {
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type FileInput = {
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  created_by?: Maybe<Scalars['ID']>
  ext?: Maybe<Scalars['String']>
  formats?: Maybe<Scalars['JSON']>
  hash: Scalars['String']
  height?: Maybe<Scalars['Int']>
  mime: Scalars['String']
  name: Scalars['String']
  previewUrl?: Maybe<Scalars['String']>
  provider: Scalars['String']
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<Scalars['ID']>>>
  size: Scalars['Float']
  updated_by?: Maybe<Scalars['ID']>
  url: Scalars['String']
  width?: Maybe<Scalars['Int']>
}

export type InputId = {
  id: Scalars['ID']
}

export type NrcInput = {
  confirmed?: Maybe<Scalars['Boolean']>
  created_by?: Maybe<Scalars['ID']>
  district?: Maybe<Scalars['ID']>
  dob?: Maybe<Scalars['Date']>
  dor?: Maybe<Scalars['Date']>
  gender?: Maybe<Scalars['String']>
  names?: Maybe<Scalars['String']>
  nrc?: Maybe<Scalars['String']>
  pic_id1?: Maybe<Scalars['String']>
  pic_id2?: Maybe<Scalars['String']>
  updated_by?: Maybe<Scalars['ID']>
  village?: Maybe<Scalars['String']>
}

export type ProvinceInput = {
  created_by?: Maybe<Scalars['ID']>
  name: Scalars['String']
  published_at?: Maybe<Scalars['DateTime']>
  updated_by?: Maybe<Scalars['ID']>
}

export type RoleInput = {
  created_by?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>
  type?: Maybe<Scalars['String']>
  updated_by?: Maybe<Scalars['ID']>
  users?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type UploadedDocumentInput = {
  created_by?: Maybe<Scalars['ID']>
  name?: Maybe<Array<Maybe<Scalars['ID']>>>
  published_at?: Maybe<Scalars['DateTime']>
  updated_by?: Maybe<Scalars['ID']>
}

export type UserInput = {
  blocked?: Maybe<Scalars['Boolean']>
  confirmationToken?: Maybe<Scalars['String']>
  confirmed?: Maybe<Scalars['Boolean']>
  created_by?: Maybe<Scalars['ID']>
  email: Scalars['String']
  password?: Maybe<Scalars['String']>
  provider?: Maybe<Scalars['String']>
  resetPasswordToken?: Maybe<Scalars['String']>
  role?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
  username: Scalars['String']
}

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']
  password: Scalars['String']
  provider?: Maybe<Scalars['String']>
}

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type CreateDistrictInput = {
  data?: Maybe<DistrictInput>
}

export type CreateDownloadInput = {
  data?: Maybe<DownloadInput>
}

export type CreateNrcInput = {
  data?: Maybe<NrcInput>
}

export type CreateProvinceInput = {
  data?: Maybe<ProvinceInput>
}

export type CreateRoleInput = {
  data?: Maybe<RoleInput>
}

export type CreateUploadedDocumentInput = {
  data?: Maybe<UploadedDocumentInput>
}

export type CreateUserInput = {
  data?: Maybe<UserInput>
}

export type DeleteDistrictInput = {
  where?: Maybe<InputId>
}

export type DeleteDownloadInput = {
  where?: Maybe<InputId>
}

export type DeleteFileInput = {
  where?: Maybe<InputId>
}

export type DeleteNrcInput = {
  where?: Maybe<InputId>
}

export type DeleteProvinceInput = {
  where?: Maybe<InputId>
}

export type DeleteRoleInput = {
  where?: Maybe<InputId>
}

export type DeleteUploadedDocumentInput = {
  where?: Maybe<InputId>
}

export type DeleteUserInput = {
  where?: Maybe<InputId>
}

export type EditDistrictInput = {
  created_by?: Maybe<Scalars['ID']>
  label?: Maybe<Scalars['String']>
  province?: Maybe<Scalars['ID']>
  published_at?: Maybe<Scalars['DateTime']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditDownloadInput = {
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditFileInput = {
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  created_by?: Maybe<Scalars['ID']>
  ext?: Maybe<Scalars['String']>
  formats?: Maybe<Scalars['JSON']>
  hash?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Int']>
  mime?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  previewUrl?: Maybe<Scalars['String']>
  provider?: Maybe<Scalars['String']>
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<Scalars['ID']>>>
  size?: Maybe<Scalars['Float']>
  updated_by?: Maybe<Scalars['ID']>
  url?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
}

export type EditNrcInput = {
  confirmed?: Maybe<Scalars['Boolean']>
  created_by?: Maybe<Scalars['ID']>
  district?: Maybe<Scalars['ID']>
  dob?: Maybe<Scalars['Date']>
  dor?: Maybe<Scalars['Date']>
  gender?: Maybe<Scalars['String']>
  names?: Maybe<Scalars['String']>
  nrc?: Maybe<Scalars['String']>
  pic_id1?: Maybe<Scalars['String']>
  pic_id2?: Maybe<Scalars['String']>
  updated_by?: Maybe<Scalars['ID']>
  village?: Maybe<Scalars['String']>
}

export type EditProvinceInput = {
  created_by?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditRoleInput = {
  created_by?: Maybe<Scalars['ID']>
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>
  type?: Maybe<Scalars['String']>
  updated_by?: Maybe<Scalars['ID']>
  users?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type EditUploadedDocumentInput = {
  created_by?: Maybe<Scalars['ID']>
  name?: Maybe<Array<Maybe<Scalars['ID']>>>
  published_at?: Maybe<Scalars['DateTime']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditUserInput = {
  blocked?: Maybe<Scalars['Boolean']>
  confirmationToken?: Maybe<Scalars['String']>
  confirmed?: Maybe<Scalars['Boolean']>
  created_by?: Maybe<Scalars['ID']>
  email?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  provider?: Maybe<Scalars['String']>
  resetPasswordToken?: Maybe<Scalars['String']>
  role?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
  username?: Maybe<Scalars['String']>
}

export type UpdateDistrictInput = {
  data?: Maybe<EditDistrictInput>
  where?: Maybe<InputId>
}

export type UpdateDownloadInput = {
  data?: Maybe<EditDownloadInput>
  where?: Maybe<InputId>
}

export type UpdateNrcInput = {
  data?: Maybe<EditNrcInput>
  where?: Maybe<InputId>
}

export type UpdateProvinceInput = {
  data?: Maybe<EditProvinceInput>
  where?: Maybe<InputId>
}

export type UpdateRoleInput = {
  data?: Maybe<EditRoleInput>
  where?: Maybe<InputId>
}

export type UpdateUploadedDocumentInput = {
  data?: Maybe<EditUploadedDocumentInput>
  where?: Maybe<InputId>
}

export type UpdateUserInput = {
  data?: Maybe<EditUserInput>
  where?: Maybe<InputId>
}
