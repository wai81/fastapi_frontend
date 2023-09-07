import { Edit, useAutocomplete } from "@refinedev/mui";
import {
    Box,
    Checkbox,
    TextField,
    FormControlLabel,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const usersData = queryResult?.data?.data;

    const { autocompleteProps: organizationAutocompleteProps } =
        useAutocomplete({
            resource: "organizations",
            defaultValue: usersData?.organization_id,
        });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("users.fields.id")}
                    name="id"
                    disabled
                />
                <TextField
                    {...register("username", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.username}
                    helperText={(errors as any)?.username?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("users.fields.username")}
                    name="username"
                />
                <TextField
                    {...register("last_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.last_name}
                    helperText={(errors as any)?.last_name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("users.fields.last_name")}
                    name="last_name"
                />
                <TextField
                    {...register("first_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.first_name}
                    helperText={(errors as any)?.first_name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("users.fields.first_name")}
                    name="first_name"
                />
                <TextField
                    {...register("patronymic", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.patronymic}
                    helperText={(errors as any)?.patronymic?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("users.fields.patronymic")}
                    name="patronymic"
                />
                <Controller
                    control={control}
                    name="is_superuser"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("users.fields.is_superuser")}
                            control={
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(event) => {
                                        field.onChange(event.target.checked);
                                    }}
                                />
                            }
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="is_active"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("users.fields.is_active")}
                            control={
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(event) => {
                                        field.onChange(event.target.checked);
                                    }}
                                />
                            }
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="organization_id"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...organizationAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                //console.log(value)
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                                if (item === 0){
                                    return ''
                                }else{
                                return (
                                    organizationAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.title ?? ""
                                );}
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === 0 ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => {
                                return(<TextField
                                    {...params}
                                    label={translate(
                                        "users.fields.organization.title",
                                    )}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.organization_id}
                                    helperText={
                                        (errors as any)?.organization_id
                                            ?.message
                                    }
                                    required
                                />)
                            }}
                        />
                    )}
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("created_at", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.created_at}
                    helperText={(errors as any)?.created_at?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("users.fields.created_at")}
                    name="created_at"
                />
            </Box>
        </Edit>
    );
};
