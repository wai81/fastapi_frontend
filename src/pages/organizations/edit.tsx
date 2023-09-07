import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { CrudFilters, IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const OrganizationEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const organizationsData = queryResult?.data?.data;

    const { autocompleteProps: organizationAutocompleteProps } =
      useAutocomplete({
        resource: "organizations",

        onSearch: (value) => {
          const filters: CrudFilters = [];
          filters.push({
            field: "q",
            operator: "eq",
            value: value.length > 0 ? value : undefined,
          });
          return filters;
        },

        defaultValue: organizationsData?.head_organization_id,

        sorters: [{ field: "id", order: "asc" }],
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
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("organizations.fields.id")}
                    name="id"
                    disabled
                />
                <TextField
                    {...register("nom_unp", {
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.nom_unp}
                    helperText={(errors as any)?.nom_unp?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("organizations.fields.nom_unp")}
                    name="nom_unp"
                />
                <TextField
                    {...register("title", {
                        required: translate('required.field'),
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("organizations.fields.title")}
                    name="title"
                />
                <TextField
                    {...register("fullname", {
                        required: translate('required.field'),
                    })}
                    error={!!(errors as any)?.fullname}
                    helperText={(errors as any)?.fullname?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("organizations.fields.fullname")}
                    name="fullname"
                />
                <Controller
                    control={control}
                    name="head_organization_id"
                    //rules={{ required: translate('required.field') }}
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
                                        "organizations.fields.head_organization",
                                    )}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.head_organization_id}
                                    helperText={
                                        (errors as any)?.head_organization_id
                                            ?.message
                                    }
                                     //required
                                />)
                            }}
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
                            label={translate("organizations.fields.is_active")}
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
            </Box>
        </Edit>
    );
};
