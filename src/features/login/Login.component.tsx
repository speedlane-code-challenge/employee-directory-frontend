/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
} from "aws-amplify/auth";

import { TextInput, PasswordInput } from "../../components/Input";
import { AppButton } from "../../components/Button";
import { useAlertActions } from "../../hooks/useAlertRedux";
import { Card, SignInContainer } from "./Login.styled";

type FormValues = { email: string; password: string };

const Login: React.FC = () => {
  const { showError } = useAlertActions();
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (
      values: FormValues,
      formikHelpers: FormikHelpers<FormValues>
    ) => {
      try {
        const { isSignedIn, nextStep } = await signIn({
          username: values.email.trim(),
          password: values.password.trim(),
        });

        if (isSignedIn && nextStep.signInStep === "DONE") {
          const { userId } = await getCurrentUser();
          const credentials = await fetchAuthSession();

          if (
            isSignedIn &&
            userId &&
            credentials?.identityId &&
            credentials.tokens &&
            credentials.tokens.idToken
          ) {
            navigate("/dashboard");
          }
        }
      } catch (e: any) {
        if (e?.name === "NotAuthorizedException") {
          showError("Invalid email or password. Please try again.");
        } else {
          showError("An unexpected error had occurred. Please try again later.");
        }
        await signOut();
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <AppButton
            type="submit"
            disabled={formik.isSubmitting}
            onClick={() => formik.handleSubmit()}
            sx={{ mt: 2 }}
          >
            {formik.isSubmitting ? "Signing in..." : "Sign in"}
          </AppButton>
        </Box>
      </Card>
    </SignInContainer>
  );
};

export default Login;
