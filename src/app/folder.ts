export interface Folder {
  id: number,
  name: string,
  children: Array<File | Folder>,
  readonly: boolean,
  shared: boolean
}
