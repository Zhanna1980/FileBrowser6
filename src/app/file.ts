export interface File {
  _id: string,
  name: string,
  content: string,
  owner?: string,
  readonly?: boolean,
  shared?: boolean
}
