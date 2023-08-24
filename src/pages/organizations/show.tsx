import {
    useShow,
    IResourceComponentsProps,
    useTranslate,
    useOne,
} from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    BooleanField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const OrganizationShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;
    
    const { data: organizationData, isLoading: organizationIsLoading } = useOne(
        {
            resource: "organizations",
            id: record?.organization_id || "",
            queryOptions: {
                enabled: !!record,
            },
        },
    );


    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {t("organizations.fields.id")}
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {t("organizations.fields.title")}
                </Typography>
                <TextField value={record?.title} />
                <Typography variant="body1" fontWeight="bold">
                    {t("organizations.fields.fullname")}
                </Typography>
                <TextField value={record?.fullname} />
                <Typography variant="body1" fontWeight="bold">
                    {t("organizations.fields.is_active")}
                </Typography>
                <BooleanField value={record?.is_active} />
                <Typography variant="body1" fontWeight="bold">
                    {t("organizations.fields.created_at")}
                </Typography>
                <DateField value={record?.created_at} />
                <Typography variant="body1" fontWeight="bold">
                    {t("organizations.fields.head_organization")}
                </Typography>
                {organizationIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{organizationData?.data?.title}</>
                )}
            </Stack>
        </Show>
    );
};
