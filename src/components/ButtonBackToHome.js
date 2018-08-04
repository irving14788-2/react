import React from 'react';
import { Link } from 'react-router-dom'

export const ButtonBackToHome = () => (
  <Link
   className="button is-primary"
   to='/home'>
   Volver a la portada
  </Link>
)
