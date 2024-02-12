import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import image from '../images/NotFoundImage.svg';
import { appRoutes } from '../routes.js';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        className="img-fluid h-25"
        alt={t('pageNotFound')}
        src={image}
      />
      <h1 className="h4 text-muted">{t('errors.pageNotFound')}</h1>
      <p className="text-muted">
        {t('canReroute')}
        <Link to={appRoutes.rootPage}>{t('rootPage')}</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
