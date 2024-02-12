import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import useAuth from '../utils/useAuth.jsx';
import formSchema from '../utils/validator.js';
import { appRoutes, apiRoutes } from '../routes.js';
import LoginImage from '../images/LoginImage.jpeg';

const LoginForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: formSchema(t('validationRules.required')),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(apiRoutes.loginPath(), values);
        auth.logIn(res.data);
        navigate(appRoutes.rootPage);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.focus();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={LoginImage} className="rounded-circle" alt={t('logIn')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('logIn')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={t('nickname')}
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">{t('nickname')}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      id="password"
                      placeholder={t('password')}
                      required
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                    />
                    <Form.Label htmlFor="password">{t('password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                      {t('errors.incorrectProps')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3 btn"
                  >
                    {t('logIn')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('noAccount')}</span>
                <Link to={appRoutes.signUpForm}>{t('registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
