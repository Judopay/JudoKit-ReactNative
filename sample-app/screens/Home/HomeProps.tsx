export enum HomeListType {
    Payment,
    PreAuth,
    RegisterCard,
    CheckCard,
    SaveCard,
}

export type HomeListItem = {
    title: string,
    subtitle: string,
    type: HomeListType
}