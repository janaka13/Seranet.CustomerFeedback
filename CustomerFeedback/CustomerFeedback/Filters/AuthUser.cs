﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Security;
using WebMatrix.WebData;
using System.Threading;
using System.Security.Principal;
using System.Net;
using CustomerFeedback.Models;
using Login.PasswordHash;

namespace CustomerFeedback.Filters
{

    public class AuthUser : AuthorizeAttribute
    {

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            //actionContext.Request.
            //base.OnAuthorization(actionContext);
            if (actionContext.Request.RequestUri.AbsolutePath == "/api/CheckLogin" || actionContext.Request.RequestUri.AbsolutePath == "/api/CheckLogginStatus")
            {
                return;
            }
            if (actionContext.Request.RequestUri.AbsolutePath == "/api/CheckStatus" || actionContext.Request.RequestUri.AbsolutePath == "/api/validateAppraisal")
            {
                return;
            }


            if (!hasCookieSet())
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                actionContext.Response.ReasonPhrase = "Please provide valid inputs";
                return;
            }
            if (HttpContext.Current.Request.Cookies.Get("UserConfig") != null || HttpContext.Current.Request.Cookies.Get("CustomerConfig") != null)
            {
                if (!isAutherizedAdmin() && !isAutherizedCustomer())
                {
                    HttpContext.Current.Response.AddHeader("UserConfig", "NotAuthorized");
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden);
                    return;
                }

                HttpContext.Current.Response.AddHeader("UserConfig", "Authorized");

                return;
            }

        }

        private bool hasCookieSet()
        {


            try
            {
                HttpCookie cookieAdmin = HttpContext.Current.Request.Cookies.Get("UserConfig");
                HttpCookie cookieCustomer = HttpContext.Current.Request.Cookies.Get("CustomerConfig");

                if (cookieAdmin != null)
                {
                    FormsAuthenticationTicket authTicketAdmin = FormsAuthentication.Decrypt(cookieAdmin.Value);
                    cookieAdmin.Expires = DateTime.Now.AddMinutes(60);
                    HttpContext.Current.Response.Cookies.Add(cookieAdmin);
                    if (authTicketAdmin.Name == "UserConfig")
                    {
                        return true;
                    }
                }
                if (cookieCustomer != null)
                {
                    FormsAuthenticationTicket authTicketCustomer = FormsAuthentication.Decrypt(cookieCustomer.Value);
                    cookieCustomer.Expires = DateTime.Now.AddMinutes(60);
                    HttpContext.Current.Response.Cookies.Add(cookieCustomer);
                    if (authTicketCustomer.Name == "CustomerConfig")
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception c)
            {
                return false;
            }
        }

        private bool isAutherizedAdmin()
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies.Get("UserConfig");


            try
            {
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(cookie.Value);
                string authenticationToken = authTicket.UserData;
                using (var db = new CustomerFeedbackDbContext())
                {

                    var query = from b in db.AdminUser
                                select b;

                    foreach (var AdminUser in query)
                    {
                        if (authenticationToken == AdminUser.userName)
                        {
                            return true;
                        }
                    }

                }
                return false;

            }
            catch (Exception e)
            {
                return false;
            }
        }


        private bool isAutherizedCustomer()
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies.Get("CustomerConfig");


            try
            {
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(cookie.Value);
                string authenticationToken = authTicket.UserData;
                using (var db = new CustomerFeedbackDbContext())
                {

                    var query = from b in db.Appraisal
                                select b;

                    foreach (var app in query)
                    {
                        if (PasswordHash.ValidatePassword(authenticationToken, app.validate_key))
                        {
                            return true;
                        }
                    }

                }
                return false;

            }
            catch (Exception e)
            {
                return false;
            }
        }


    }

}