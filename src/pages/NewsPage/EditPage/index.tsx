import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import EditNewsStyle from "../Style";
import {
  Controller,
  useForm,
  useFormState,
} from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { useNavigate, useParams } from "react-router-dom";
import { UploadImage } from "../../../components";
import { toastError } from "../../../settings/ToastReact/ToastReact";
import { NewsService } from "../../../services/news/news.service";
import { INewsAdd } from "../News.props";
import TextEditor from "../../../components/TextEditor/TextEditor";
import { stripHtml } from "string-strip-html";

function EditPageNews(): ReactElement {
  const { handleSubmit, control, reset } = useForm<INewsAdd>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { errors } = useFormState({
    control,
  });
  const { isLoading, data } = useQuery(
    ["show news"],
    () => NewsService.show(id),
    {
      onSuccess({ data }) {},
      onError(error) {
        toastError(error, "Get movie");
      },
    }
  );
  const { mutateAsync } = useMutation(
    "update news",
    (data: any) => NewsService.update(id, data),
    {
      onError(error: any) {
        toastError(error, "Ошибка");
      },
      onSuccess() {
        toastr.success("Новости", "Новости успешно редактирован");
        navigate("/news");
      },
    }
  );
  const onSubmit = async (data: any) => {
    const { name, text, file } = data;
    await mutateAsync({ name, text, file });
  };
  const goBack = () => navigate(-1);
  return (
    <EditNewsStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              label="Добавить Загаловку"
              onChange={(e) => field.onChange(e)}
              value={field.value || data?.data?.data.name}
              fullWidth={true}
              size="small"
              margin="normal"
              className="auth-form__input"
              error={!!errors?.name?.message}
              helperText={errors?.name?.message}
            />
          )}
        />
        <Controller
          name="text"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextEditor
              onChange={onChange}
              error={error}
              value={value || data?.data?.data.text}
              placeholder="Editor"
            />
          )}
          rules={{
            validate: {
              required: (v: any) =>
                (v && stripHtml(v).result.length > 0) ||
                "Description is required!",
            },
          }}
        />
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <UploadImage onChange={(e) => field.onChange(e)} />
          )}
        />
        <img
          src={data?.data.data.file}
          alt="png"
          className="imageWidth"
          style={{ width: "300px", height: "300px", marginTop: "20px" }}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          sx={{
            marginTop: 2,
          }}
        >
          Редактировать
        </LoadingButton>
      </form>
      <div style={{ marginTop: "10px" }}>
        <Button variant="outlined" color="error" onClick={goBack}>
          Назад
        </Button>
      </div>
    </EditNewsStyle>
  );
}
export default EditPageNews;
