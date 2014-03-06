using Breeze.ContextProvider.EF6;
using CustomerFeedback.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using Login.PasswordHash;


namespace CustomerFeedback.Controllers
{
    [AllowAnonymous]
    public class CheckLoginController : ApiController
    {

        public string Post([FromBody] AdminUser user)
        {
            try
            {
                using (var db = new CustomerFeedbackDbContext())
                {

                    var query = from b in db.AdminUser
                                select b;

                    foreach (var AdminUser in query)
                    {
                        if (AdminUser.userName == user.userName && PasswordHash.ValidatePassword(user.password, AdminUser.password) && AdminUser.userType == user.userType)
                        {
                            FormsAuthentication.Initialize();
                            FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                                1,
                                "UserConfig",
                                DateTime.Now,
                                DateTime.Now.AddMinutes(60),
                                true,
                                user.userName
                                );                           

                            string encryptedTicket = FormsAuthentication.Encrypt(authTicket);

                            // create cookie to contain encrypted auth ticket
                            var authCookie = new HttpCookie("UserConfig", encryptedTicket);

                            authCookie.Path = FormsAuthentication.FormsCookiePath;
                            
                            HttpContext.Current.Response.Cookies.Remove("UserConfig");
                            HttpContext.Current.Response.Cookies.Add(authCookie);

                            return "1";
                        }
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
