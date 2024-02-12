import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../utils/useAuth.jsx';
import { signupSchema } from '../utils/validator.js';
import { appRoutes, apiRoutes } from '../routes.js';
import SignUpImage from '../images/SignUpImage.jpg';

const SignUpForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [signUpFailed, setSignUpFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema(
      t('validationRules.required'),
      t('validationRules.nameLength'),
      t('validationRules.minPassword'),
      t('validationRules.matchPasswords'),
    ),
    onSubmit: async ({ username, password }) => {
      setSignUpFailed(false);

      try {
        const res = await axios.post(apiRoutes.signUpPath(), { username, password });
        auth.logIn(res.data);
        navigate(appRoutes.rootPage);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setSignUpFailed(true);
          inputRef.current.focus();
          return;
        }
        toast.error(t('errors.networkError'));
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const isInvalidUsername = formik.touched.username && formik.errors.username;
  const isInvalidPassword = formik.touched.password && formik.errors.password;
  const isInvalidConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={SignUpImage} className="rounded-circle" alt={t('registration')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('registration')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={t('validationRules.nameLength')}
                      id="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      isInvalid={signUpFailed || isInvalidUsername}
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">{t('username')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder={t('validationRules.minPassword')}
                      id="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={signUpFailed || isInvalidPassword}
                    />
                    <Form.Label htmlFor="password">{t('password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Floating>
                  <Form.Floating className="mb-4">
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      id="confirmPassword"
                      placeholder={t('validationRules.matchPasswords')}
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      isInvalid={signUpFailed || isInvalidConfirmPassword}
                    />
                    <Form.Label htmlFor="confirmPassword">{t('confirmPassword')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                      {formik.errors.confirmPassword || t('errors.userExist')}
                    </Form.Control.Feedback>
                  </Form.Floating>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100"
                  >
                    {t('register')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
