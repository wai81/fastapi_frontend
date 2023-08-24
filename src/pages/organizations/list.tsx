import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useMany, useTranslate } from "@refinedev/core";
import { Checkbox } from "@mui/material";

export const OrganizationList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { dataGridProps } = useDataGrid();
    
    const { data: userData, isLoading: userIsLoading } =
    useMany({
        resource: "users",
        ids:
            dataGridProps?.rows?.map(
                (item: any) => item?.creator_id,
            ) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: t("organizations.fields.id"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "title",
                flex: 1,
                headerName: t("organizations.fields.title"),
                minWidth: 200,
            },
            {
                field: "fullname",
                flex: 1,
                headerName: t("organizations.fields.fullname"),
                minWidth: 200,
            },
            {
                field: "nom_unp",
                flex: 1,
                headerName: t("organizations.fields.nom_unp"),
                type: "string",
                minWidth: 50,
            },
            {
                field: "is_active",
                headerName: t("organizations.fields.is_active"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "creator",
                flex: 1,
                headerName: t("organizations.fields.creator_id"),
                type: "string",
                minWidth: 100,
                valueGetter: ({row})=>{
                    const value = row?.creator_id;
                    return value;
                },
                renderCell: function({value}) {
                    return userIsLoading ? (
                        <>{t("loading")}</>
                    ):( value === 0 ? 
                        (''):
                        (userData?.data.find((item)=> item.id === value)?.username)
                    );
                }
            },
            {
                field: "created_at",
                flex: 1,
                headerName: t("organizations.fields.created_at"),
                minWidth: 50,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },       
            {
                field: "actions",
                headerName: t("table.actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [t, userData?.data, userIsLoading],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
