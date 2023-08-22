import React from "react";
import {IResourceComponentsProps, useMany, useTranslate} from "@refinedev/core";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    MarkdownField,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {IUser} from "../../interfaces/IUser";


export const UserList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { dataGridProps } = useDataGrid();

    const { data: organizationData, isLoading: organizationIsLoading } = useMany({
        resource: "organizations",
        ids: dataGridProps?.rows?.map((item: any) => item?.organization_id) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColDef<IUser>[]>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "title",
                flex: 1,
                headerName: "Title",
                minWidth: 200,
            },
            {
                field: "content",
                flex: 1,
                headerName: "Content",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return (
                        <MarkdownField
                            value={(value ?? "").slice(0, 80) + "..."}
                        />
                    );
                },
            },
            {
                field: "category",
                flex: 1,
                headerName: "Category",
                valueGetter: ({ row }) => {
                    const value = row?.organization_id;

                    return value;
                },
                minWidth: 300,
                renderCell: function render({ value }) {
                    return organizationIsLoading ? (
                        <>Loading...</>
                    ) : (
                        organizationData?.data?.find((item) => item.id === value)
                            ?.title
                    );
                },
            },
            {
                field: "status",
                flex: 1,
                headerName: "Status",
                minWidth: 200,
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: "Created At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "actions",
                headerName: "Actions",
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
        [organizationData?.data],
    );


    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};