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
import {
    IResourceComponentsProps,
    useTranslate,
    useMany,
} from "@refinedev/core";
import { Checkbox } from "@mui/material";
import {IUser} from "../../interfaces/IUser";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { dataGridProps } = useDataGrid();

    const { data: organizationData, isLoading: organizationIsLoading } =
        useMany({
            resource: "organizations",
            ids:
                dataGridProps?.rows?.map(
                    (item: any) => item?.organization_id,
                ) ?? [],
            queryOptions: {
                enabled: !!dataGridProps?.rows,
            },
        });

    const columns = React.useMemo<GridColDef<IUser>[]>(
        () => [
            {
                field: "username",
                flex: 1,
                headerName: t("users.fields.username"),
                minWidth: 200,
            },
            {
                field: "last_name",
                flex: 1,
                headerName: t("users.fields.last_name"),
                minWidth: 200,
            },
            {
                field: "first_name",
                flex: 1,
                headerName: t("users.fields.first_name"),
                minWidth: 200,
            },
            {
                field: "patronymic",
                flex: 1,
                headerName: t("users.fields.patronymic"),
                minWidth: 200,
            },
            {
                field: "is_superuser",
                headerName: t("users.fields.is_superuser"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "is_active",
                headerName: t("users.fields.is_active"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "id",
                headerName: t("users.fields.id"),
                minWidth: 50,
            },
            {
                field: "organization_id",
                flex: 1,
                headerName: t("users.fields.organization.title"),
                minWidth: 300,
                valueGetter: ({row})=>{
                    const value = row?.organization_id;
                    return value;
                },
                renderCell: function({value}) {
                    return organizationIsLoading ? (
                        <>{t("loading")}</>
                    ):(
                        organizationData?.data.find((item)=> item.id === value)?.title
                    );
                }
            },
            {
                field: "created_at",
                flex: 1,
                headerName: t("users.fields.created_at"),
                minWidth: 250,
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
        [t, organizationIsLoading, organizationData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
