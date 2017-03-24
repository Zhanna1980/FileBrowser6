export interface Folder {
  _id: string,
  name: string,
  children: Array<File | Folder>,
  readonly?: boolean,
  shared?: boolean
}
