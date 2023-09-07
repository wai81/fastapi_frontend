export interface IOrganization {
    id: number,
    title: string,
    fullname: string,
    nom_unp: string,
    head_organization_id: number,
    is_active: boolean,
    creator_id: string,
    created_at: string,
}

export interface IOrganizationCreate {
    id: number,
    title: string,
    fullname: string,
    nom_unp: string,
    head_organization_id: number,
    is_active: boolean,
}


export interface IOrganizationUpdate {
    id: number,
    title: string,
    fullname: string,
    nom_unp: string,
    head_organization_id: number,
    is_active: boolean,
}