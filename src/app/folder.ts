export interface Folder {
  _id: string,
  name: string,
  children: Array<File | Folder>,
  owner?: string,
  readonly?: boolean,
  shared?: boolean
}
