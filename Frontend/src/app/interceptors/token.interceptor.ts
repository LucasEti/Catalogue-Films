import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';


/**
 * Intercepteur HTTP qui ajoute un en-tête d'autorisation (Bearer Token)
 * à chaque requête sortante si un token est présent dans le localStorage.
 *
 * @param {HttpRequest<any>} req - La requête HTTP sortante
 * @param {HttpHandlerFn} next - La fonction qui transmet la requête au prochain intercepteur ou au backend
 * @returns {Observable<HttpEvent<any>>} - La requête éventuellement modifiée avec l'en-tête Authorization
 */
export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
