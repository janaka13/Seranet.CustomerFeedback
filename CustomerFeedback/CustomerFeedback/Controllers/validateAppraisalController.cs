﻿using Breeze.ContextProvider.EF6;
using CustomerFeedback.Filters;
using CustomerFeedback.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;
using Login.PasswordHash;

namespace CustomerFeedback.Controllers
{
    public class validateAppraisalController : ApiController
    {

        [AllowAnonymous]
        public string Post([FromBody] paramList list)
        {


            try
            {
                using (var db = new CustomerFeedbackDbContext())
                {

                    var validateKey = db.Appraisal.Find(Convert.ToInt32(list.appId)).validate_key;
                    String hashPass = PasswordHash.CreateHash(list.validateKey);
                    if (PasswordHash.ValidatePassword(list.validateKey, validateKey))
                    {
                        FormsAuthentication.Initialize();
                        FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                            1,
                            "CustomerConfig",
                            DateTime.Now,
                            DateTime.Now.AddMinutes(60),
                            true,
                            list.validateKey
                            );

                        string encryptedTicket = FormsAuthentication.Encrypt(authTicket);

                        // create cookie to contain encrypted auth ticket
                        var authCookie = new HttpCookie("CustomerConfig", encryptedTicket);

                        authCookie.Path = FormsAuthentication.FormsCookiePath;

                        HttpContext.Current.Response.Cookies.Remove("CustomerConfig");
                        HttpContext.Current.Response.Cookies.Add(authCookie);

                        return "1";
                    }
                }
                return "0";

            }
            catch (Exception e)
            {
                return "0";
            }

        }


    }
}